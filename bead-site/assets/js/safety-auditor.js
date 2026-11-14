/**
 * safety-auditor.js — 数字工坊内容安全自动审核引擎
 * 
 * 核心职责：
 *   坚决拦截涉黄、色情裸露及低俗有害内容，保障社区内容健康合规。
 * 
 * 双重安全审核体系：
 *   1. 视觉特征审核（Visual NSFW & Nudity Detection）：
 *      - 采用 YCbCr + HSV + RGB 多维自适应色彩空间肤色区域识别；
 *      - 结合大面积连通裸露区域聚类（Connected Skin Component Clustering）；
 *      - 分析裸露比例（Skin Ratio）与聚集度，严密拦截涉黄与大面积敏感裸露图像。
 *   2. 文本语义安全过滤（Text Safety Filter）：
 *      - 针对图纸名称、描述与作者名进行违禁涉黄词库过滤拦截。
 */

// 违禁敏感涉黄与不良词库（正则化前置匹配）
const BANNED_PATTERNS = [
  /色情|情色|淫秽|裸体|裸露|露点|无码|开房|援交|约炮|包养|自慰|成人|三级片|偷拍|黄片|黄色小说/i,
  /性爱|做爱|性交|乳房|阴道|阴茎|睾丸|肛门|强奸|乱伦|幼女|雏妓|大胸|爆乳/i,
  /porn|nsfw|nude|naked|sex|boobs|pussy|penis|vagina|erotic|hentai|ecchi|r18|\bav\b/i
];

export class SafetyAuditor {
  /**
   * 综合内容安全审核
   * @param {Object} params
   * @param {HTMLImageElement|HTMLCanvasElement|ImageData} params.image 待审核图像对象
   * @param {string} [params.title] 图纸标题
   * @param {string} [params.desc] 图纸描述
   * @returns {Promise<{ pass: boolean, reason?: string, score: number, details: any }>}
   */
  static async audit({ image, title = '', desc = '' }) {
    // 第一道防线：文本语义安全过滤
    const textCheck = this.auditText(title + ' ' + desc);
    if (!textCheck.pass) {
      return {
        pass: false,
        reason: textCheck.reason,
        score: 1.0,
        details: { type: 'text_violation', matched: textCheck.matched }
      };
    }

    // 第二道防线：图像视觉敏感与色情裸露分析
    const visualCheck = await this.auditImage(image);
    if (!visualCheck.pass) {
      return {
        pass: false,
        reason: visualCheck.reason,
        score: visualCheck.score,
        details: visualCheck.details
      };
    }

    return {
      pass: true,
      score: visualCheck.score,
      details: { visual: visualCheck.details, text: 'ok' }
    };
  }

  /**
   * 文本安全审核
   */
  static auditText(text) {
    if (!text || typeof text !== 'string') return { pass: true };
    const cleanText = text.replace(/[\s\-_.,，。！？～~@#￥%&*]/g, '').toLowerCase();

    for (const reg of BANNED_PATTERNS) {
      if (reg.test(cleanText)) {
        return {
          pass: false,
          reason: '图纸标题或描述包含涉嫌违规或不适宜文本，已被安全审核拦截。',
          matched: reg.source
        };
      }
    }
    return { pass: true };
  }

  /**
   * 图像色情裸露视觉审核
   * 将图像下采样并分析 YCbCr / HSV 空间的敏感裸露聚类
   */
  static async auditImage(imageSource) {
    return new Promise((resolve) => {
      try {
        let canvas, ctx, width, height;

        if (imageSource instanceof HTMLCanvasElement) {
          canvas = imageSource;
          width = canvas.width;
          height = canvas.height;
          ctx = canvas.getContext('2d');
        } else {
          // 下采样至 128x128 进行毫秒级特征安全扫描
          const SCAN_SIZE = 128;
          canvas = document.createElement('canvas');
          canvas.width = SCAN_SIZE;
          canvas.height = SCAN_SIZE;
          ctx = canvas.getContext('2d', { willReadFrequently: true });
          ctx.drawImage(imageSource, 0, 0, SCAN_SIZE, SCAN_SIZE);
          width = SCAN_SIZE;
          height = SCAN_SIZE;
        }

        const imgData = ctx.getImageData(0, 0, width, height);
        const data = imgData.data;
        const totalPixels = width * height;

        let skinPixels = 0;
        let sensitiveHuePixels = 0;
        const skinMap = new Uint8Array(totalPixels);

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const a = data[i + 3];

          // 忽略透明区域
          if (a < 50) continue;

          const pixelIdx = i / 4;
          const isSkin = this.checkSkinColor(r, g, b);
          if (isSkin) {
            skinPixels++;
            skinMap[pixelIdx] = 1;
          }

          // 敏感肉粉/桃红高饱和判定
          const [h, s, v] = this.rgbToHsv(r, g, b);
          if ((h >= 345 || h <= 25) && s >= 0.25 && s <= 0.85 && v >= 0.45) {
            sensitiveHuePixels++;
          }
        }

        const skinRatio = skinPixels / totalPixels;
        const sensitiveHueRatio = sensitiveHuePixels / totalPixels;

        // 连通域聚类分析：寻找最大连续肉色/裸露区域
        const maxCluster = this.findLargestSkinCluster(skinMap, width, height);
        const maxClusterRatio = maxCluster / totalPixels;

        // 计算色情/裸露综合风险分 (0.0 ~ 1.0)
        let riskScore = 0.0;

        // 1. 大面积连通肉色区域（典型的人体躯干裸露）
        if (maxClusterRatio > 0.28) {
          riskScore += (maxClusterRatio - 0.28) * 2.2;
        }
        // 2. 整体肤色高占比
        if (skinRatio > 0.42) {
          riskScore += (skinRatio - 0.42) * 1.8;
        }
        // 3. 敏感粉肉色相共振
        if (sensitiveHueRatio > 0.35 && skinRatio > 0.30) {
          riskScore += 0.35;
        }

        riskScore = Math.min(1.0, Math.max(0.0, riskScore));

        // 判定阈值：若综合风险分超过 0.50，直接判定为色情或违规裸露
        if (riskScore >= 0.50 || (skinRatio > 0.48 && maxClusterRatio > 0.22)) {
          resolve({
            pass: false,
            score: riskScore,
            reason: '⚠️ 内容安全审核未通过：检测到该图片涉嫌包含大面积敏感裸露或违规色情内容，无法上传至数字工坊。请上传健康的拼豆创作图片。',
            details: { skinRatio, maxClusterRatio, sensitiveHueRatio, riskScore }
          });
        } else {
          resolve({
            pass: true,
            score: riskScore,
            details: { skinRatio, maxClusterRatio, sensitiveHueRatio, riskScore }
          });
        }
      } catch (err) {
        console.error('SafetyAuditor scan error:', err);
        // 出错时默认安全放行或轻度告警，保障可用性
        resolve({
          pass: true,
          score: 0.1,
          details: { fallback: true, error: String(err) }
        });
      }
    });
  }

  /**
   * 经典医学与计算机视觉 YCbCr + HSV + RGB 混合多维肤色规则
   */
  static checkSkinColor(r, g, b) {
    // 1. RGB 基础界限
    if (r <= 75 || g <= 35 || b <= 18) return false;
    if (r <= g || r <= b) return false;
    if (Math.abs(r - g) < 12) return false;

    // 2. YCbCr 空间转换
    const y  =  0.29900 * r + 0.58700 * g + 0.11400 * b;
    const cb = -0.16874 * r - 0.33126 * g + 0.50000 * b + 128;
    const cr =  0.50000 * r - 0.41869 * g - 0.08131 * b + 128;

    // 经典肤色椭圆簇：Cr 在 [133, 178]，Cb 在 [77, 127]
    const inYCbCr = (cr >= 133 && cr <= 178) && (cb >= 77 && cb <= 127);
    if (!inYCbCr) return false;

    // 3. HSV 色相范围校验（排除纯黄、纯橙）
    const [h, s, v] = this.rgbToHsv(r, g, b);
    const inHsv = ((h >= 0 && h <= 50) || (h >= 340 && h <= 360)) && (s >= 0.12 && s <= 0.75) && (v >= 0.35);

    return inHsv;
  }

  /**
   * RGB 转 HSV (H: 0-360, S: 0-1, V: 0-1)
   */
  static rgbToHsv(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    const d = max - min;
    let h = 0;
    const s = max === 0 ? 0 : d / max;
    const v = max;

    if (max !== min) {
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return [h * 360, s, v];
  }

  /**
   * 简易连通域聚类（BFS）：寻找最大连续敏感色块
   */
  static findLargestSkinCluster(skinMap, w, h) {
    const visited = new Uint8Array(w * h);
    let maxCluster = 0;

    for (let y = 0; y < h; y += 2) { // 步进 2 加速搜索
      for (let x = 0; x < w; x += 2) {
        const idx = y * w + x;
        if (skinMap[idx] === 1 && visited[idx] === 0) {
          // BFS 探索聚类
          let clusterSize = 0;
          const queue = [idx];
          visited[idx] = 1;

          while (queue.length > 0) {
            const curr = queue.pop();
            clusterSize++;
            const cx = curr % w;
            const cy = Math.floor(curr / w);

            // 4 邻域检查
            const neighbors = [
              cy > 0 ? (cy - 1) * w + cx : -1,
              cy < h - 1 ? (cy + 1) * w + cx : -1,
              cx > 0 ? cy * w + (cx - 1) : -1,
              cx < w - 1 ? cy * w + (cx + 1) : -1
            ];

            for (const n of neighbors) {
              if (n !== -1 && skinMap[n] === 1 && visited[n] === 0) {
                visited[n] = 1;
                queue.push(n);
              }
            }
          }

          if (clusterSize > maxCluster) {
            maxCluster = clusterSize;
          }
        }
      }
    }
    return maxCluster;
  }
}
