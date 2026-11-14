/**
 * gen-aesthetic-patterns.mjs
 * 生成 70 款小红书/社区爆款极美拼豆图纸，并替换入 assets/js/patterns-data.js
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { BEAD_COLORS, BY_CODE } from '../assets/js/bead-colors.js';
import { cropToContent } from '../assets/js/bead-viewer.js';

const W = 32, H = 32;

function createGrid(w = W, h = H) {
  const g = Array.from({ length: h }, () => new Array(w).fill(null));
  const api = {
    g,
    w,
    h,
    set(x, y, code) {
      const rx = Math.round(x);
      const ry = Math.round(y);
      if (rx >= 0 && ry >= 0 && rx < w && ry < h) {
        g[ry][rx] = code;
      }
    },
    rect(x, y, width, height, code) {
      for (let j = y; j < y + height; j++) {
        for (let i = x; i < x + width; i++) {
          api.set(i, j, code);
        }
      }
    },
    ellipse(cx, cy, rx, ry, code, fill = true) {
      for (let y = Math.floor(cy - ry - 1); y <= Math.ceil(cy + ry + 1); y++) {
        for (let x = Math.floor(cx - rx - 1); x <= Math.ceil(cx + rx + 1); x++) {
          const val = ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2;
          if (fill) {
            if (val <= 1.0) api.set(x, y, code);
          } else {
            if (val <= 1.0 && val >= 0.65) api.set(x, y, code);
          }
        }
      }
    },
    circle(cx, cy, r, code) {
      api.ellipse(cx, cy, r, r, code, true);
    },
    triangle(cx, top, bottom, code) {
      const th = bottom - top;
      for (let y = Math.floor(top); y <= Math.ceil(bottom); y++) {
        const half = Math.round(((y - top) / Math.max(1, th)) * (th / 2));
        for (let x = Math.round(cx - half); x <= Math.round(cx + half); x++) {
          api.set(x, y, code);
        }
      }
    },
    line(x0, y0, x1, y1, code, thick = 1) {
      const steps = Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0)) * 2 || 1;
      for (let s = 0; s <= steps; s++) {
        const x = x0 + (x1 - x0) * (s / steps);
        const y = y0 + (y1 - y0) * (s / steps);
        for (let dx = 0; dx < thick; dx++) {
          for (let dy = 0; dy < thick; dy++) {
            api.set(x + dx, y + dy, code);
          }
        }
      }
    },
    polygon(points, code) {
      // 扫描线光栅化多边形
      let minY = Infinity, maxY = -Infinity;
      for (const p of points) {
        if (p[1] < minY) minY = p[1];
        if (p[1] > maxY) maxY = p[1];
      }
      minY = Math.max(0, Math.floor(minY));
      maxY = Math.min(h - 1, Math.ceil(maxY));
      for (let y = minY; y <= maxY; y++) {
        const nodeX = [];
        let j = points.length - 1;
        for (let i = 0; i < points.length; i++) {
          if ((points[i][1] < y && points[j][1] >= y) || (points[j][1] < y && points[i][1] >= y)) {
            nodeX.push(points[i][0] + (y - points[i][1]) / (points[j][1] - points[i][1]) * (points[j][0] - points[i][0]));
          }
          j = i;
        }
        nodeX.sort((a, b) => a - b);
        for (let k = 0; k < nodeX.length; k += 2) {
          if (nodeX[k] >= w) break;
          if (nodeX[k + 1] > 0) {
            const start = Math.max(0, Math.round(nodeX[k]));
            const end = Math.min(w - 1, Math.round(nodeX[k + 1]));
            for (let x = start; x <= end; x++) api.set(x, y, code);
          }
        }
      }
    },
    // 对称轴镜像：从左半边镜像到右半边
    mirror() {
      const half = Math.floor(w / 2);
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < half; x++) {
          g[y][w - 1 - x] = g[y][x];
        }
      }
    },
    // 外轮廓描边：针对已有非空格子在相邻空格子上画描边
    outline(code) {
      const copy = g.map(row => [...row]);
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          if (copy[y][x] === null) {
            let hasNeighbor = false;
            for (let dy = -1; dy <= 1; dy++) {
              for (let dx = -1; dx <= 1; dx++) {
                if (dx === 0 && dy === 0) continue;
                const ny = y + dy, nx = x + dx;
                if (ny >= 0 && ny < h && nx >= 0 && nx < w && copy[ny][nx] !== null) {
                  hasNeighbor = true;
                  break;
                }
              }
              if (hasNeighbor) break;
            }
            if (hasNeighbor) api.set(x, y, code);
          }
        }
      }
    }
  };
  return api;
}

// 检查 bounds
function contentBounds(m) {
  let y0 = -1, y1 = -1, x0 = -1, x1 = -1;
  const h = m.length;
  const w = h ? m[0].length : 0;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (m[y][x] !== null && m[y][x] !== undefined) {
        if (y0 === -1) y0 = y;
        y1 = y;
        if (x0 === -1 || x < x0) x0 = x;
        if (x1 === -1 || x > x1) x1 = x;
      }
    }
  }
  return y0 === -1 ? null : { x0, y0, x1, y1 };
}

// 转换网格为 RLE 格式
function toRLE(grid, w = W) {
  return grid.map(row => {
    const parts = [];
    let i = 0;
    while (i < w) {
      const c = row[i];
      let j = i;
      while (j < w && row[j] === c) j++;
      const n = j - i;
      parts.push(c === null ? `${n}.` : n === 1 ? c : `${n}${c}`);
      i = j;
    }
    return parts.join(' ');
  }).join(' |\n      ');
}

export { createGrid, contentBounds, toRLE, W, H };
