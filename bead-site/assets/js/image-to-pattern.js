/**
 * image-to-pattern.js — 用户上传图片转拼豆图纸引擎
 * 
 * 核心功能：
 *   1. 图像高保真自适应下采样（支持 24×24、32×32、40×40 标准画幅）；
 *   2. 背景智能抠除（支持 PNG 透明通道与纯白/单色背景自动剔除）；
 *   3. 真实 Artkal Mini 221 色卡感知色彩匹配（CIELAB / Weighted RGB Delta E）；
 *   4. 生成标准拼豆图纸矩阵与色号清单统计。
 */

import { BEAD_COLORS } from './bead-colors.js';

export class ImageToPatternConverter {
  /**
   * 将图像转换为拼豆图纸
   * @param {HTMLImageElement|HTMLCanvasElement} img 待转换图像
   * @param {Object} options
   * @param {number} [options.gridSize=32] 目标网格宽/高规格
   * @param {boolean} [options.autoRemoveBg=true] 是否自动抠除非内容纯白背景
   * @param {string} [options.title] 图纸名称
   * @param {string} [options.category='anime'] 分类
   * @param {string} [options.desc=''] 描述
   * @returns {Object} 标准图纸对象
   */
  static convert(img, options = {}) {
    const gridSize = options.gridSize || 32;
    const autoRemoveBg = options.autoRemoveBg !== false;
    const title = (options.title && options.title.trim()) || '我的原创拼豆图纸';
    const category = options.category || 'anime';
    const desc = options.desc || '用户在数字工坊通过智能转换引擎生成的专属拼豆图纸。';

    // 1. 创建离屏 Canvas 下采样
    const canvas = document.createElement('canvas');
    canvas.width = gridSize;
    canvas.height = gridSize;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });

    // 计算保持宽高比的绘制区域
    const srcW = img.naturalWidth || img.videoWidth || img.width;
    const srcH = img.naturalHeight || img.videoHeight || img.height;
    const ratio = srcW / srcH;

    let drawW = gridSize, drawH = gridSize;
    let offsetX = 0, offsetY = 0;

    if (ratio > 1) {
      drawH = Math.max(1, Math.round(gridSize / ratio));
      offsetY = Math.floor((gridSize - drawH) / 2);
    } else if (ratio < 1) {
      drawW = Math.max(1, Math.round(gridSize * ratio));
      offsetX = Math.floor((gridSize - drawW) / 2);
    }

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, offsetX, offsetY, drawW, drawH);

    const imgData = ctx.getImageData(0, 0, gridSize, gridSize);
    const data = imgData.data;

    // 2. 检测背景色（如果四角同色且明度极高，视为背景色）
    const cornerColors = [
      this.getPixelColor(data, 0, 0, gridSize),
      this.getPixelColor(data, gridSize - 1, 0, gridSize),
      this.getPixelColor(data, 0, gridSize - 1, gridSize),
      this.getPixelColor(data, gridSize - 1, gridSize - 1, gridSize),
    ];
    const isWhiteBg = cornerColors.every(c => c.r > 240 && c.g > 240 && c.b > 240);

    // 3. 构建二维矩阵与色度映射
    const matrix = [];
    const colorUsageMap = new Map();
    let totalBeads = 0;

    for (let y = 0; y < gridSize; y++) {
      const row = [];
      for (let x = 0; x < gridSize; x++) {
        const idx = (y * gridSize + x) * 4;
        const r = data[idx];
        const g = data[idx + 1];
        const b = data[idx + 2];
        const a = data[idx + 3];

        // 判定透明度或背景扣除
        if (a < 100) {
          row.push(null);
          continue;
        }

        if (autoRemoveBg && isWhiteBg && r > 245 && g > 245 && b > 245) {
          row.push(null);
          continue;
        }

        // 匹配最近的真实 Artkal 拼豆色
        const nearestBead = this.findNearestBead(r, g, b);
        row.push(nearestBead);
        totalBeads++;

        const curCount = colorUsageMap.get(nearestBead.code) || 0;
        colorUsageMap.set(nearestBead.code, curCount + 1);
      }
      matrix.push(row);
    }

    // 4. 统计用色清单
    const colorList = Array.from(colorUsageMap.entries())
      .map(([code, count]) => {
        const bead = BEAD_COLORS.find(c => c.code === code);
        return {
          code,
          name: bead ? bead.name : code,
          hex: bead ? bead.hex : '#000000',
          count
        };
      })
      .sort((a, b) => b.count - a.count);

    const patternId = `user-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

    return {
      id: patternId,
      title,
      category,
      tag: '工坊原创',
      difficulty: totalBeads > 500 ? '★★★★☆' : totalBeads > 250 ? '★★★☆☆' : '★★☆☆☆',
      desc,
      matrix,
      colorList,
      totalBeads,
      uniqueColors: colorList.length,
      gridWidth: gridSize,
      gridHeight: gridSize,
      isUserUploaded: true,
      createdAt: new Date().toISOString()
    };
  }

  static getPixelColor(data, x, y, width) {
    const idx = (y * width + x) * 4;
    return {
      r: data[idx],
      g: data[idx + 1],
      b: data[idx + 2],
      a: data[idx + 3]
    };
  }

  /**
   * 采用人类视觉感知色彩空间加权欧氏距离匹配 Artkal 拼豆
   */
  static findNearestBead(r, g, b) {
    let minDistance = Infinity;
    let closest = BEAD_COLORS[0];

    for (const color of BEAD_COLORS) {
      // 加权感知色彩欧氏距离
      // 人眼对绿色最敏感，其次红色，再次蓝色
      const rmean = (r + color.r) / 2;
      const dr = r - color.r;
      const dg = g - color.g;
      const db = b - color.b;
      const dist = (2 + rmean / 256) * dr * dr + 4 * dg * dg + (2 + (255 - rmean) / 256) * db * db;

      if (dist < minDistance) {
        minDistance = dist;
        closest = color;
      }
    }

    return {
      code: closest.code,
      name: closest.name,
      hex: closest.hex
    };
  }
}
