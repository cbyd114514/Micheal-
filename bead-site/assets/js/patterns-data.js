/**
 * patterns-data.js — 图纸数据、色板与解码引擎
 * 
 * 70 款当下顶流高颜值精品拼豆图纸（覆盖动漫IP、治愈萌宠、游戏像素、美食甜品、风景古建与节日庆典）
 * 所有色彩严格采用 Artkal Mini 2.6mm 真实色卡体系。
 */

import { BEAD_COLORS, BY_CODE } from './bead-colors.js';

/* ---------- 图纸实际用到的标准色 ---------- */
export const C_MAP = {
  MA1: BY_CODE.get('MA1'),
  MA10: BY_CODE.get('MA10'),
  MA18: BY_CODE.get('MA18'),
  MA3: BY_CODE.get('MA3'),
  MA4: BY_CODE.get('MA4'),
  MA6: BY_CODE.get('MA6'),
  MA7: BY_CODE.get('MA7'),
  MA8: BY_CODE.get('MA8'),
  MB19: BY_CODE.get('MB19'),
  MB2: BY_CODE.get('MB2'),
  MB28: BY_CODE.get('MB28'),
  MB5: BY_CODE.get('MB5'),
  MB6: BY_CODE.get('MB6'),
  MB8: BY_CODE.get('MB8'),
  MB9: BY_CODE.get('MB9'),
  MC10: BY_CODE.get('MC10'),
  MC11: BY_CODE.get('MC11'),
  MC12: BY_CODE.get('MC12'),
  MC13: BY_CODE.get('MC13'),
  MC16: BY_CODE.get('MC16'),
  MC17: BY_CODE.get('MC17'),
  MC18: BY_CODE.get('MC18'),
  MC2: BY_CODE.get('MC2'),
  MC3: BY_CODE.get('MC3'),
  MC4: BY_CODE.get('MC4'),
  MC7: BY_CODE.get('MC7'),
  MC8: BY_CODE.get('MC8'),
  MD14: BY_CODE.get('MD14'),
  MD20: BY_CODE.get('MD20'),
  MD7: BY_CODE.get('MD7'),
  ME4: BY_CODE.get('ME4'),
  ME8: BY_CODE.get('ME8'),
  MF1: BY_CODE.get('MF1'),
  MF10: BY_CODE.get('MF10'),
  MF11: BY_CODE.get('MF11'),
  MF12: BY_CODE.get('MF12'),
  MF14: BY_CODE.get('MF14'),
  MF15: BY_CODE.get('MF15'),
  MF4: BY_CODE.get('MF4'),
  MF8: BY_CODE.get('MF8'),
  MG10: BY_CODE.get('MG10'),
  MG12: BY_CODE.get('MG12'),
  MG14: BY_CODE.get('MG14'),
  MG16: BY_CODE.get('MG16'),
  MG3: BY_CODE.get('MG3'),
  MG9: BY_CODE.get('MG9'),
  MH1: BY_CODE.get('MH1'),
  MH2: BY_CODE.get('MH2'),
  MH3: BY_CODE.get('MH3'),
  MH4: BY_CODE.get('MH4'),
  MH7: BY_CODE.get('MH7'),
};

function pickEvenly(arr, n) {
  if (n >= arr.length) return [...arr];
  const step = (arr.length - 1) / (n - 1);
  const picked = [];
  for (let i = 0; i < n; i++) {
    picked.push(arr[Math.round(i * step)]);
  }
  return picked;
}

export const PALETTES = {
  standard72: pickEvenly(BEAD_COLORS, 72),
  classic88: pickEvenly(BEAD_COLORS, 88),
  advance144: pickEvenly(BEAD_COLORS, 144),
  full221: BEAD_COLORS
};

function decodeGrid(rleStr, width, height, cmap) {
  const lines = rleStr.trim().split('|');
  const matrix = [];

  for (let y = 0; y < height; y++) {
    const row = [];
    const line = lines[y] ? lines[y].trim() : '';
    const tokens = line.split(/\s+/);

    for (const t of tokens) {
      if (!t) continue;
      const m = t.match(/^(\d+)?([A-Za-z0-9_.]+)$/);
      if (m) {
        const count = m[1] ? parseInt(m[1], 10) : 1;
        const code = m[2];
        const val = (code === '.' || code === '_') ? null : (cmap[code] || null);
        for (let i = 0; i < count; i++) {
          if (row.length < width) row.push(val);
        }
      }
    }

    while (row.length < width) {
      row.push(null);
    }
    matrix.push(row);
  }
  return matrix;
}

// =========================================================================
// 精选 70 款小红书与拼豆社区潮流爆款 32x32 大画幅主流图纸
// =========================================================================
export const ALL_PATTERNS = [
  {
    id: 'chiikawa-hachiware',
    title: '吉伊卡哇·小八猫',
    category: 'anime',
    tag: '顶流IP',
    difficulty: '★★★★☆',
    desc: '32×32标准画幅。小红书爆款，经典天蓝八字中分刘海、猫耳、水润黑眼高光与灵动呆萌小爪。',
    matrix: decodeGrid(`
      32. |
      32. |
      32. |
      8. 4MH7 9. 3MH7 8. |
      7. 2MH7 2MC4 MH7 8. 2MH7 MC4 2MH7 7. |
      7. MH7 3MC4 10MH7 3MC4 MH7 7. |
      7. MH7 MC4 14MC7 MC4 MH7 7. |
      7. MH7 4MC4 8MC7 4MC4 MH7 7. |
      6. 2MH7 8MC4 MC7 7MC4 2MH7 6. |
      6. MH7 18MC4 MH7 6. |
      6. MH7 MC4 2MH1 12MC4 2MH1 MC4 MH7 6. |
      5. 2MH7 5MH1 8MC4 5MH1 2MH7 5. |
      5. MH7 8MH1 4MC4 8MH1 MH7 5. |
      5. MH7 10MH1 MC4 9MH1 MH7 5. |
      4. 2MH7 4MH1 3MH7 6MH1 3MH7 4MH1 2MH7 4. |
      4. MH7 5MH1 MH7 MH1 MH7 6MH1 MH7 MH1 MH7 5MH1 MH7 4. |
      4. MH7 5MH1 3MH7 6MH1 3MH7 5MH1 MH7 4. |
      4. MH7 4MH1 2ME8 5MH1 MH7 4MH1 2ME8 4MH1 MH7 4. |
      4. MH7 3MH1 4ME8 2MH1 4MH7 2MH1 4ME8 3MH1 MH7 4. |
      4. MH7 4MH1 2ME8 4MH1 MH7 MH1 MH7 3MH1 2ME8 4MH1 MH7 4. |
      4. 2MH7 20MH1 2MH7 4. |
      5. MH7 20MH1 MH7 5. |
      5. MH7 20MH1 MH7 5. |
      5. 2MH7 18MH1 2MH7 5. |
      6. 2MH7 16MH1 2MH7 6. |
      7. 2MH7 14MH1 2MH7 7. |
      8. 3MH7 10MH1 3MH7 8. |
      10. 12MH7 10. |
      32. |
      32. |
      32. |
      32.
    `, 32, 32, C_MAP)
  },
  {
    id: 'chiikawa-usagi',
    title: '吉伊卡哇·乌萨奇',
    category: 'anime',
    tag: '顶流IP',
    difficulty: '★★★★☆',
    desc: '32×32标准画幅。活力明黄色长兔耳、傲娇大张圆嘴“呀哈哈”、粉嫩脸蛋与欢脱小手。',
    matrix: decodeGrid(`
      32. |
      32. |
      7. 7MH7 4. 7MH7 7. |
      7. MH7 5MA3 MH7 4. MH7 5MA3 MH7 7. |
      7. MH7 5MA3 MH7 4. MH7 5MA3 MH7 7. |
      7. MH7 3MA3 ME8 MA3 MH7 4. MH7 2MA3 ME8 2MA3 MH7 7. |
      7. MH7 3MA3 ME8 MA3 MH7 4. MH7 2MA3 ME8 2MA3 MH7 7. |
      7. MH7 3MA3 ME8 MA3 2MH7 2. 2MH7 2MA3 ME8 2MA3 MH7 7. |
      7. MH7 3MA3 ME8 2MA3 MH7 2. MH7 3MA3 ME8 2MA3 MH7 7. |
      7. 2MH7 2MA3 ME8 2MA3 4MH7 3MA3 ME8 MA3 2MH7 7. |
      8. MH7 2MA3 ME8 9MA3 ME8 MA3 MH7 8. |
      8. MH7 2MA3 ME8 9MA3 ME8 MA3 MH7 8. |
      7. 2MH7 14MA3 2MH7 7. |
      6. 2MH7 16MA3 2MH7 6. |
      5. 2MH7 18MA3 2MH7 5. |
      5. MH7 20MA3 MH7 5. |
      5. MH7 5MA3 2MH7 6MA3 2MH7 5MA3 MH7 5. |
      5. MH7 4MA3 MH7 MH1 2MH7 4MA3 MH7 MH1 2MH7 4MA3 MH7 5. |
      4. 2MH7 5MA3 2MH7 6MA3 2MH7 5MA3 2MH7 4. |
      4. MH7 3MA3 3ME4 3MA3 4MH7 3MA3 3ME4 3MA3 MH7 4. |
      4. 2MH7 2MA3 3ME4 3MA3 MH7 2MF12 MH7 3MA3 3ME4 2MA3 2MH7 4. |
      5. MH7 2MA3 3ME4 3MA3 MH7 2MF12 MH7 3MA3 3ME4 2MA3 MH7 5. |
      5. MH7 8MA3 MH7 2MF12 MH7 8MA3 MH7 5. |
      5. MH7 20MA3 MH7 5. |
      5. 2MH7 18MA3 2MH7 5. |
      6. 2MH7 16MA3 2MH7 6. |
      7. 2MH7 14MA3 2MH7 7. |
      8. 2MH7 12MA3 2MH7 8. |
      9. 4MH7 6MA3 4MH7 9. |
      12. 8MH7 12. |
      32. |
      32.
    `, 32, 32, C_MAP)
  },
  {
    id: 'chiikawa-main',
    title: '吉伊卡哇·小可爱',
    category: 'anime',
    tag: '顶流IP',
    difficulty: '★★★☆☆',
    desc: '32×32标准画幅。软糯纯白圆滚小熊脸蛋、水汪汪大眼高光、治愈小圆耳与两抹粉红腮红。',
    matrix: decodeGrid(`
      32. |
      32. |
      32. |
      32. |
      32. |
      6. 5MH7 10. 5MH7 6. |
      5. 2MH7 3MH1 2MH7 8. 2MH7 3MH1 2MH7 5. |
      4. 2MH7 2MH1 ME8 2MH1 10MH7 2MH1 ME8 2MH1 2MH7 4. |
      4. MH7 2MH1 3ME8 2MH1 MH7 6MH1 MH7 2MH1 3ME8 2MH1 MH7 4. |
      4. MH7 2MH1 3ME8 12MH1 3ME8 2MH1 MH7 4. |
      4. 2MH7 2MH1 ME8 14MH1 ME8 2MH1 2MH7 4. |
      5. 2MH7 18MH1 2MH7 5. |
      5. 2MH7 18MH1 2MH7 5. |
      5. MH7 4MH1 3MH7 7MH1 3MH7 3MH1 MH7 5. |
      4. 2MH7 5MH1 2MH7 6MH1 2MH7 5MH1 2MH7 4. |
      4. MH7 5MH1 MH7 MH1 MH7 6MH1 MH7 MH1 MH7 5MH1 MH7 4. |
      4. MH7 4MH1 5MH7 4MH1 5MH7 4MH1 MH7 4. |
      4. MH7 5MH1 2MH7 7MH1 2MH7 6MH1 MH7 4. |
      4. MH7 6MH1 MH7 4MH1 MH7 3MH1 MH7 6MH1 MH7 4. |
      4. MH7 2MH1 4ME4 10MH1 4ME4 2MH1 MH7 4. |
      4. MH7 2MH1 4ME4 4MH1 2MH7 4MH1 4ME4 2MH1 MH7 4. |
      4. 2MH7 20MH1 2MH7 4. |
      5. MH7 20MH1 MH7 5. |
      5. 2MH7 18MH1 2MH7 5. |
      6. 2MH7 16MH1 2MH7 6. |
      7. 2MH7 14MH1 2MH7 7. |
      8. 2MH7 12MH1 2MH7 8. |
      9. 4MH7 6MH1 4MH7 9. |
      12. 8MH7 12. |
      32. |
      32. |
      32.
    `, 32, 32, C_MAP)
  },
  {
    id: 'chiikawa-kurimanju',
    title: '吉伊卡哇·栗子馒头',
    category: 'anime',
    tag: '顶流IP',
    difficulty: '★★★★☆',
    desc: '32×32标准画幅。微醺表情的前辈，焦糖色渐变圆头，手举温热小茶杯与惬意红晕。',
    matrix: decodeGrid(`
      32. |
      32. |
      32. |
      10. 12MH7 10. |
      9. 2MH7 10MG12 2MH7 9. |
      9. MH7 12MG12 2MH7 8. |
      8. 2MH7 4MG12 4MG9 5MG12 MH7 8. |
      5. 4MH7 3MG12 9MG9 2MG12 4MH7 5. |
      5. MH7 2MG9 MG12 6MG9 2MH1 6MG9 MG12 2MG9 MH7 5. |
      5. MH7 8MG9 4MH1 8MG9 MH7 5. |
      5. MH7 6MG9 8MH1 6MG9 MH7 5. |
      5. MH7 5MG9 10MH1 5MG9 MH7 5. |
      5. MH7 4MG9 12MH1 4MG9 MH7 5. |
      5. MH7 2MG9 16MH1 2MG9 MH7 5. |
      4. 2MH7 MG9 18MH1 MG9 2MH7 4. |
      4. MH7 5MH1 3MH7 6MH1 3MH7 5MH1 MH7 4. |
      4. MH7 5MH1 3MH7 6MH1 3MH7 5MH1 MH7 4. |
      4. MH7 3MH1 3MF1 2MH7 6MH1 2MH7 3MF1 3MH1 MH7 4. |
      4. MH7 2MH1 5MF1 8MH1 5MF1 2MH1 MH7 4. |
      4. MH7 2MH1 5MF1 8MH1 5MF1 2MH1 MH7 4. |
      4. 2MH7 MH1 5MF1 2MH1 4MH7 2MH1 5MF1 MH1 2MH7 4. |
      5. MH7 2MH1 3MF1 4MH1 3MB28 3MH1 3MF1 2MH1 MH7 5. |
      5. MH7 8MH1 MB19 3MB28 MB19 7MH1 MH7 5. |
      5. 2MH7 7MH1 5MB19 6MH1 2MH7 5. |
      6. 2MH7 6MH1 5MB19 5MH1 2MH7 6. |
      7. 2MH7 5MH1 5MB19 4MH1 2MH7 7. |
      8. 3MH7 3MH1 5MB19 2MH1 3MH7 8. |
      10. 12MH7 10. |
      32. |
      32. |
      32. |
      32.
    `, 32, 32, C_MAP)
  },
  {
    id: 'chiikawa-momonga',
    title: '吉伊卡哇·飞鼠莫莫加',
    category: 'anime',
    tag: '顶流IP',
    difficulty: '★★★★☆',
    desc: '32×32标准画幅。蓬松天蓝长尾巴、闪烁傲娇星眸、大白脸蛋与可爱小肉爪。',
    matrix: decodeGrid(`
      32. |
      32. |
      32. |
      32. |
      22. 3MH7 7. |
      6. 3MH7 10. 4MH7 MC4 3MH7 5. |
      4. 3MH7 MH1 3MH7 6. 3MH7 MH1 5MC4 2MH7 4. |
      4. MH7 5MH1 8MH7 5MH1 MC4 MC13 2MC4 2MH7 3. |
      3. 2MH7 MH1 3MC3 MH1 MH7 8MH1 3MC3 MH1 4MC13 MC4 MH7 3. |
      3. MH7 2MH1 3MC3 10MH1 3MC3 2MH1 3MC13 MC4 2MH7 2. |
      3. 2MH7 MH1 3MC3 10MH1 3MC3 MH1 5MC13 MC4 MH7 2. |
      4. MH7 18MH1 5MC13 MC4 MH7 2. |
      4. 2MH7 12MH1 2MC4 MH1 7MC13 MC4 MH7 2. |
      4. MH7 13MH1 2MC4 9MC13 2MH7 1. |
      4. MH7 4MH1 3MC8 5MH1 3MC8 MC4 7MC13 2MC4 MH7 1. |
      4. MH7 3MH1 2MC8 MH1 2MC8 3MH1 2MC8 MH1 2MC8 7MC13 MC4 2MH7 1. |
      3. 2MH7 3MH1 5MC8 3MH1 5MC8 7MC13 MC4 MH7 2. |
      3. MH7 4MH1 5MC8 3MH1 5MC8 MC4 5MC13 2MC4 MH7 2. |
      3. 2MH7 MH1 4ME4 2MC8 5MH1 2MC8 4ME4 4MC13 2MC4 MH7 2. |
      4. MH7 MH1 4ME4 9MH1 4ME4 MC4 MC13 3MC4 2MH7 2. |
      4. MH7 MH1 4ME4 9MH1 4ME4 5MC4 MH7 3. |
      4. MH7 16MH1 6MC4 2MH7 3. |
      4. 2MH7 15MH1 5MC4 2MH7 4. |
      5. 2MH7 15MH1 MH7 MC4 3MH7 5. |
      6. 2MH7 13MH1 4MH7 7. |
      7. 2MH7 11MH1 2MH7 10. |
      8. 3MH7 7MH1 3MH7 11. |
      10. 9MH7 13. |
      32. |
      32. |
      32. |
      32.
    `, 32, 32, C_MAP)
  },
  {
    id: 'sanrio-kuromi',
    title: '三丽鸥·库洛米',
    category: 'anime',
    tag: '热门动漫',
    difficulty: '★★★★★',
    desc: '32×32标准画幅。小红书断货王！曜黑双恶魔耳、粉红骷髅标志、眨眼坏笑与紫粉领圈。',
    matrix: decodeGrid(`
      1. 4MH7 22. 4MH7 1. |
      2MH7 2MD14 2MH7 20. 2MH7 2MD14 2MH7 |
      MH7 4MD14 MH7 20. MH7 4MD14 MH7 |
      MH7 4MD14 MH7 20. MH7 4MD14 MH7 |
      2MH7 2MD14 3MH7 18. 3MH7 2MD14 2MH7 |
      1. 7MH7 17. 6MH7 1. |
      2. 6MH7 16. 6MH7 2. |
      2. 7MH7 14. 7MH7 2. |
      3. 7MH7 2. 8MH7 2. 7MH7 3. |
      3. 11MH7 4ME4 11MH7 3. |
      3. 26MH7 3. |
      4. 10MH7 4ME4 10MH7 4. |
      4. 10MH7 4ME4 10MH7 4. |
      4. 8MH7 8MH1 8MH7 4. |
      4. 7MH7 10MH1 7MH7 4. |
      4. 6MH7 12MH1 6MH7 4. |
      5. 3MH7 11MH1 MH7 4MH1 3MH7 5. |
      5. 2MH7 11MH1 MH7 MH1 MH7 4MH1 2MH7 5. |
      5. 2MH7 3MH1 4MH7 4MH1 3MH7 4MH1 2MH7 5. |
      6. MH7 2MH1 2ME4 8MH1 MH7 MH1 2ME4 2MH1 MH7 6. |
      6. MH7 MH1 4ME4 8MH1 4ME4 MH1 MH7 6. |
      6. MH7 2MH1 2ME4 5MH1 MF12 4MH1 2ME4 2MH1 MH7 6. |
      6. MH7 18MH1 MH7 6. |
      6. 2MH7 16MH1 2MH7 6. |
      7. 2MH7 14MH1 2MH7 7. |
      7. 3MH7 12MD7 3MH7 7. |
      7. MH7 2MD7 3MD14 2MD7 2MD14 2MD7 3MD14 2MD7 MH7 7. |
      7. MH7 2MD7 3MD14 MD7 4MD14 MD7 3MD14 2MD7 MH7 7. |
      7. MH7 2MD7 3MD14 2MD7 2MD14 2MD7 3MD14 2MD7 MH7 7. |
      7. 3MH7 12MD7 3MH7 7. |
      9. 14MH7 9. |
      32.
    `, 32, 32, C_MAP)
  },
  {
    id: 'sanrio-cinnamoroll',
    title: '三丽鸥·大耳狗玉桂狗',
    category: 'anime',
    tag: '热门动漫',
    difficulty: '★★★★☆',
    desc: '32×32标准画幅。连续多年三丽鸥人气冠军，飘逸飞天大白耳、清澈天蓝眼睛与治愈小嘴。',
    matrix: decodeGrid(`
      32. |
      32. |
      32. |
      32. |
      32. |
      32. |
      32. |
      32. |
      4MH7 8. 8MH7 8. 4MH7 |
      MH7 2MH1 3MH7 3. 4MH7 6MH1 4MH7 4. 2MH7 2MH1 MH7 |
      MH7 4MH1 2MH7 1. 2MH7 12MH1 2MH7 1. 3MH7 3MH1 MH7 |
      MH7 5MH1 3MH7 14MH1 3MH7 5MH1 MH7 |
      MH7 6MH1 MH7 16MH1 MH7 6MH1 MH7 |
      MH7 30MH1 MH7 |
      3MH7 26MH1 3MH7 |
      2. 3MH7 5MH1 4MC7 4MH1 4MC7 5MH1 3MH7 2. |
      4. 3MH7 3MH1 MC7 MH1 2MC7 4MH1 MC7 MH1 2MC7 3MH1 3MH7 4. |
      6. MH7 3MH1 4MC7 4MH1 4MC7 3MH1 MH7 6. |
      6. MH7 MH1 3ME4 5MH1 MH4 4MH1 3ME4 MH1 MH7 6. |
      6. MH7 5ME4 3MH1 MH4 MH1 MH4 2MH1 5ME4 MH7 6. |
      6. MH7 MH1 3ME4 10MH1 3ME4 MH1 MH7 6. |
      6. 2MH7 16MH1 2MH7 6. |
      7. 2MH7 14MH1 2MH7 7. |
      8. 2MH7 12MH1 2MH7 8. |
      9. 4MH7 2MH1 2MC8 2MH1 4MH7 9. |
      12. MH7 2MC4 2MC8 2MC4 MH7 12. |
      12. 4MH7 MC4 3MH7 12. |
      15. 3MH7 14. |
      32. |
      32. |
      32. |
      32.
    `, 32, 32, C_MAP)
  },
  {
    id: 'sanrio-mymelody',
    title: '三丽鸥·美乐蒂',
    category: 'anime',
    tag: '热门动漫',
    difficulty: '★★★★☆',
    desc: '32×32标准画幅。经典粉红头巾、标志性软萌长兔耳、金黄小纽扣鼻与清爽天蓝蝴蝶结。',
    matrix: decodeGrid(`
      32. |
      32. |
      5. 8MH7 19. |
      5. MH7 6ME4 MH7 9. 7MH7 3. |
      5. MH7 6ME4 MH7 8. 2MH7 5ME4 MH7 3. |
      5. MH7 6ME4 MH7 8. MH7 6ME4 MH7 3. |
      5. MH7 6ME4 2MH7 6. 2MH7 6ME4 MH7 3. |
      5. MH7 7ME4 MH7 6. MH7 6ME4 2MH7 3. |
      5. 2MH7 6ME4 8MH7 6ME4 MH7 4. |
      6. MH7 3ME4 3MC4 6ME4 MH7 7ME4 MH7 4. |
      6. MH7 2ME4 2MC4 MA4 2MC4 13ME4 MH7 4. |
      6. MH7 2ME4 MC4 3MA4 MC4 12ME4 2MH7 4. |
      6. MH7 2ME4 2MC4 MA4 2MC4 12ME4 MH7 5. |
      5. 2MH7 3ME4 3MC4 12ME4 2MH7 5. |
      5. MH7 6ME4 8MH1 6ME4 MH7 5. |
      5. MH7 5ME4 10MH1 5ME4 MH7 5. |
      5. MH7 4ME4 12MH1 4ME4 MH7 5. |
      4. 2MH7 3ME4 2MH1 2MH7 6MH1 2MH7 2MH1 3ME4 2MH7 4. |
      4. MH7 4ME4 2MH1 2MH7 6MH1 2MH7 2MH1 4ME4 MH7 4. |
      4. 2MH7 3ME4 6MH1 2MA4 6MH1 3ME4 2MH7 4. |
      5. MH7 3ME4 6MH1 2MA4 6MH1 3ME4 MH7 5. |
      5. MH7 3ME4 14MH1 3ME4 MH7 5. |
      5. MH7 3ME4 14MH1 3ME4 MH7 5. |
      5. 2MH7 3ME4 12MH1 3ME4 2MH7 5. |
      6. 2MH7 3ME4 10MH1 3ME4 2MH7 6. |
      7. 2MH7 3ME4 8MH1 3ME4 2MH7 7. |
      8. 2MH7 12ME4 2MH7 8. |
      9. 4MH7 6ME4 4MH7 9. |
      12. 8MH7 12. |
      32. |
      32. |
      32.
    `, 32, 32, C_MAP)
  },
  {
    id: 'sanrio-pochacco',
    title: '三丽鸥·帕恰狗',
    category: 'anime',
    tag: '热门动漫',
    difficulty: '★★★★☆',
    desc: '32×32标准画幅。圆头圆脑纯白小狗，标志性纯黑下垂大耳，配一抹亮丽红领巾。',
    matrix: decodeGrid(`
      32. |
      32. |
      32. |
      32. |
      32. |
      32. |
      32. |
      12. 8MH7 12. |
      9. 4MH7 6MH1 4MH7 9. |
      8. 2MH7 12MH1 2MH7 8. |
      7. 2MH7 14MH1 2MH7 7. |
      4. 4MH7 16MH1 4MH7 4. |
      2. 5MH7 18MH1 5MH7 2. |
      1. 7MH7 3MH1 MH7 8MH1 MH7 3MH1 7MH7 1. |
      1. 7MH7 2MH1 3MH7 6MH1 3MH7 2MH1 7MH7 1. |
      1. 7MH7 2MH1 3MH7 6MH1 3MH7 2MH1 7MH7 1. |
      1. 7MH7 3MH1 MH7 8MH1 MH7 3MH1 7MH7 1. |
      1. 8MH7 5MH1 4MH7 5MH1 8MH7 1. |
      1. 8MH7 5MH1 4MH7 5MH1 8MH7 1. |
      2. 5MH7 18MH1 5MH7 2. |
      2. 5MH7 18MH1 5MH7 2. |
      2. 5MH7 18MH1 5MH7 2. |
      2. 3MH7 1. 2MH7 16MH1 2MH7 1. 3MH7 2. |
      7. 2MH7 14MH1 2MH7 7. |
      8. 2MH7 2MH1 3MF4 2MF15 3MF4 2MH1 2MH7 8. |
      8. MH7 5MF4 4MF15 5MF4 MH7 8. |
      8. 4MH7 3MF4 2MF15 3MF4 4MH7 8. |
      11. 5MH7 MF4 4MH7 11. |
      15. 3MH7 14. |
      32. |
      32. |
      32.
    `, 32, 32, C_MAP)
  },
  {
    id: 'sanrio-pompompurin',
    title: '三丽鸥·布丁狗',
    category: 'anime',
    tag: '热门动漫',
    difficulty: '★★★★☆',
    desc: '32×32标准画幅。暖黄焦糖布丁色圆滚脸蛋，头顶纯黑巧克力焦糖贝雷帽，憨态可掬。',
    matrix: decodeGrid(`
      32. |
      32. |
      32. |
      32. |
      15. 3MH7 14. |
      15. MH7 MG14 MH7 14. |
      11. 5MH7 MG14 4MH7 11. |
      10. 2MH7 8MG14 2MH7 10. |
      10. MH7 10MG14 MH7 10. |
      9. 2MH7 10MG14 2MH7 9. |
      8. 2MH7 2MA4 8MG14 2MA4 2MH7 8. |
      6. 3MH7 14MA4 3MH7 6. |
      6. MH7 18MA4 MH7 6. |
      5. 2MH7 18MA4 2MH7 5. |
      3. 3MH7 20MA4 3MH7 3. |
      2. 2MH7 7MA4 MH7 8MA4 MH7 7MA4 2MH7 2. |
      2. MH7 7MA4 3MH7 6MA4 3MH7 7MA4 MH7 2. |
      2. MH7 7MA4 3MH7 6MA4 3MH7 7MA4 MH7 2. |
      2. MH7 5MA4 2MF14 MA4 MH7 3MA4 2MG14 3MA4 MH7 MA4 2MF14 5MA4 MH7 2. |
      2. 2MH7 3MA4 4MF14 4MA4 2MG14 4MA4 4MF14 3MA4 2MH7 2. |
      3. 2MH7 2MA4 4MF14 10MA4 4MF14 2MA4 2MH7 3. |
      4. 2MH7 2MA4 2MF14 5MA4 MG14 MA4 MG14 4MA4 2MF14 2MA4 2MH7 4. |
      5. MH7 20MA4 MH7 5. |
      5. 2MH7 18MA4 2MH7 5. |
      6. MH7 18MA4 MH7 6. |
      6. 3MH7 14MA4 3MH7 6. |
      8. 2MH7 12MA4 2MH7 8. |
      9. 3MH7 8MA4 3MH7 9. |
      11. 10MH7 11. |
      32. |
      32. |
      32.
    `, 32, 32, C_MAP)
  },
  {
    id: 'sanrio-hellokitty',
    title: '三丽鸥·凯蒂猫',
    category: 'anime',
    tag: '热门动漫',
    difficulty: '★★★☆☆',
    desc: '32×32标准画幅。全球经典萌神！纯白圆脸、左耳正红大蝴蝶结、金黄小纽扣鼻与六根小胡须。',
    matrix: decodeGrid(`
      32. |
      32. |
      32. |
      6. 3MH7 13. 4MH7 6. |
      5. 2MH7 MH1 2MH7 10. 3MH7 MF4 MH1 2MH7 5. |
      5. MH7 3MH1 MH7 10. MH7 5MF4 MH7 5. |
      4. 2MH7 3MH1 2MH7 8. 2MH7 5MF4 4MH7 2. |
      4. MH7 5MH1 MH7 8. MH7 4MF4 MF15 4MF4 2MH7 1. |
      3. 2MH7 5MH1 11MH7 2MF4 3MF15 4MF4 MH7 1. |
      3. MH7 17MH1 2MF4 3MF15 4MF4 MH7 1. |
      2. 2MH7 17MH1 3MF4 MF15 5MF4 MH7 1. |
      2. MH7 18MH1 8MF4 2MH7 1. |
      2. 5MH7 14MH1 5MF4 4MH7 2. |
      4. 2MH7 16MH1 3MF4 MH1 2MH7 4. |
      4. MH7 22MH1 MH7 4. |
      3. 2MH7 6MH1 MH7 8MH1 MH7 6MH1 2MH7 3. |
      3. 3MH7 4MH1 3MH7 6MH1 3MH7 4MH1 3MH7 3. |
      3. 2MH7 MH1 2MH7 2MH1 3MH7 6MH1 3MH7 2MH1 5MH7 3. |
      3. 2MH7 6MH1 MH7 2MH1 4MA4 2MH1 MH7 6MH1 2MH7 3. |
      3. 5MH7 6MH1 4MA4 6MH1 5MH7 3. |
      3. 2MH7 22MH1 2MH7 3. |
      4. MH7 22MH1 MH7 4. |
      4. 2MH7 20MH1 2MH7 4. |
      5. 2MH7 18MH1 2MH7 5. |
      6. 2MH7 16MH1 2MH7 6. |
      7. 2MH7 14MH1 2MH7 7. |
      8. 3MH7 10MH1 3MH7 8. |
      10. 12MH7 10. |
      32. |
      32. |
      32. |
      32.
    `, 32, 32, C_MAP)
  },
  {
    id: 'ghibli-totoro',
    title: '龙猫·多多洛',
    category: 'anime',
    tag: '吉卜力',
    difficulty: '★★★★★',
    desc: '32×32标准画幅。吉卜力经典温情代表，灰白大肚皮、月牙斑纹、尖长小圆耳与头顶翠绿嫩树叶。',
    matrix: decodeGrid(`
      32. |
      32. |
      7. 6MH7 6. 6MH7 7. |
      7. MH7 4MH3 8MH7 4MH3 MH7 7. |
      7. MH7 4MH3 MH7 6MB5 MH7 4MH3 MH7 7. |
      7. MH7 4MH3 4MB5 MB8 3MB5 4MH3 MH7 7. |
      7. MH7 5MH3 3MB5 MB8 2MB5 MH7 4MH3 MH7 7. |
      7. 2MH7 4MH3 3MH7 MB8 2MH7 4MH3 2MH7 7. |
      8. MH7 7MH3 MB8 6MH3 MH7 8. |
      7. 2MH7 7MH3 MB8 6MH3 2MH7 7. |
      6. 2MH7 MH3 4MH1 6MH3 4MH1 MH3 2MH7 6. |
      5. 2MH7 2MH3 2MH1 MH7 MH1 6MH3 MH1 MH7 2MH1 2MH3 2MH7 5. |
      5. MH7 2MH3 2MH1 3MH7 MH1 4MH3 MH1 3MH7 2MH1 2MH3 MH7 5. |
      4. 2MH7 3MH3 2MH1 MH7 MH1 6MH3 MH1 MH7 2MH1 3MH3 2MH7 4. |
      4. MH7 4MH3 4MH1 2MH3 2MH7 2MH3 4MH1 4MH3 MH7 4. |
      3. 2MH7 8MH3 6MH1 8MH3 2MH7 3. |
      3. MH7 7MH3 10MH1 7MH3 MH7 3. |
      3. MH7 6MH3 3MH1 MH4 4MH1 2MH4 2MH1 6MH3 MH7 3. |
      3. MH7 5MH3 2MH1 2MH4 6MH1 2MH4 2MH1 5MH3 MH7 3. |
      3. MH7 4MH3 16MH1 4MH3 MH7 3. |
      3. MH7 4MH3 16MH1 4MH3 MH7 3. |
      3. MH7 4MH3 6MH1 4MH4 6MH1 4MH3 MH7 3. |
      3. 2MH7 2MH3 18MH1 2MH3 2MH7 3. |
      4. MH7 3MH3 16MH1 3MH3 MH7 4. |
      4. 2MH7 2MH3 16MH1 2MH3 2MH7 4. |
      5. MH7 2MH3 16MH1 2MH3 MH7 5. |
      5. 2MH7 2MH3 14MH1 2MH3 2MH7 5. |
      6. 2MH7 2MH3 12MH1 2MH3 2MH7 6. |
      7. 3MH7 MH3 10MH1 MH3 3MH7 7. |
      9. 3MH7 MH3 6MH1 MH3 3MH7 9. |
      11. 10MH7 11. |
      32.
    `, 32, 32, C_MAP)
  },
  {
    id: 'ghibli-kaonashi',
    title: '千与千寻·无脸男',
    category: 'anime',
    tag: '吉卜力',
    difficulty: '★★★☆☆',
    desc: '32×32标准画幅。幽黑神秘修长斗篷、纯白椭圆假面面具、深紫泪痕印记与呆萌小眼神。',
    matrix: decodeGrid(`
      32. |
      32. |
      32. |
      32. |
      12. 8MH7 12. |
      10. 3MH7 6MH1 3MH7 10. |
      9. 2MH7 4MH1 2MD7 4MH1 2MH7 9. |
      9. MH7 5MH1 2MD7 5MH1 MH7 9. |
      8. 2MH7 12MH1 2MH7 8. |
      8. MH7 14MH1 MH7 8. |
      8. MH7 14MH1 MH7 8. |
      8. MH7 MH1 3MD7 6MH1 3MD7 MH1 MH7 8. |
      7. 2MH7 MH1 3MH7 6MH1 3MH7 MH1 2MH7 7. |
      6. 2MH7 3MH1 2MD7 7MH1 2MD7 2MH1 2MH7 6. |
      5. 4MH7 2MH1 MD7 8MH1 MD7 2MH1 4MH7 5. |
      5. 4MH7 2MH1 MD7 8MH1 MD7 2MH1 4MH7 5. |
      5. 4MH7 2MH1 MD7 8MH1 MD7 2MH1 4MH7 5. |
      4. 5MH7 5MH1 4MH7 5MH1 5MH7 4. |
      4. 6MH7 12MH1 6MH7 4. |
      4. 6MH7 5MH1 2MD7 5MH1 6MH7 4. |
      4. 7MH7 4MH1 3MD7 3MH1 7MH7 4. |
      4. 9MH7 6MH1 9MH7 4. |
      4. 24MH7 4. |
      4. 24MH7 4. |
      5. 22MH7 5. |
      5. 22MH7 5. |
      5. 22MH7 5. |
      6. 20MH7 6. |
      7. 18MH7 7. |
      8. 16MH7 8. |
      10. 12MH7 10. |
      15. 3MH7 14.
    `, 32, 32, C_MAP)
  },
  {
    id: 'sailor-moon-luna',
    title: '美少女战士·黑猫露娜',
    category: 'anime',
    tag: '怀旧经典',
    difficulty: '★★★★☆',
    desc: '32×32标准画幅。优雅暗夜黑猫轮廓、额前金色弯月标记、红宝石灵动大眼睛与俏皮耳尖。',
    matrix: decodeGrid(`
      32. |
      32. |
      6. 3MH7 14. 3MH7 6. |
      5. 5MH7 12. 5MH7 5. |
      5. 5MH7 12. 5MH7 5. |
      4. 7MH7 10. 7MH7 4. |
      4. 4MH7 MD14 2MH7 10. 2MH7 MD14 4MH7 4. |
      3. 4MH7 3MD14 2MH7 1. 6MH7 1. 2MH7 3MD14 4MH7 3. |
      3. 4MH7 3MD14 12MH7 3MD14 4MH7 3. |
      2. 4MH7 5MD14 10MH7 5MD14 4MH7 2. |
      2. 4MH7 5MD14 10MH7 5MD14 4MH7 2. |
      2. 11MH7 MA4 4MH7 MA4 11MH7 2. |
      2. 11MH7 MA4 4MH7 MA4 11MH7 2. |
      5. 9MH7 4MA4 9MH7 5. |
      5. 6MH7 MF4 3MH7 2MA4 3MH7 MF4 6MH7 5. |
      5. 4MH7 5MF4 4MH7 5MF4 4MH7 5. |
      5. 4MH7 2MF4 MH1 2MF4 4MH7 2MF4 MH1 2MF4 4MH7 5. |
      3. 6MH7 5MF4 4MH7 5MF4 6MH7 3. |
      3. MH7 2MH3 3MH7 5MF4 4MH7 5MF4 3MH7 2MH3 MH7 3. |
      3. 3MH7 2MH3 3MH7 MF4 8MH7 MF4 3MH7 3MH3 2MH7 3. |
      5. 11MH7 ME8 11MH7 4. |
      5. 22MH7 5. |
      5. 22MH7 5. |
      6. 20MH7 6. |
      6. 20MH7 6. |
      7. 18MH7 7. |
      9. 14MH7 9. |
      10. 12MH7 10. |
      32. |
      32. |
      32. |
      32.
    `, 32, 32, C_MAP)
  },
  {
    id: 'capybara-orange',
    title: '卡皮巴拉顶橘子',
    category: 'pets',
    tag: '小红书顶流',
    difficulty: '★★★☆☆',
    desc: '32×32标准画幅。全网顶流情绪稳定大师！头顶鲜嫩小蜜橘、惬意眯眼、圆滚暖棕毛发。',
    matrix: decodeGrid(`
      15. 4MH7 13. |
      14. 2MH7 MG14 MB5 3MH7 11. |
      13. 2MH7 5MB5 MH7 11. |
      12. 2MH7 3MA7 MB5 3MH7 11. |
      12. MH7 3MA7 2MA6 MA7 MH7 12. |
      12. MH7 3MA7 2MA6 MA7 MH7 12. |
      12. MH7 6MA7 MH7 12. |
      12. MH7 6MA7 MH7 12. |
      9. 4MH7 MG9 4MA7 MG9 4MH7 9. |
      8. 2MH7 12MG9 2MH7 8. |
      4. 5MH7 14MG9 5MH7 4. |
      3. 2MH7 2MG12 MH7 16MG9 MH7 2MG12 2MH7 3. |
      3. MH7 4MG12 16MG9 4MG12 MH7 3. |
      3. MH7 4MG12 16MG9 4MG12 MH7 3. |
      3. MH7 4MG12 16MG9 4MG12 MH7 3. |
      3. 2MH7 2MG12 2MG9 5MH7 5MG9 5MH7 MG9 2MG12 2MH7 3. |
      4. MH7 2MG10 18MG9 2MG10 MH7 4. |
      4. MH7 2MG10 6MG9 5MG14 7MG9 2MG10 MH7 4. |
      3. 2MH7 2MG10 6MG9 MG14 MH7 MG14 MH7 MG14 7MG9 2MG10 2MH7 3. |
      3. MH7 4MG10 5MG9 MG14 MH7 MG14 MH7 MG14 6MG9 4MG10 MH7 3. |
      3. 2MH7 4MG10 4MG9 5MG14 5MG9 4MG10 2MH7 3. |
      4. MH7 5MG10 12MG9 5MG10 MH7 4. |
      4. MH7 8MG10 6MG9 8MG10 MH7 4. |
      4. MH7 22MG10 MH7 4. |
      4. 2MH7 20MG10 2MH7 4. |
      5. 2MH7 18MG10 2MH7 5. |
      6. 2MH7 16MG10 2MH7 6. |
      7. 2MH7 14MG10 2MH7 7. |
      8. 3MH7 10MG10 3MH7 8. |
      10. 12MH7 10. |
      32. |
      32.
    `, 32, 32, C_MAP)
  },
  {
    id: 'capybara-onsen',
    title: '温泉惬意水豚',
    category: 'pets',
    tag: '治愈萌宠',
    difficulty: '★★★★☆',
    desc: '32×32标准画幅。头顶白毛巾在暖暖温泉中泡汤的卡皮巴拉，上升缕缕白色蒸汽。',
    matrix: decodeGrid(`
      17. 3MH7 12. |
      10. 3MH7 4. MH7 MH1 MH7 12. |
      10. MH7 MH1 MH7 4. MH7 MH1 2MH7 11. |
      10. MH7 MH1 2MH7 3. 2MH7 MH1 MH7 11. |
      10. 2MH7 MH1 MH7 4. MH7 MH1 MH7 11. |
      11. MH7 MH1 MH7 4. 3MH7 11. |
      11. 9MH7 12. |
      10. 2MH7 7MH2 2MH7 11. |
      10. MH7 MH1 7MH2 MH1 MH7 11. |
      9. 2MH7 9MH1 3MH7 9. |
      8. 2MH7 MG10 9MH1 2MG10 2MH7 8. |
      7. 2MH7 14MG10 2MH7 7. |
      6. 2MH7 16MG10 2MH7 6. |
      6. MH7 18MG10 MH7 6. |
      5. 2MH7 2MG10 4MH7 6MG10 4MH7 2MG10 2MH7 5. |
      5. MH7 20MG10 MH7 5. |
      5. MH7 20MG10 MH7 5. |
      5. MH7 8MG10 4MG14 8MG10 MH7 5. |
      5. MH7 8MG10 4MG14 8MG10 MH7 5. |
      5. MH7 8MG10 4MG14 8MG10 MH7 5. |
      5. 2MH7 18MG10 2MH7 5. |
      6. MH7 18MG10 MH7 6. |
      2. 6MH7 16MG10 6MH7 2. |
      2. MH7 6MC3 14MG10 6MC3 MH7 2. |
      1. 2MH7 7MC3 12MG10 7MC3 2MH7 1. |
      1. MH7 11MC11 6MG10 11MC11 MH7 1. |
      1. 2MH7 26MC3 2MH7 1. |
      2. MH7 26MC3 MH7 2. |
      2. MH7 MC3 24MC7 MC3 MH7 2. |
      2. MH7 26MC3 MH7 2. |
      2. 28MH7 2. |
      32.
    `, 32, 32, C_MAP)
  },
  {
    id: 'shiba-inu-happy',
    title: '笑脸开朗赤柴',
    category: 'pets',
    tag: '萌宠治愈',
    difficulty: '★★★★☆',
    desc: '32×32标准画幅。圆滚滚暖金赤柴头，雪白对称眼斑、黑色小豆眼与吐出的一小撮粉红舌头。',
    matrix: decodeGrid(`
      32. |
      32. |
      5. 4MH7 14. 4MH7 5. |
      5. MH7 2MA7 2MH7 12. 2MH7 2MA7 MH7 5. |
      5. MH7 3MA7 3MH7 9. 2MH7 3MA7 MH7 5. |
      5. 2MH7 MA7 ME8 2MA7 2MH7 6. 3MH7 MA7 ME8 MA7 2MH7 5. |
      6. MH7 3ME8 2MA7 2MH7 4. 2MH7 2MA7 3ME8 MH7 6. |
      5. 2MH7 3ME8 3MA7 2MH7 2. 2MH7 3MA7 3ME8 2MH7 5. |
      5. MH7 5ME8 3MA7 4MH7 3MA7 5ME8 MH7 5. |
      5. MH7 5ME8 10MA7 5ME8 MH7 5. |
      5. 3MH7 16MA7 3MH7 5. |
      6. 2MH7 16MA7 2MH7 6. |
      6. MH7 2MA7 4MH1 6MA7 4MH1 2MA7 MH7 6. |
      5. 2MH7 2MA7 4MH1 6MA7 4MH1 2MA7 2MH7 5. |
      5. MH7 3MA7 4MH1 6MA7 4MH1 3MA7 MH7 5. |
      4. 2MH7 4MA7 3MH7 6MA7 3MH7 4MA7 2MH7 4. |
      4. MH7 5MA7 MH7 MH1 MH7 6MH1 MH7 MH1 MH7 5MA7 MH7 4. |
      4. MH7 5MA7 3MH7 6MH1 3MH7 5MA7 MH7 4. |
      4. MH7 5MA7 12MH1 5MA7 MH7 4. |
      4. MH7 4MA7 6MH1 2MH7 6MH1 4MA7 MH7 4. |
      4. MH7 4MA7 14MH1 4MA7 MH7 4. |
      4. 2MH7 3MA7 5MH1 4ME4 5MH1 3MA7 2MH7 4. |
      5. MH7 3MA7 5MH1 4ME4 5MH1 3MA7 MH7 5. |
      5. 2MH7 2MA7 5MH1 4ME4 5MH1 2MA7 2MH7 5. |
      6. MH7 3MA7 4MH1 4ME4 4MH1 3MA7 MH7 6. |
      6. 3MH7 2MA7 10MH1 2MA7 3MH7 6. |
      8. 2MH7 3MA7 6MH1 3MA7 2MH7 8. |
      9. 3MH7 8MA7 3MH7 9. |
      11. 10MH7 11. |
      32. |
      32. |
      32.
    `, 32, 32, C_MAP)
  },
  {
    id: 'lucky-maneki-neko',
    title: '招财开运猫',
    category: 'pets',
    tag: '开运吉祥',
    difficulty: '★★★★☆',
    desc: '32×32标准画幅。高高举起右手招财纳福，正红喜庆领圈与金黄大铃铛，富贵吉祥。',
    matrix: decodeGrid(`
      32. |
      32. |
      4. 4MH7 16. 4MH7 4. |
      4. 6MH7 12. 3MH7 2MA7 MH7 4. |
      4. 7MH7 10. 2MH7 4MA7 MH7 4. |
      5. 3MH7 ME4 4MH7 6. 3MH7 MA7 ME4 2MA7 2MH7 4. |
      5. 2MH7 3ME4 4MH7 4. 2MH7 2MA7 3ME4 MA7 MH7 5. |
      5. 2MH7 3ME4 4MH7 4. MH7 3MA7 3ME4 MA7 MH7 5. |
      5. MH7 5ME4 10MH7 5ME4 2MH7 4. |
      5. 6MH7 10MH1 MH7 2MA7 3MH1 2MH7 3. |
      6. 3MH7 19MH1 2MH7 2. |
      6. 2MH7 21MH1 MH7 2. |
      5. 2MH7 17MH1 ME4 MH1 ME4 2MH1 MH7 2. |
      5. MH7 23MH1 MH7 2. |
      5. MH7 22MH1 2MH7 2. |
      4. 2MH7 3MH1 2MH7 2MH1 MH7 4MH1 MH7 2MH1 2MH7 4MH1 2MH7 3. |
      4. MH7 6MH1 3MH7 5MH1 3MH7 5MH1 MH7 4. |
      4. MH7 22MH1 MH7 4. |
      4. MH7 22MH1 MH7 4. |
      4. MH7 22MH1 MH7 4. |
      4. MH7 22MH1 MH7 4. |
      4. 2MH7 20MH1 2MH7 4. |
      5. MH7 20MH1 MH7 5. |
      5. MH7 20MH1 MH7 5. |
      5. 2MH7 2MH1 13MF4 3MH1 2MH7 5. |
      6. 2MH7 MH1 5MF4 4MA4 4MF4 2MH1 2MH7 6. |
      7. 2MH7 5MF4 4MA4 4MF4 MH1 2MH7 7. |
      8. 3MH7 3MH1 2MA4 MH7 MA4 3MH1 3MH7 8. |
      10. 4MH7 4MA4 4MH7 10. |
      13. 6MH7 13. |
      32. |
      32.
    `, 32, 32, C_MAP)
  },
  {
    id: 'giant-panda-bamboo',
    title: '国宝大熊猫吃竹竹',
    category: 'pets',
    tag: '治愈萌宠',
    difficulty: '★★★★☆',
    desc: '32×32标准画幅。圆滚滚黑白国宝，经典黑眼圈、黑耳朵与双手紧紧握着的新鲜竹节。',
    matrix: decodeGrid(`
      32. |
      32. |
      5. 3MH7 16. 3MH7 5. |
      3. 7MH7 12. 7MH7 3. |
      2. 9MH7 10. 9MH7 2. |
      2. 9MH7 10. 9MH7 2. |
      2. 9MH7 10. 9MH7 2. |
      2. 28MH7 2. |
      2. 9MH7 10MH1 9MH7 2. |
      2. 7MH7 14MH1 7MH7 2. |
      3. 5MH7 16MH1 5MH7 3. |
      5. 2MH7 18MH1 2MH7 5. |
      5. MH7 20MH1 MH7 5. |
      5. MH7 3MH1 4MH7 6MH1 4MH7 3MH1 MH7 5. |
      4. 2MH7 2MH1 6MH7 4MH1 6MH7 2MH1 2MH7 4. |
      4. MH7 3MH1 3MH7 MH1 2MH7 4MH1 3MH7 MH1 2MH7 3MH1 MH7 4. |
      4. MH7 3MH1 6MH7 4MH1 6MH7 3MH1 MH7 4. |
      4. MH7 4MH1 4MH7 2MH1 2MH7 2MH1 4MH7 4MH1 MH7 4. |
      4. MH7 9MH1 4MH7 9MH1 MH7 4. |
      4. MH7 10MH1 2MH7 MH1 3MH7 MB8 5MH1 MH7 4. |
      4. 2MH7 11MH1 5MH7 4MH1 2MH7 4. |
      5. MH7 11MH1 5MH7 4MH1 MH7 5. |
      5. MH7 5MH1 3MH7 3MH1 5MH7 4MH1 MH7 5. |
      5. 2MH7 3MH1 5MH7 MH1 2MB8 3MH7 4MH1 2MH7 5. |
      6. 2MH7 2MH1 5MH7 2MB8 2MB5 5MH1 2MH7 6. |
      7. 2MH7 MH1 5MH7 MB8 2MB5 5MH1 2MH7 7. |
      8. 6MH7 MB8 2MB5 4MH1 3MH7 8. |
      10. 2MH7 2MB8 2MB5 6MH7 10. |
      10. MH7 4MB5 2MH7 15. |
      10. MH7 3MB5 2MH7 16. |
      10. 5MH7 17. |
      32.
    `, 32, 32, C_MAP)
  },
  {
    id: 'cute-corgi-butt',
    title: '柯基爱心蜜桃臀',
    category: 'pets',
    tag: '网红爆款',
    difficulty: '★★★☆☆',
    desc: '32×32标准画幅。小红书爆款萌物！金黄浑圆大屁股、心形雪白斑纹与摇晃小短尾。',
    matrix: decodeGrid(`
      32. |
      32. |
      32. |
      32. |
      32. |
      32. |
      11. 10MH7 11. |
      9. 3MH7 8MA7 3MH7 9. |
      7. 3MH7 12MA7 3MH7 7. |
      6. 2MH7 16MA7 2MH7 6. |
      5. 2MH7 18MA7 2MH7 5. |
      4. 2MH7 10MA7 MH1 9MA7 2MH7 4. |
      4. MH7 22MA7 MH7 4. |
      4. MH7 22MA7 MH7 4. |
      3. 2MH7 22MA7 2MH7 3. |
      3. MH7 7MA7 4MH1 2MA7 4MH1 7MA7 MH7 3. |
      3. MH7 6MA7 12MH1 6MA7 MH7 3. |
      3. MH7 5MA7 14MH1 5MA7 MH7 3. |
      3. MH7 5MA7 14MH1 5MA7 MH7 3. |
      3. MH7 4MA7 16MH1 4MA7 MH7 3. |
      3. 2MH7 4MA7 14MH1 4MA7 2MH7 3. |
      4. MH7 4MA7 14MH1 4MA7 MH7 4. |
      4. MH7 4MA7 14MH1 4MA7 MH7 4. |
      4. 2MH7 5MA7 11MH1 4MA7 2MH7 4. |
      4. 2MH7 6MA7 8MH1 6MA7 2MH7 4. |
      4. MH7 8MA7 6MH1 8MA7 MH7 4. |
      4. 2MH7 8MA7 4MH1 8MA7 2MH7 4. |
      5. MH7 4MA7 2MH7 4MA7 MH1 3MA7 2MH7 4MA7 MH7 5. |
      5. 22MH7 5. |
      32. |
      32. |
      32.
    `, 32, 32, C_MAP)
  },
  {
    id: 'little-otter-shell',
    title: '仰泳小水獭',
    category: 'pets',
    tag: '治愈萌宠',
    difficulty: '★★★★☆',
    desc: '32×32标准画幅。仰卧水面上悠闲漂浮，两只小短手护着心爱的粉红小扇贝。',
    matrix: decodeGrid(`
      32. |
      32. |
      32. |
      32. |
      32. |
      32. |
      11. 10MH7 11. |
      9. 3MH7 8MG12 3MH7 9. |
      8. 2MH7 12MG12 2MH7 8. |
      5. 4MH7 14MG12 4MH7 5. |
      5. MH7 3MG16 14MG12 3MG16 MH7 5. |
      5. MH7 3MG16 3MG12 8MG3 3MG12 3MG16 MH7 5. |
      5. MH7 3MG16 2MG12 10MG3 2MG12 3MG16 MH7 5. |
      5. 2MH7 4MG12 3MH7 4MG3 3MH7 4MG12 2MH7 5. |
      6. MH7 3MG12 MG3 3MH7 4MG3 3MH7 MG3 3MG12 MH7 6. |
      6. MH7 3MG12 12MG3 3MG12 MH7 6. |
      6. MH7 3MG12 6MG3 MH7 5MG3 3MG12 MH7 6. |
      6. 2MH7 3MG12 10MG3 3MG12 2MH7 6. |
      7. MH7 3MG12 10MG3 3MG12 MH7 7. |
      7. 2MH7 3MG12 8MG3 3MG12 2MH7 7. |
      8. 2MH7 3MG12 6ME4 3MG12 2MH7 8. |
      8. MH7 4MG12 6ME4 4MG12 MH7 8. |
      8. MH7 4MG12 6ME4 4MG12 MH7 8. |
      8. MH7 4MG12 6ME4 4MG12 MH7 8. |
      8. 4MH7 8ME4 4MH7 8. |
      11. 2MH7 ME4 4ME8 ME4 2MH7 11. |
      12. MH7 2ME4 2ME8 2ME4 MH7 12. |
      12. 4MH7 ME8 3MH7 12. |
      15. 3MH7 14. |
      32. |
      32. |
      32.
    `, 32, 32, C_MAP)
  },
  {
    id: 'calico-cat-paw',
    title: '三花猫粉肉垫爪爪',
    category: 'pets',
    tag: '猫奴狂喜',
    difficulty: '★★★☆☆',
    desc: '32×32标准画幅。毛茸茸黑白橘三花猫小胖手，掌心一颗爱心大粉肉球与四个Q弹小肉垫。',
    matrix: decodeGrid(`
      32. |
      32. |
      32. |
      32. |
      32. |
      10. 12MH7 10. |
      8. 3MH7 10MH1 3MH7 8. |
      5. 4MH7 2MA7 4ME4 2MH1 4ME4 2MH1 2MH7 7. |
      5. MH7 5MA7 4ME4 2MH1 4ME4 6MH7 5. |
      5. MH7 MA7 2ME4 2MA7 4ME4 2MH1 4ME4 2MH7 2ME4 2MH7 5. |
      5. MH7 4ME4 MA7 4ME4 2MH1 4ME4 MH7 4ME4 MH7 5. |
      5. MH7 4ME4 3MA7 6MH1 3MH7 4ME4 MH7 5. |
      4. 2MH7 4ME4 3MA7 6MH1 3MH7 4ME4 2MH7 4. |
      4. MH7 MH1 MA7 2ME4 4MA7 6ME4 4MH7 2ME4 MH7 MH1 MH7 4. |
      4. MH7 MH1 6MA7 8ME4 MH1 5MH7 MH1 MH7 4. |
      4. MH7 MH1 MA7 4MH1 10ME4 2MH1 3MH7 MH1 MH7 4. |
      4. MH7 6MH1 10ME4 4MH1 MH7 MH1 MH7 4. |
      4. MH7 6MH1 10ME4 6MH1 MH7 4. |
      4. 2MH7 6MH1 8ME4 6MH1 2MH7 4. |
      5. MH7 7MH1 6ME4 7MH1 MH7 5. |
      5. MH7 20MH1 MH7 5. |
      5. 2MH7 18MH1 2MH7 5. |
      6. 2MH7 16MH1 2MH7 6. |
      7. 2MH7 14MH1 2MH7 7. |
      8. 2MH7 11MH1 3MH7 8. |
      9. MH7 11MH1 MH7 10. |
      9. MH7 11MH1 MH7 10. |
      9. MH7 11MH1 MH7 10. |
      9. 13MH7 10. |
      32. |
      32. |
      32.
    `, 32, 32, C_MAP)
  },
  {
    id: 'fluffy-penguin-chick',
    title: '帝企鹅宝宝',
    category: 'pets',
    tag: '极地萌物',
    difficulty: '★★★☆☆',
    desc: '32×32标准画幅。圆嘟嘟灰白绒毛小企鹅，黑面罩、白眼圈与暖橙色小尖嘴。',
    matrix: decodeGrid(`
      32. |
      32. |
      32. |
      32. |
      12. 8MH7 12. |
      10. 12MH7 10. |
      9. 14MH7 9. |
      8. 16MH7 8. |
      7. 18MH7 7. |
      7. 4MH7 MH1 8MH7 MH1 4MH7 7. |
      7. 2MH7 5MH1 4MH7 5MH1 2MH7 7. |
      6. 3MH7 2MH1 2MH7 MH1 4MH7 MH1 2MH7 2MH1 3MH7 6. |
      5. 3MH7 3MH1 2MH7 2MH1 2MH7 2MH1 2MH7 3MH1 3MH7 5. |
      4. 2MH7 2MH3 MH7 2MH1 2MH7 MH1 4MH7 MH1 2MH7 2MH1 MH7 2MH3 2MH7 4. |
      3. 2MH7 MH4 2MH3 MH7 5MH1 4MH7 5MH1 MH7 2MH3 MH4 2MH7 3. |
      3. MH7 3MH4 MH3 3MH7 MH1 3MH7 3MA7 2MH7 MH1 3MH7 MH3 3MH4 MH7 3. |
      3. MH7 3MH4 2MH3 6MH7 2MA7 6MH7 2MH3 3MH4 MH7 3. |
      2. 2MH7 3MH4 3MH3 6MH7 MA7 5MH7 3MH3 3MH4 2MH7 2. |
      2. MH7 5MH4 3MH3 10MH7 3MH3 5MH4 MH7 2. |
      2. 2MH7 3MH4 6MH3 6MH7 6MH3 3MH4 2MH7 2. |
      3. MH7 3MH4 18MH3 3MH4 MH7 3. |
      3. MH7 3MH4 18MH3 3MH4 MH7 3. |
      3. 2MH7 MH4 20MH3 MH4 2MH7 3. |
      4. 2MH7 20MH3 2MH7 4. |
      5. 2MH7 18MH3 2MH7 5. |
      6. 2MH7 16MH3 2MH7 6. |
      7. MH7 16MH3 MH7 7. |
      7. 3MH7 12MH3 3MH7 7. |
      9. 2MH7 10MH3 2MH7 9. |
      10. 12MH7 10. |
      32. |
      32.
    `, 32, 32, C_MAP)
  },
  {
    id: 'hamster-sunflower',
    title: '仓鼠腮帮塞瓜子',
    category: 'pets',
    tag: '仓鼠日常',
    difficulty: '★★★★☆',
    desc: '32×32标准画幅。鼓鼓囊囊塞满瓜子的胖仓鼠，金黄毛发与怀里的大颗黑白向日葵瓜子。',
    matrix: decodeGrid(`
      32. |
      32. |
      32. |
      32. |
      32. |
      32. |
      4. 5MH7 14. 5MH7 4. |
      3. 2MH7 3MA4 16MH7 3MA4 2MH7 3. |
      3. MH7 2MA4 ME4 2MA4 2MH7 10MA4 2MH7 2MA4 ME4 2MA4 MH7 3. |
      3. MH7 MA4 3ME4 16MA4 3ME4 MA4 MH7 3. |
      3. MH7 2MA4 ME4 18MA4 ME4 2MA4 MH7 3. |
      3. 2MH7 22MA4 2MH7 3. |
      4. 2MH7 20MA4 2MH7 4. |
      4. MH7 22MA4 MH7 4. |
      3. 2MH7 5MA4 2MH7 MA4 6MH1 MA4 2MH7 5MA4 2MH7 3. |
      3. MH7 5MA4 MH7 MH1 2MH7 6MH1 MH7 MH1 2MH7 5MA4 MH7 3. |
      3. MH7 6MA4 2MH7 8MH1 2MH7 6MA4 MH7 3. |
      3. MH7 5MA4 14MH1 5MA4 MH7 3. |
      3. MH7 4MA4 16MH1 4MA4 MH7 3. |
      3. MH7 4MA4 7MH1 2MH7 7MH1 4MA4 MH7 3. |
      3. 2MH7 3MA4 6MH1 2MH7 MH1 MH7 6MH1 3MA4 2MH7 3. |
      4. MH7 3MA4 5MH1 3MH7 MH1 2MH7 5MH1 3MA4 MH7 4. |
      4. 2MH7 2MA4 5MH1 3MH7 MH1 2MH7 5MH1 2MA4 2MH7 4. |
      5. MH7 3MA4 3MH1 4MH7 MH1 3MH7 3MH1 3MA4 MH7 5. |
      5. 2MH7 3MA4 3MH1 3MH7 MH1 2MH7 3MH1 3MA4 2MH7 5. |
      6. 3MH7 2MA4 2MH1 3MH7 MH1 2MH7 2MH1 2MA4 3MH7 6. |
      8. 3MH7 2MA4 MH1 2MH7 MH1 MH7 MH1 2MA4 3MH7 8. |
      10. 12MH7 10. |
      14. 4MH7 14. |
      15. 3MH7 14. |
      32. |
      32.
    `, 32, 32, C_MAP)
  },
  {
    id: 'red-panda-apple',
    title: '小熊猫捧红苹果',
    category: 'pets',
    tag: '野生萌物',
    difficulty: '★★★★☆',
    desc: '32×32标准画幅。火红绒毛、白色眉斑与大耳朵，怀里抱着红彤彤的甜脆苹果。',
    matrix: decodeGrid(`
      32. |
      32. |
      4. 4MH7 16. 4MH7 4. |
      4. MH7 2MF10 3MH7 12. 3MH7 2MF10 MH7 4. |
      4. 2MH7 3MF10 2MH7 10. 2MH7 4MF10 MH7 4. |
      5. MH7 MF10 MH1 2MF10 3MH7 6. 3MH7 2MF10 MH1 MF10 2MH7 4. |
      5. MH7 3MH1 3MF10 2MH7 4. 2MH7 3MF10 3MH1 MH7 5. |
      4. 2MH7 3MH1 4MF10 6MH7 4MF10 3MH1 2MH7 4. |
      4. MH7 5MH1 12MF10 5MH1 MH7 4. |
      4. 3MH7 18MF10 3MH7 4. |
      6. MH7 18MF10 MH7 6. |
      5. 2MH7 2MF10 MH1 12MF10 MH1 2MF10 2MH7 5. |
      5. MH7 2MF10 3MH1 10MF10 3MH1 2MF10 MH7 5. |
      4. 2MH7 MF10 5MH1 8MF10 5MH1 MF10 2MH7 4. |
      4. MH7 3MF10 3MH1 10MF10 3MH1 3MF10 MH7 4. |
      4. MH7 4MF10 MH1 3MH7 6MF10 3MH7 MH1 4MF10 MH7 4. |
      4. MH7 5MF10 3MH7 6MH1 3MH7 5MF10 MH7 4. |
      4. MH7 5MF10 3MH7 6MH1 3MH7 5MF10 MH7 4. |
      4. MH7 5MF10 6MH1 MH7 5MH1 5MF10 MH7 4. |
      4. MH7 5MF10 12MH1 5MF10 MH7 4. |
      4. 2MH7 4MF10 6MH1 MB8 5MH1 4MF10 2MH7 4. |
      5. MH7 5MF10 2MH1 6MF4 2MH1 5MF10 MH7 5. |
      5. 2MH7 5MF10 MH1 6MF4 MH1 5MF10 2MH7 5. |
      6. 2MH7 4MF10 8MF4 4MF10 2MH7 6. |
      7. 2MH7 3MF10 8MF4 3MF10 2MH7 7. |
      8. 3MH7 MF10 8MF4 MF10 3MH7 8. |
      10. 3MH7 6MF4 3MH7 10. |
      12. MH7 6MF4 MH7 12. |
      12. 8MH7 12. |
      32. |
      32. |
      32.
    `, 32, 32, C_MAP)
  },
  {
    id: 'cute-bunny-strawberry',
    title: '垂耳兔抱草莓',
    category: 'pets',
    tag: '少女心萌宠',
    difficulty: '★★★★☆',
    desc: '32×32标准画幅。纯白下垂长兔耳、粉红三瓣嘴，双手拥抱一颗熟透的鲜红大草莓。',
    matrix: decodeGrid(`
      32. |
      32. |
      32. |
      32. |
      32. |
      32. |
      12. 8MH7 12. |
      10. 3MH7 6MH1 3MH7 10. |
      8. 3MH7 10MH1 3MH7 8. |
      7. 2MH7 14MH1 2MH7 7. |
      7. MH7 16MH1 MH7 7. |
      6. 2MH7 16MH1 2MH7 6. |
      5. 2MH7 18MH1 2MH7 5. |
      4. 2MH7 5MH1 3MH7 4MH1 3MH7 5MH1 2MH7 4. |
      4. MH7 ME8 5MH1 3MH7 4MH1 3MH7 5MH1 ME8 MH7 4. |
      4. MH7 ME8 5MH1 3MH7 4MH1 3MH7 5MH1 ME8 MH7 4. |
      4. MH7 ME8 10MH1 ME4 9MH1 ME8 2MH7 3. |
      3. 2MH7 ME8 20MH1 ME8 MH1 MH7 3. |
      3. MH7 MH1 ME8 20MH1 ME8 MH1 MH7 3. |
      3. MH7 MH1 ME8 20MH1 ME8 MH1 MH7 3. |
      2. 2MH7 MH1 ME8 7MH1 6MB5 7MH1 ME8 MH1 2MH7 2. |
      2. MH7 9MH1 8MB5 9MH1 MH7 2. |
      2. MH7 5MH1 3MH7 MH1 MF4 6MB5 MF4 MH1 3MH7 5MH1 MH7 2. |
      2. 5MH7 MH1 MH7 1. 2MH7 8MF4 2MH7 1. MH7 MH1 5MH7 2. |
      6. 3MH7 2. 2MH7 6MF4 2MH7 2. 3MH7 6. |
      12. 2MH7 4MF4 2MH7 12. |
      13. MH7 4MF4 MH7 13. |
      13. 2MH7 2MF4 2MH7 13. |
      14. 2MH7 MF4 MH7 14. |
      15. 3MH7 14. |
      32. |
      32.
    `, 32, 32, C_MAP)
  },
  {
    id: 'pokemon-pikachu',
    title: '宝可梦·皮卡丘',
    category: 'games',
    tag: '任天堂',
    difficulty: '★★★★☆',
    desc: '32×32标准画幅。金黄电气鼠、经典黑尖闪电折耳、鲜红蓄电腮红与闪烁电光大眼。',
    matrix: decodeGrid(`
      32. |
      32. |
      2. 5MH7 18. 5MH7 2. |
      2. 7MH7 14. 7MH7 2. |
      2. 5MH7 MA4 3MH7 10. 3MH7 MA4 5MH7 2. |
      3. 4MH7 3MA4 3MH7 6. 3MH7 3MA4 4MH7 3. |
      3. 2MH7 7MA4 MH7 6. MH7 7MA4 2MH7 3. |
      4. 2MH7 6MA4 MH7 6. 2MH7 6MA4 MH7 4. |
      5. MH7 5MA4 10MH7 5MA4 2MH7 4. |
      5. 2MH7 4MA4 2MH7 6MA4 3MH7 4MA4 MH7 5. |
      6. MH7 18MA4 2MH7 5. |
      6. 2MH7 17MA4 MH7 6. |
      6. 2MH7 16MA4 2MH7 6. |
      5. 2MH7 18MA4 2MH7 5. |
      5. MH7 20MA4 MH7 5. |
      5. MH7 4MA4 4MH7 4MA4 4MH7 4MA4 MH7 5. |
      5. MH7 4MA4 MH7 MH1 2MH7 4MA4 MH7 MH1 2MH7 4MA4 MH7 5. |
      4. 2MH7 4MA4 4MH7 4MA4 4MH7 4MA4 2MH7 4. |
      4. MH7 2MA4 3MF4 6MA4 MH7 5MA4 3MF4 2MA4 MH7 4. |
      4. 2MH7 5MF4 10MA4 5MF4 2MH7 4. |
      5. MH7 5MF4 3MA4 4MH7 3MA4 5MF4 MH7 5. |
      5. MH7 5MF4 10MA4 5MF4 MH7 5. |
      5. MH7 MA4 3MF4 12MA4 3MF4 MA4 MH7 5. |
      5. 2MH7 18MA4 2MH7 5. |
      6. 2MH7 16MA4 2MH7 6. |
      7. 2MH7 14MA4 2MH7 7. |
      8. 2MH7 12MA4 2MH7 8. |
      9. 4MH7 6MA4 4MH7 9. |
      12. 8MH7 12. |
      32. |
      32. |
      32.
    `, 32, 32, C_MAP)
  },
  {
    id: 'pokemon-gengar',
    title: '宝可梦·耿鬼',
    category: 'games',
    tag: '幽灵系',
    difficulty: '★★★★★',
    desc: '32×32标准画幅。深邃魅影暗紫圆球、大裂齿咧嘴坏笑、血红邪魅双眼与幽灵背刺。',
    matrix: decodeGrid(`
      32. |
      32. |
      8. 3MH7 10. 3MH7 8. |
      7. 2MH7 MD7 2MH7 8. 2MH7 MD7 2MH7 7. |
      7. MH7 3MD7 MH7 3. 3MH7 2. MH7 3MD7 MH7 7. |
      6. 2MH7 3MD7 2MH7 1. 2MH7 MD7 4MH7 3MD7 2MH7 6. |
      6. MH7 5MD7 MH7 1. MH7 3MD7 2MH7 5MD7 MH7 6. |
      5. 2MH7 5MD7 3MH7 3MD7 2MH7 5MD7 2MH7 5. |
      5. MH7 20MD7 MH7 5. |
      5. MH7 20MD7 MH7 5. |
      5. 3MH7 16MD7 3MH7 5. |
      5. 2MH7 18MD7 2MH7 5. |
      5. MH7 20MD7 MH7 5. |
      5. MH7 20MD7 MH7 5. |
      4. 2MH7 2MD7 6MF4 4MD7 6MF4 2MD7 2MH7 4. |
      4. MH7 4MD7 2MF4 MH7 2MF4 5MD7 2MF4 MH7 MF4 4MD7 MH7 4. |
      4. MH7 6MD7 2MF4 6MD7 2MF4 6MD7 MH7 4. |
      4. MH7 7MD7 MF4 6MD7 MF4 7MD7 MH7 4. |
      4. MH7 22MD7 MH7 4. |
      4. MH7 7MD7 MH7 3MD7 MH7 2MD7 MH7 7MD7 MH7 4. |
      4. 2MH7 3MD7 3MH1 MH7 3MH1 MH7 2MH1 MH7 3MH1 3MD7 2MH7 4. |
      5. MH7 4MD7 2MH1 MH7 3MH1 MH7 2MH1 MH7 2MH1 4MD7 MH7 5. |
      5. MH7 3MD7 14MH7 3MD7 MH7 5. |
      5. 2MH7 4MD7 MH1 MH7 3MH1 MH7 2MH1 MH7 MH1 4MD7 2MH7 5. |
      6. 2MH7 3MD7 MH1 MH7 3MH1 MH7 2MH1 MH7 MH1 3MD7 2MH7 6. |
      7. 2MH7 14MD7 2MH7 7. |
      8. 3MH7 10MD7 3MH7 8. |
      10. 12MH7 10. |
      32. |
      32. |
      32. |
      32.
    `, 32, 32, C_MAP)
  },
  {
    id: 'pokemon-psyduck',
    title: '宝可梦·可达鸭',
    category: 'games',
    tag: '呆萌神作',
    difficulty: '★★★★☆',
    desc: '32×32标准画幅。双手抱头困惑脸蛋、金黄圆脑瓜、三根呆毛与扁平米黄鸭嘴。',
    matrix: decodeGrid(`
      32. |
      15. 3MH7 14. |
      12. 8MH7 12. |
      12. 8MH7 12. |
      12. 8MH7 12. |
      13. 6MH7 13. |
      14. 4MH7 14. |
      11. 10MH7 11. |
      9. 3MH7 8MA4 3MH7 9. |
      8. 2MH7 12MA4 2MH7 8. |
      7. 2MH7 14MA4 2MH7 7. |
      6. 2MH7 16MA4 2MH7 6. |
      5. 2MH7 4MA4 MH1 8MA4 MH1 4MA4 2MH7 5. |
      4. 2MH7 4MA4 3MH1 6MA4 3MH1 4MA4 2MH7 4. |
      3. 2MH7 4MA4 2MH1 MH7 2MH1 4MA4 2MH1 MH7 2MH1 4MA4 2MH7 3. |
      3. MH7 6MA4 3MH1 6MA4 3MH1 6MA4 MH7 3. |
      2. 2MH7 7MA4 MH1 8MA4 MH1 7MA4 2MH7 2. |
      2. MH7 8MA4 10MA1 8MA4 MH7 2. |
      2. 2MH7 6MA4 12MA1 6MA4 2MH7 2. |
      3. MH7 6MA4 5MA1 MH7 MA1 MH7 4MA1 6MA4 MH7 3. |
      3. 2MH7 5MA4 12MA1 5MA4 2MH7 3. |
      4. 2MH7 4MA4 12MA1 4MA4 2MH7 4. |
      5. 3MH7 3MA4 10MA1 3MA4 3MH7 5. |
      7. 2MH7 14MA4 2MH7 7. |
      8. 2MH7 12MA4 2MH7 8. |
      9. 3MH7 8MA4 3MH7 9. |
      11. 10MH7 11. |
      32. |
      32. |
      32. |
      32. |
      32.
    `, 32, 32, C_MAP)
  },
  {
    id: 'pokemon-eevee',
    title: '宝可梦·伊布',
    category: 'games',
    tag: '治愈宝可梦',
    difficulty: '★★★★☆',
    desc: '32×32标准画幅。暖栗色大耳朵、米白色厚实毛茸茸围脖大领圈与温柔黑褐色大眼睛。',
    matrix: decodeGrid(`
      32. |
      2. 4MH7 20. 4MH7 2. |
      2. MH7 2MG10 3MH7 16. 3MH7 2MG10 MH7 2. |
      2. MH7 4MG10 3MH7 12. 3MH7 4MG10 MH7 2. |
      2. 2MH7 5MG10 3MH7 8. 3MH7 5MG10 2MH7 2. |
      3. MH7 MG10 3MG14 3MG10 3MH7 4. 3MH7 3MG10 3MG14 MG10 MH7 3. |
      3. 2MH7 6MG14 2MG10 MH7 4. MH7 2MG10 6MG14 2MH7 3. |
      4. MH7 MG10 4MG14 2MG10 8MH7 2MG10 4MG14 MG10 MH7 4. |
      4. 2MH7 3MG14 14MG10 3MG14 2MH7 4. |
      5. MH7 MG10 MG14 16MG10 MG14 MG10 MH7 5. |
      5. 2MH7 18MG10 2MH7 5. |
      6. MH7 18MG10 MH7 6. |
      6. 2MH7 16MG10 2MH7 6. |
      6. MH7 4MG10 2MG16 6MG10 2MG16 4MG10 MH7 6. |
      6. MH7 3MG10 MG16 MH1 2MG16 4MG10 MG16 MH1 2MG16 3MG10 MH7 6. |
      6. MH7 3MG10 4MG16 4MG10 4MG16 3MG10 MH7 6. |
      6. MH7 3MG10 4MG16 4MG10 4MG16 3MG10 MH7 6. |
      6. MH7 4MG10 2MG16 6MG10 2MG16 4MG10 MH7 6. |
      6. 2MH7 16MG10 2MH7 6. |
      7. MH7 3MG10 10MA1 3MG10 MH7 7. |
      6. 2MH7 16MA1 2MH7 6. |
      5. 2MH7 18MA1 2MH7 5. |
      4. 2MH7 20MA1 2MH7 4. |
      4. MH7 22MA1 MH7 4. |
      4. MH7 22MA1 MH7 4. |
      4. MH7 22MA1 MH7 4. |
      4. 2MH7 20MA1 2MH7 4. |
      5. 2MH7 18MA1 2MH7 5. |
      6. 2MH7 16MA1 2MH7 6. |
      7. 4MH7 10MA1 4MH7 7. |
      10. 12MH7 10. |
      32.
    `, 32, 32, C_MAP)
  },
  {
    id: 'pokemon-snorlax',
    title: '宝可梦·卡比兽',
    category: 'games',
    tag: '经典宝可梦',
    difficulty: '★★★★☆',
    desc: '32×32标准画幅。深青蓝沉睡巨无霸，圆脸尖耳、米黄肚皮与安详微笑眯眯眼。',
    matrix: decodeGrid(`
      32. |
      32. |
      32. |
      6. 3MH7 14. 3MH7 6. |
      5. 2MH7 MC8 2MH7 12. 2MH7 MC8 2MH7 5. |
      5. MH7 3MC8 MH7 12. MH7 3MC8 MH7 5. |
      4. 2MH7 3MC8 14MH7 3MC8 2MH7 4. |
      4. MH7 5MC8 2MH7 8MC8 2MH7 5MC8 MH7 4. |
      3. 2MH7 22MC8 2MH7 3. |
      3. MH7 24MC8 MH7 3. |
      3. MH7 24MC8 MH7 3. |
      3. 3MH7 6MC8 8MA1 6MC8 3MH7 3. |
      4. MH7 5MC8 12MA1 5MC8 MH7 4. |
      4. MH7 4MC8 14MA1 4MC8 MH7 4. |
      3. 2MH7 3MC8 16MA1 3MC8 2MH7 3. |
      3. MH7 4MC8 16MA1 4MC8 MH7 3. |
      3. MH7 4MC8 16MA1 4MC8 MH7 3. |
      3. MH7 4MC8 2MA1 4MH7 4MA1 4MH7 2MA1 4MC8 MH7 3. |
      3. MH7 4MC8 16MA1 4MC8 MH7 3. |
      3. MH7 4MC8 3MA1 MH1 8MA1 MH1 3MA1 4MC8 MH7 3. |
      3. 2MH7 3MC8 3MA1 10MH7 3MA1 3MC8 2MH7 3. |
      4. MH7 3MC8 16MA1 3MC8 MH7 4. |
      4. MH7 4MC8 14MA1 4MC8 MH7 4. |
      4. 2MH7 4MC8 12MA1 4MC8 2MH7 4. |
      5. 2MH7 2MC8 14MA1 2MC8 2MH7 5. |
      5. 2MH7 18MA1 2MH7 5. |
      5. MH7 20MA1 MH7 5. |
      5. MH7 20MA1 MH7 5. |
      5. MH7 20MA1 MH7 5. |
      5. 2MH7 18MA1 2MH7 5. |
      6. 3MH7 14MA1 3MH7 6. |
      8. 16MH7 8.
    `, 32, 32, C_MAP)
  },
  {
    id: 'pokemon-pokeball',
    title: '经典大师精灵球',
    category: 'games',
    tag: '经典道具',
    difficulty: '★★★☆☆',
    desc: '32×32标准画幅。上半正红、下半纯白，立体高光镜面与居中金属锁扣开关。',
    matrix: decodeGrid(`
      32. |
      32. |
      32. |
      10. 12MH7 10. |
      8. 3MH7 10MF4 3MH7 8. |
      7. 2MH7 14MF4 2MH7 7. |
      6. 2MH7 2MF4 MF14 13MF4 2MH7 6. |
      5. 2MH7 MF4 5MF14 12MF4 2MH7 5. |
      4. 2MH7 MF4 7MF14 12MF4 2MH7 4. |
      4. MH7 3MF4 5MF14 14MF4 MH7 4. |
      3. 2MH7 5MF4 MF14 16MF4 2MH7 3. |
      3. MH7 24MF4 MH7 3. |
      3. MH7 9MF4 6MH7 9MF4 MH7 3. |
      3. MH7 8MF4 2MH7 4MH1 2MH7 8MF4 MH7 3. |
      2. 2MH7 8MF4 MH7 6MH1 MH7 8MF4 2MH7 2. |
      2. 11MH7 2MH1 2MH2 2MH1 11MH7 2. |
      2. 11MH7 2MH1 2MH2 2MH1 11MH7 2. |
      2. 11MH7 6MH1 11MH7 2. |
      2. 2MH7 8MH1 2MH7 4MH1 2MH7 8MH1 2MH7 2. |
      3. MH7 9MH1 6MH7 9MH1 MH7 3. |
      3. MH7 24MH1 MH7 3. |
      3. 2MH7 22MH1 2MH7 3. |
      4. MH7 22MH1 MH7 4. |
      4. 2MH7 20MH1 2MH7 4. |
      5. 2MH7 18MH1 2MH7 5. |
      6. 2MH7 16MH1 2MH7 6. |
      7. 2MH7 14MH1 2MH7 7. |
      8. 3MH7 10MH1 3MH7 8. |
      10. 12MH7 10. |
      32. |
      32. |
      32.
    `, 32, 32, C_MAP)
  },
  {
    id: 'kirby-floating',
    title: '星之卡比·飘浮态',
    category: 'games',
    tag: '任天堂',
    difficulty: '★★★☆☆',
    desc: '32×32标准画幅。粉红软萌弹力球、标志性椭圆蓝眼睛、大红鞋与开心挥舞的小圆手。',
    matrix: decodeGrid(`
      32. |
      32. |
      32. |
      32. |
      32. |
      11. 10MH7 11. |
      9. 3MH7 8ME4 3MH7 9. |
      8. 2MH7 12ME4 2MH7 8. |
      7. 2MH7 14ME4 2MH7 7. |
      6. 2MH7 16ME4 2MH7 6. |
      4. 3MH7 18ME4 3MH7 4. |
      2. 3MH7 ME4 MH7 5ME4 MH7 6ME4 MH7 5ME4 MH7 ME4 3MH7 2. |
      2. MH7 8ME4 MH7 MH1 MH7 4ME4 MH7 MH1 MH7 8ME4 MH7 2. |
      1. 2MH7 8ME4 3MH7 4ME4 3MH7 8ME4 2MH7 1. |
      1. MH7 9ME4 3MH7 4ME4 3MH7 9ME4 MH7 1. |
      1. 2MH7 8ME4 MH7 MC7 MH7 4ME4 MH7 MC7 MH7 8ME4 2MH7 1. |
      2. MH7 4ME4 3MF12 2ME4 MH7 ME4 4MF8 ME4 MH7 2ME4 3MF12 4ME4 MH7 2. |
      2. 3MH7 2ME4 3MF12 4ME4 4MF8 4ME4 3MF12 2ME4 3MH7 2. |
      4. 2MH7 8ME4 2MF8 MF14 MF8 8ME4 2MH7 4. |
      5. MH7 20ME4 MH7 5. |
      5. 2MH7 18ME4 2MH7 5. |
      6. MH7 18ME4 MH7 6. |
      6. 2MH7 16ME4 2MH7 6. |
      5. 2MH7 5MF4 8ME4 5MF4 2MH7 5. |
      4. 2MH7 7MF4 6ME4 7MF4 2MH7 4. |
      4. MH7 9MF4 4ME4 9MF4 MH7 4. |
      4. MH7 9MF4 4MH7 9MF4 MH7 4. |
      4. 2MH7 7MF4 2MH7 2. 2MH7 7MF4 2MH7 4. |
      5. 2MH7 5MF4 2MH7 4. 2MH7 5MF4 2MH7 5. |
      6. 7MH7 6. 7MH7 6. |
      32. |
      32.
    `, 32, 32, C_MAP)
  },
  {
    id: 'mario-super-mushroom',
    title: '超级马力欧·神奇红蘑菇',
    category: 'games',
    tag: '像素经典',
    difficulty: '★★★☆☆',
    desc: '32×32标准画幅。超级马力欧标志性红蘑菇，大红伞盖、雪白圆斑点与米白茎秆黑瞳。',
    matrix: decodeGrid(`
      32. |
      32. |
      32. |
      11. 10MH7 11. |
      9. 3MH7 8MF4 3MH7 9. |
      7. 3MH7 12MF4 3MH7 7. |
      6. 2MH7 6MF4 4MH1 6MF4 2MH7 6. |
      5. 2MH7 6MF4 6MH1 6MF4 2MH7 5. |
      4. 2MH7 6MF4 8MH1 6MF4 2MH7 4. |
      3. 2MH7 MF4 MH1 5MF4 8MH1 5MF4 MH1 MF4 2MH7 3. |
      3. MH7 MF4 3MH1 3MF4 10MH1 3MF4 3MH1 MF4 MH7 3. |
      3. MH7 5MH1 3MF4 8MH1 3MF4 5MH1 MH7 3. |
      3. MH7 5MH1 3MF4 8MH1 3MF4 5MH1 MH7 3. |
      2. 2MH7 5MH1 4MF4 6MH1 4MF4 5MH1 2MH7 2. |
      2. MH7 7MH1 4MF4 4MH1 4MF4 7MH1 MH7 2. |
      2. 2MH7 5MH1 14MF4 5MH1 2MH7 2. |
      3. MH7 5MH1 14MF4 5MH1 MH7 3. |
      3. MH7 5MH1 14MF4 5MH1 MH7 3. |
      3. MH7 MF4 3MH1 3MF4 10MA1 3MF4 3MH1 MF4 MH7 3. |
      3. 2MH7 MF4 MH1 2MF4 3MA1 2MH7 4MA1 2MH7 3MA1 2MF4 MH1 MF4 2MH7 3. |
      4. 2MH7 2MF4 4MA1 2MH7 4MA1 2MH7 4MA1 2MF4 2MH7 4. |
      5. 2MH7 MF4 4MA1 2MH7 4MA1 2MH7 4MA1 MF4 2MH7 5. |
      6. 2MH7 4MA1 2MH7 4MA1 2MH7 4MA1 2MH7 6. |
      7. MH7 16MA1 MH7 7. |
      7. MH7 16MA1 MH7 7. |
      7. MH7 16MA1 MH7 7. |
      7. 2MH7 14MA1 2MH7 7. |
      8. 3MH7 10MA1 3MH7 8. |
      10. 12MH7 10. |
      32. |
      32. |
      32.
    `, 32, 32, C_MAP)
  },
  {
    id: 'mario-1up-mushroom',
    title: '超级马力欧·1UP绿蘑菇',
    category: 'games',
    tag: '像素经典',
    difficulty: '★★★☆☆',
    desc: '32×32标准画幅。生命+1！经典翠绿伞盖、鲜明雪白圆斑与饱满复古像素风。',
    matrix: decodeGrid(`
      32. |
      32. |
      32. |
      11. 10MH7 11. |
      9. 3MH7 8MB5 3MH7 9. |
      7. 3MH7 12MB5 3MH7 7. |
      6. 2MH7 6MB5 4MH1 6MB5 2MH7 6. |
      5. 2MH7 6MB5 6MH1 6MB5 2MH7 5. |
      4. 2MH7 6MB5 8MH1 6MB5 2MH7 4. |
      3. 2MH7 MB5 MH1 5MB5 8MH1 5MB5 MH1 MB5 2MH7 3. |
      3. MH7 MB5 3MH1 3MB5 10MH1 3MB5 3MH1 MB5 MH7 3. |
      3. MH7 5MH1 3MB5 8MH1 3MB5 5MH1 MH7 3. |
      3. MH7 5MH1 3MB5 8MH1 3MB5 5MH1 MH7 3. |
      2. 2MH7 5MH1 4MB5 6MH1 4MB5 5MH1 2MH7 2. |
      2. MH7 7MH1 4MB5 4MH1 4MB5 7MH1 MH7 2. |
      2. 2MH7 5MH1 14MB5 5MH1 2MH7 2. |
      3. MH7 5MH1 14MB5 5MH1 MH7 3. |
      3. MH7 5MH1 14MB5 5MH1 MH7 3. |
      3. MH7 MB5 3MH1 3MB5 10MA1 3MB5 3MH1 MB5 MH7 3. |
      3. 2MH7 MB5 MH1 2MB5 3MA1 2MH7 4MA1 2MH7 3MA1 2MB5 MH1 MB5 2MH7 3. |
      4. 2MH7 2MB5 4MA1 2MH7 4MA1 2MH7 4MA1 2MB5 2MH7 4. |
      5. 2MH7 MB5 4MA1 2MH7 4MA1 2MH7 4MA1 MB5 2MH7 5. |
      6. 2MH7 4MA1 2MH7 4MA1 2MH7 4MA1 2MH7 6. |
      7. MH7 16MA1 MH7 7. |
      7. MH7 16MA1 MH7 7. |
      7. MH7 16MA1 MH7 7. |
      7. 2MH7 14MA1 2MH7 7. |
      8. 3MH7 10MA1 3MH7 8. |
      10. 12MH7 10. |
      32. |
      32. |
      32.
    `, 32, 32, C_MAP)
  },
  {
    id: 'mario-question-block',
    title: '超级马力欧·问号金币箱',
    category: 'games',
    tag: '像素经典',
    difficulty: '★★★☆☆',
    desc: '32×32标准画幅。金黄像素铆钉方块、立体高光阴影与居中粗体白色问号。',
    matrix: decodeGrid(`
      32. |
      32. |
      32. |
      32. |
      4. 24MH7 4. |
      4. MH7 22MA7 MH7 4. |
      4. MH7 MA7 2MH7 16MA7 2MH7 MA7 MH7 4. |
      4. MH7 MA7 2MH7 16MA4 2MH7 MA7 MH7 4. |
      4. MH7 2MA7 18MA4 2MA7 MH7 4. |
      4. MH7 2MA7 6MA4 6MH1 6MA4 2MA7 MH7 4. |
      4. MH7 2MA7 6MA4 6MH1 6MA4 2MA7 MH7 4. |
      4. MH7 2MA7 10MA4 2MH1 6MA4 2MA7 MH7 4. |
      4. MH7 2MA7 10MA4 2MH1 6MA4 2MA7 MH7 4. |
      4. MH7 2MA7 10MA4 2MH1 6MA4 2MA7 MH7 4. |
      4. MH7 2MA7 10MA4 2MH1 6MA4 2MA7 MH7 4. |
      4. MH7 2MA7 8MA4 3MH1 7MA4 2MA7 MH7 4. |
      4. MH7 2MA7 8MA4 3MH1 7MA4 2MA7 MH7 4. |
      4. MH7 2MA7 8MA4 3MH1 7MA4 2MA7 MH7 4. |
      4. MH7 2MA7 18MA4 2MA7 MH7 4. |
      4. MH7 2MA7 18MA4 2MA7 MH7 4. |
      4. MH7 2MA7 8MA4 3MH1 7MA4 2MA7 MH7 4. |
      4. MH7 2MA7 8MA4 3MH1 7MA4 2MA7 MH7 4. |
      4. MH7 2MA7 8MA4 3MH1 7MA4 2MA7 MH7 4. |
      4. MH7 2MA7 18MA4 2MA7 MH7 4. |
      4. MH7 MA7 2MH7 16MA4 2MH7 MA7 MH7 4. |
      4. MH7 MA7 2MH7 16MA7 2MH7 MA7 MH7 4. |
      4. MH7 22MA7 MH7 4. |
      4. 24MH7 4. |
      32. |
      32. |
      32. |
      32.
    `, 32, 32, C_MAP)
  },
  {
    id: 'minecraft-creeper',
    title: '我的世界·苦力怕头像',
    category: 'games',
    tag: '沙盒像素',
    difficulty: '★★★★☆',
    desc: '32×32标准画幅。Minecraft标志性绿格阵列与充满压迫感又令人忍俊不禁的苦力怕面容。',
    matrix: decodeGrid(`
      32. |
      32. |
      32. |
      3. 26MH7 3. |
      3. MH7 MB5 MB2 2MB5 MB2 2MB5 MB2 2MB5 MB2 2MB5 MB2 2MB5 MB2 2MB5 MB2 2MB5 MB2 MB5 MH7 3. |
      3. MH7 MB2 MB8 MB5 MB2 MB5 MB8 MB2 MB8 MB5 MB2 MB5 MB8 MB2 MB8 MB5 MB2 MB5 MB8 MB2 MB8 MB5 MB2 MB5 MB8 MH7 3. |
      3. MH7 2MB5 MB2 2MB5 MB2 2MB5 MB2 2MB5 MB2 2MB5 MB2 2MB5 MB2 2MB5 MB2 2MB5 MB2 MH7 3. |
      3. MH7 MB5 MB2 MB5 MB8 MB2 MB8 MB5 MB2 MB5 MB8 MB2 MB8 MB5 MB2 MB5 MB8 MB2 MB8 MB5 MB2 MB5 MB8 MB2 MB8 MH7 3. |
      3. MH7 MB2 2MB5 MB2 2MB5 MB2 2MB5 MB2 2MB5 MB2 2MB5 MB2 2MB5 MB2 2MB5 MB2 2MB5 MH7 3. |
      3. MH7 MB5 MB8 MB2 MB8 4MH7 MB2 MB8 MB5 MB2 MB5 MB8 MB2 MB8 4MH7 MB2 MB8 MB5 MB2 MH7 3. |
      3. MH7 MB5 MB2 2MB5 4MH7 2MB5 MB2 2MB5 MB2 2MB5 4MH7 2MB5 MB2 MB5 MH7 3. |
      3. MH7 MB2 MB8 MB5 MB2 4MH7 MB5 MB2 MB5 MB8 MB2 MB8 MB5 MB2 4MH7 MB5 MB2 MB5 MB8 MH7 3. |
      3. MH7 2MB5 MB2 MB5 4MH7 MB2 2MB5 MB2 2MB5 MB2 MB5 4MH7 MB2 2MB5 MB2 MH7 3. |
      3. MH7 MB5 MB2 MB5 MB8 MB2 MB8 MB5 MB2 MB5 MB8 4MH7 MB5 MB8 MB2 MB8 MB5 MB2 MB5 MB8 MB2 MB8 MH7 3. |
      3. MH7 MB2 2MB5 MB2 2MB5 MB2 2MB5 MB2 4MH7 MB5 MB2 2MB5 MB2 2MB5 MB2 2MB5 MH7 3. |
      3. MH7 MB5 MB8 MB2 MB8 MB5 MB2 MB5 MB8 MB2 MB8 4MH7 MB2 MB8 MB5 MB2 MB5 MB8 MB2 MB8 MB5 MB2 MH7 3. |
      3. MH7 MB5 MB2 2MB5 MB2 2MB5 MB2 2MB5 4MH7 2MB5 MB2 2MB5 MB2 2MB5 MB2 MB5 MH7 3. |
      3. MH7 MB2 MB8 MB5 MB2 MB5 MB8 MB2 MB8 8MH7 MB5 MB8 MB2 MB8 MB5 MB2 MB5 MB8 MH7 3. |
      3. MH7 2MB5 MB2 2MB5 MB2 2MB5 8MH7 MB5 MB2 2MB5 MB2 2MB5 MB2 MH7 3. |
      3. MH7 MB5 MB2 MB5 MB8 MB2 MB8 MB5 MB2 8MH7 MB2 MB8 MB5 MB2 MB5 MB8 MB2 MB8 MH7 3. |
      3. MH7 MB2 2MB5 MB2 2MB5 MB2 MB5 2MH7 2MB5 MB2 MB5 2MH7 2MB5 MB2 2MB5 MB2 2MB5 MH7 3. |
      3. MH7 MB5 MB8 MB2 MB8 MB5 MB2 MB5 MB8 2MH7 MB5 MB2 MB5 MB8 2MH7 MB5 MB2 MB5 MB8 MB2 MB8 MB5 MB2 MH7 3. |
      3. MH7 MB5 MB2 2MB5 MB2 2MB5 MB2 2MH7 MB2 2MB5 MB2 2MH7 MB2 2MB5 MB2 2MB5 MB2 MB5 MH7 3. |
      3. MH7 MB2 MB8 MB5 MB2 MB5 MB8 MB2 MB8 2MH7 MB5 MB8 MB2 MB8 2MH7 MB5 MB8 MB2 MB8 MB5 MB2 MB5 MB8 MH7 3. |
      3. MH7 2MB5 MB2 2MB5 MB2 2MB5 MB2 2MB5 MB2 2MB5 MB2 2MB5 MB2 2MB5 MB2 2MB5 MB2 MH7 3. |
      3. MH7 MB5 MB2 MB5 MB8 MB2 MB8 MB5 MB2 MB5 MB8 MB2 MB8 MB5 MB2 MB5 MB8 MB2 MB8 MB5 MB2 MB5 MB8 MB2 MB8 MH7 3. |
      3. MH7 MB2 2MB5 MB2 2MB5 MB2 2MB5 MB2 2MB5 MB2 2MB5 MB2 2MB5 MB2 2MB5 MB2 2MB5 MH7 3. |
      3. MH7 MB5 MB8 MB2 MB8 MB5 MB2 MB5 MB8 MB2 MB8 MB5 MB2 MB5 MB8 MB2 MB8 MB5 MB2 MB5 MB8 MB2 MB8 MB5 MB2 MH7 3. |
      3. 26MH7 3. |
      32. |
      32. |
      32.
    `, 32, 32, C_MAP)
  },
  {
    id: 'zelda-heart-container',
    title: '塞尔达传说·心之容器',
    category: 'games',
    tag: '经典传奇',
    difficulty: '★★★★☆',
    desc: '32×32标准画幅。双层红宝石像素爱心、高光切面与神圣金边镶嵌。',
    matrix: decodeGrid(`
      32. |
      32. |
      32. |
      8. 7MH7 2. 7MH7 8. |
      6. 3MH7 5MA4 4MH7 5MA4 3MH7 6. |
      5. 2MH7 18MA4 2MH7 5. |
      5. MH7 3MA4 MF14 4MF4 4MA4 5MF4 3MA4 MH7 5. |
      4. 2MH7 2MA4 3MF14 4MF4 2MA4 7MF4 2MA4 2MH7 4. |
      4. MH7 2MA4 5MF14 13MF4 2MA4 MH7 4. |
      4. MH7 2MA4 MF4 3MF14 14MF4 2MA4 MH7 4. |
      4. MH7 2MA4 2MF4 MF14 15MF4 2MA4 MH7 4. |
      4. MH7 2MA4 18MF4 2MA4 MH7 4. |
      4. MH7 2MA4 18MF4 2MA4 MH7 4. |
      4. MH7 2MA4 18MF4 2MA4 MH7 4. |
      4. 2MH7 2MA4 16MF4 2MA4 2MH7 4. |
      5. 2MH7 2MA4 14MF4 2MA4 2MH7 5. |
      6. 2MH7 2MA4 12MF4 2MA4 2MH7 6. |
      7. MH7 2MA4 12MF4 2MA4 MH7 7. |
      7. 2MH7 2MA4 10MF4 2MA4 2MH7 7. |
      8. 2MH7 2MA4 8MF4 2MA4 2MH7 8. |
      9. MH7 3MA4 6MF4 3MA4 MH7 9. |
      9. 2MH7 2MA4 6MF4 2MA4 2MH7 9. |
      10. 2MH7 2MA4 4MF4 2MA4 2MH7 10. |
      11. 2MH7 2MA4 2MF4 2MA4 2MH7 11. |
      12. MH7 3MA4 MF4 2MA4 MH7 12. |
      12. 2MH7 4MA4 2MH7 12. |
      13. 2MH7 2MA4 2MH7 13. |
      14. 2MH7 MA4 MH7 14. |
      15. 3MH7 14. |
      32. |
      32. |
      32.
    `, 32, 32, C_MAP)
  },
  {
    id: 'strawberry-shortcake',
    title: '草莓鲜奶切块蛋糕',
    category: 'food',
    tag: '下午茶',
    difficulty: '★★★★☆',
    desc: '32×32标准画幅。双层金黄松软海绵蛋糕、纯白轻盈奶油夹心与顶部鲜红大草莓。',
    matrix: decodeGrid(`
      32. |
      15. 3MH7 14. |
      15. MH7 MB5 2MH7 13. |
      14. 2MH7 2MF4 MH7 13. |
      14. MH7 3MF4 2MH7 12. |
      13. 2MH7 4MF4 MH7 12. |
      13. MH7 MF4 MA4 MF4 MA4 MF4 2MH7 11. |
      9. 5MH7 6MF4 4MH7 8. |
      8. 2MH7 3MH1 7MF4 3MH1 2MH7 7. |
      7. 2MH7 15MH1 2MH7 6. |
      7. MH7 17MH1 MH7 6. |
      7. MH7 17MH1 MH7 6. |
      7. MH7 17MH1 MH7 6. |
      7. MH7 MA1 5MH1 MA1 3MH1 MA1 5MH1 MA1 MH7 6. |
      7. MH7 2MA1 3MH1 7MA1 3MH1 2MA1 MH7 6. |
      6. 3MH7 15MA1 2MH7 6. |
      6. MH7 18MF4 MH7 6. |
      6. MH7 18MF4 MH7 6. |
      6. 5MH7 11MA1 4MH7 6. |
      10. MH7 11MA1 MH7 9. |
      8. 4MH7 9MA1 3MH7 8. |
      8. MH7 14MH1 MH7 8. |
      8. MH7 14MH1 MH7 8. |
      8. 6MH7 5MA1 5MH7 8. |
      13. MH7 5MA1 MH7 12. |
      13. 2MH7 3MA1 2MH7 12. |
      14. MH7 3MA1 MH7 13. |
      14. 2MH7 MA1 2MH7 13. |
      15. 3MH7 14. |
      32. |
      32. |
      32.
    `, 32, 32, C_MAP)
  },
  {
    id: 'boba-milk-tea',
    title: '黑糖波霸珍珠奶茶',
    category: 'food',
    tag: '快乐水',
    difficulty: '★★★★☆',
    desc: '32×32标准画幅。透明高透杯身、香浓醇厚奶茶、底部颗颗分明的黑糖珍珠与粗吸管。',
    matrix: decodeGrid(`
      32. |
      18. 4MH7 10. |
      18. MH7 2MD14 MH7 10. |
      18. MH7 2MD14 MH7 10. |
      17. 2MH7 2MD14 MH7 10. |
      17. MH7 3MD14 MH7 10. |
      17. MH7 3MD14 MH7 10. |
      9. 9MH7 2MD14 3MH7 9. |
      7. 3MH7 12MH1 3MH7 7. |
      7. MH7 16MH1 MH7 7. |
      7. MH7 16MH1 MH7 7. |
      7. MH7 16MH1 MH7 7. |
      7. MH7 2MA18 12MH1 2MA18 MH7 7. |
      7. MH7 16MA18 MH7 7. |
      7. MH7 16MA18 MH7 7. |
      7. 2MH7 14MA18 2MH7 7. |
      8. MH7 14MA18 MH7 8. |
      8. MH7 14MA18 MH7 8. |
      8. MH7 14MA18 MH7 8. |
      8. MH7 14MA18 MH7 8. |
      8. MH7 14MA18 MH7 8. |
      8. MH7 14MA18 MH7 8. |
      8. MH7 2MA18 3MH7 MA18 6MH7 2MA18 MH7 8. |
      8. MH7 2MA18 3MH7 MA18 6MH7 2MA18 MH7 8. |
      8. 2MH7 MA18 3MH7 MA18 6MH7 MA18 2MH7 8. |
      9. 14MH7 9. |
      9. 14MH7 9. |
      9. 14MH7 9. |
      9. MH7 12MA18 MH7 9. |
      9. 5MH7 2MD14 7MH7 9. |
      13. 4MH7 15. |
      32.
    `, 32, 32, C_MAP)
  },
  {
    id: 'matcha-parfait',
    title: '宇治抹茶芭菲甜筒',
    category: 'food',
    tag: '甜品烘焙',
    difficulty: '★★★★☆',
    desc: '32×32标准画幅。深浅抹茶冰淇淋旋涡螺旋、脆皮金黄华夫蛋筒与红豆点缀。',
    matrix: decodeGrid(`
      32. |
      32. |
      32. |
      13. 6MH7 13. |
      12. 2MH7 4MB2 2MH7 12. |
      12. MH7 6MB2 MH7 12. |
      11. 2MH7 6MB2 2MH7 11. |
      11. MH7 8MB2 MH7 11. |
      10. 2MH7 MB5 6MB2 MB5 2MH7 10. |
      10. MH7 2MB5 6MB2 2MB5 MH7 10. |
      10. MH7 3MB5 4MB2 3MB5 MH7 10. |
      9. 2MH7 10MB5 2MH7 9. |
      9. MH7 MB8 7MB5 3MF11 MB8 MH7 9. |
      9. MH7 MB8 3MF11 4MB5 3MF11 MB8 MH7 9. |
      8. 2MH7 MB8 3MF11 4MB5 3MF11 MB8 2MH7 8. |
      8. MH7 2MB8 3MF11 5MB5 4MB8 MH7 8. |
      8. 2MH7 12MB8 2MH7 8. |
      9. MH7 12MB8 2MH7 8. |
      9. MH7 12MB8 MG9 MH7 8. |
      9. MH7 MG9 10MB8 MG9 2MH7 8. |
      9. 2MH7 MG9 8MB8 2MG9 MH7 9. |
      10. MH7 3MG9 4MB8 MG12 2MG9 2MH7 9. |
      10. 2MH7 2MG9 MG12 2MG9 MG12 3MG9 MH7 10. |
      11. MH7 3MG9 2MG12 3MG9 2MH7 10. |
      11. 2MH7 2MG9 2MG12 3MG9 MH7 11. |
      12. MH7 2MG9 2MG12 2MG9 2MH7 11. |
      12. 2MH7 2MG12 MG9 MG12 MG9 MH7 12. |
      12. 2MH7 MG12 2MG9 MG12 2MH7 12. |
      12. MH7 MG12 MH7 3MG9 MG12 MH7 12. |
      12. 3MH7 2MG9 3MH7 12. |
      14. 2MH7 MG9 MH7 14. |
      15. 3MH7 14.
    `, 32, 32, C_MAP)
  },
  {
    id: 'japanese-taiyaki',
    title: '日式红豆鲷鱼烧',
    category: 'food',
    tag: '街头小吃',
    difficulty: '★★★★☆',
    desc: '32×32标准画幅。金黄烤色鱼形烧、精致鱼鳞纹理、灵动小圆眼与尾鳍。',
    matrix: decodeGrid(`
      32. |
      32. |
      32. |
      32. |
      32. |
      32. |
      32. |
      32. |
      10. 9MH7 13. |
      7. 4MH7 7MA6 4MH7 4. 4MH7 2. |
      6. 2MH7 13MA6 2MH7 2. 2MH7 2MA6 MH7 2. |
      5. 2MH7 15MA6 4MH7 2MA6 2MH7 2. |
      4. 2MH7 7MA6 MA10 9MA6 2MH7 3MA6 MH7 3. |
      4. MH7 2MA6 3MH1 3MA6 MA10 10MA6 MH7 3MA6 MH7 3. |
      4. MH7 2MA6 MH1 MH7 MH1 3MA6 MA10 2MA6 MA10 11MA6 MH7 3. |
      3. 2MH7 2MA6 3MH1 3MA6 MA10 2MA6 MA10 10MA6 2MH7 3. |
      3. MH7 12MA6 MA10 10MA6 MH7 4. |
      3. 2MH7 8MA6 MA10 2MA6 MA10 10MA6 2MH7 3. |
      4. MH7 8MA6 MA10 14MA6 MH7 3. |
      4. MH7 8MA6 MA10 10MA6 MH7 3MA6 MH7 3. |
      4. 2MH7 7MA6 MA10 9MA6 2MH7 3MA6 MH7 3. |
      5. 2MH7 15MA6 4MH7 2MA6 2MH7 2. |
      6. 2MH7 13MA6 2MH7 2. 2MH7 2MA6 MH7 2. |
      7. 4MH7 7MA6 4MH7 4. 2MH7 MA6 MH7 2. |
      10. 9MH7 8. 3MH7 2. |
      32. |
      32. |
      32. |
      32. |
      32. |
      32. |
      32.
    `, 32, 32, C_MAP)
  },
  {
    id: 'ramen-noodle-bowl',
    title: '豚骨拉面流心蛋碗',
    category: 'food',
    tag: '深夜食堂',
    difficulty: '★★★★☆',
    desc: '32×32标准画幅。经典青花纹拉面深瓷碗、浓郁豚骨汤底、金黄溏心蛋与鸣门卷。',
    matrix: decodeGrid(`
      32. |
      32. |
      32. |
      32. |
      32. |
      32. |
      32. |
      32. |
      32. |
      6. 6MH7 20. |
      6. MH7 4MB9 MH7 20. |
      6. MH7 4MB9 13MH7 8. |
      6. MH7 4MB9 7MA1 3MH1 2MA1 3MH7 6. |
      5. 2MH7 4MB9 4MH1 2MA1 2MH1 ME4 2MH1 3MA1 2MH7 5. |
      4. 2MH7 MA1 4MB9 3MA7 2MH1 MA1 MH1 3ME4 MH1 4MA1 2MH7 4. |
      4. MH7 2MA1 4MB9 3MA7 2MH1 MA1 2MH1 ME4 2MH1 5MA1 MH7 4. |
      4. MH7 MC7 MA1 4MB9 3MA7 2MH1 2MA1 3MH1 5MA1 MC7 MH7 4. |
      4. 2MH7 MC7 3MA1 5MH1 10MA1 MC7 2MH7 4. |
      5. MH7 3MC7 14MA1 3MC7 MH7 5. |
      5. 2MH7 18MC7 2MH7 5. |
      6. MH7 18MC7 MH7 6. |
      6. MH7 18MC7 MH7 6. |
      6. 2MH7 16MC7 2MH7 6. |
      7. MH7 16MC7 MH7 7. |
      7. MH7 16MC7 MH7 7. |
      7. 2MH7 14MC7 2MH7 7. |
      8. MH7 14MC7 MH7 8. |
      8. 2MH7 12MC7 2MH7 8. |
      8. MH7 13MH1 MH7 9. |
      8. MH7 13MH1 MH7 9. |
      8. 15MH7 9. |
      32.
    `, 32, 32, C_MAP)
  },
  {
    id: 'crispy-croissant',
    title: '法式黄油牛角可颂',
    category: 'food',
    tag: '法式早餐',
    difficulty: '★★★★☆',
    desc: '32×32标准画幅。层层起酥金黄弯月可颂，浓浓黄油烤色与饱满松脆层次。',
    matrix: decodeGrid(`
      32. |
      32. |
      32. |
      32. |
      32. |
      32. |
      32. |
      32. |
      15. 3MH7 14. |
      9. 7MH7 MG10 6MH7 9. |
      7. 3MH7 MA6 MG10 4MA6 MG10 3MA6 MG10 MA6 3MH7 7. |
      5. 3MH7 3MA6 MG10 4MA6 MG10 3MA6 MG10 3MA6 3MH7 5. |
      4. 2MH7 5MA6 MG10 4MA6 MG10 3MA6 MG10 5MA6 2MH7 4. |
      4. MH7 6MA6 MG10 4MA6 MG10 3MA6 MG10 6MA6 MH7 4. |
      3. 2MH7 6MA6 MG10 4MA6 MG10 3MA6 MG10 6MA6 2MH7 3. |
      3. MH7 7MA6 MG10 4MA6 MG10 3MA6 MG10 7MA6 MH7 3. |
      3. MH7 7MA6 MG10 4MA6 MG10 3MA6 MG10 7MA6 MH7 3. |
      2. 2MH7 3MA7 4MA6 MG10 4MA6 MG10 3MA6 MG10 4MA6 3MA7 2MH7 2. |
      2. MH7 5MA7 3MA6 MG10 4MA6 MG10 3MA6 MG10 3MA6 5MA7 MH7 2. |
      2. MH7 5MA7 3MA6 MG10 4MA6 MG10 3MA6 MG10 3MA6 5MA7 MH7 2. |
      2. MH7 5MA7 3MA6 MG10 4MA6 MG10 3MA6 MG10 3MA6 5MA7 MH7 2. |
      2. 2MH7 3MA7 MH7 3MA6 MG10 4MA6 MG10 3MA6 MG10 3MA6 MH7 3MA7 2MH7 2. |
      3. 7MH7 MA6 MG10 4MA6 MG10 3MA6 MG10 MA6 7MH7 3. |
      9. 7MH7 MG10 6MH7 9. |
      15. 3MH7 14. |
      32. |
      32. |
      32. |
      32. |
      32. |
      32. |
      32.
    `, 32, 32, C_MAP)
  },
  {
    id: 'glazed-donut-rainbow',
    title: '彩虹糖针草莓甜甜圈',
    category: 'food',
    tag: '甜品烘焙',
    difficulty: '★★★☆☆',
    desc: '32×32标准画幅。金黄松软面圈、浓郁粉红草莓淋面与七彩缤纷糖针点缀。',
    matrix: decodeGrid(`
      32. |
      32. |
      32. |
      32. |
      10. 12MH7 10. |
      9. 2MH7 10MA18 2MH7 9. |
      7. 3MH7 3MA18 6ME4 3MA18 3MH7 7. |
      6. 2MH7 3MA18 10ME4 3MA18 2MH7 6. |
      6. MH7 2MA18 14ME4 2MA18 MH7 6. |
      5. 2MH7 MA18 12ME4 2MB5 2ME4 MA18 2MH7 5. |
      4. 2MH7 2MA18 ME4 3MC4 9ME4 2MB5 ME4 2MA18 2MH7 4. |
      4. MH7 2MA18 18ME4 2MA18 MH7 4. |
      4. MH7 2MA18 7ME4 4MH7 7ME4 2MA18 MH7 4. |
      4. MH7 MA18 7ME4 2MH7 2. 2MH7 7ME4 MA18 MH7 4. |
      4. MH7 MA18 6ME4 2MH7 4. 2MH7 6ME4 MA18 MH7 4. |
      4. MH7 MA18 6ME4 MH7 6. MH7 6ME4 MA18 MH7 4. |
      4. MH7 MA18 6ME4 MH7 6. MH7 6ME4 MA18 MH7 4. |
      4. MH7 MA18 2ME4 2MA4 2ME4 2MH7 4. 2MH7 ME4 MF4 4ME4 MA18 MH7 4. |
      4. MH7 MA18 3ME4 2MA4 2ME4 2MH7 2. 2MH7 2ME4 MF4 4ME4 MA18 MH7 4. |
      4. MH7 2MA18 7ME4 4MH7 3ME4 MF4 3ME4 2MA18 MH7 4. |
      4. MH7 2MA18 18ME4 2MA18 MH7 4. |
      4. 2MH7 2MA18 16ME4 2MA18 2MH7 4. |
      5. 2MH7 MA18 6ME4 3MD14 7ME4 MA18 2MH7 5. |
      6. MH7 2MA18 14ME4 2MA18 MH7 6. |
      6. 2MH7 3MA18 10ME4 3MA18 2MH7 6. |
      7. 3MH7 3MA18 6ME4 3MA18 3MH7 7. |
      9. 2MH7 10MA18 2MH7 9. |
      10. 12MH7 10. |
      32. |
      32. |
      32. |
      32.
    `, 32, 32, C_MAP)
  },
  {
    id: 'avocado-toast',
    title: '牛油果溏心蛋吐司',
    category: 'food',
    tag: '健康轻食',
    difficulty: '★★★★☆',
    desc: '32×32标准画幅。烤至焦香金黄厚吐司片、层叠翠绿牛油果片与切开的金黄溏心蛋。',
    matrix: decodeGrid(`
      32. |
      32. |
      32. |
      32. |
      32. |
      32. |
      32. |
      6. 19MH7 7. |
      6. MH7 17MA18 MH7 7. |
      6. MH7 MA18 15MA1 MA18 MH7 7. |
      6. MH7 MA18 15MA1 MA18 MH7 7. |
      6. MH7 MA18 15MA1 MA18 MH7 7. |
      6. MH7 MA18 MA1 7MB5 7MA1 MA18 MH7 7. |
      6. MH7 MA18 MA1 5MB5 4MH1 5MB8 MA18 MH7 7. |
      6. MH7 MA18 2MA1 3MB5 6MH1 3MB8 MA1 MA18 MH7 7. |
      6. MH7 MA18 2MA1 3MB5 2MH1 2MA7 2MH1 3MB8 MA1 MA18 MH7 7. |
      6. MH7 MA18 2MA1 2MB5 2MH1 4MA7 2MH1 MB8 2MA1 MA18 MH7 7. |
      6. MH7 MA18 2MA1 3MB5 2MH1 2MA7 2MH1 2MB8 2MA1 MA18 MH7 7. |
      6. MH7 MA18 3MA1 2MB5 6MH1 MB8 3MA1 MA18 MH7 7. |
      6. MH7 MA18 3MA1 MB5 2MA1 4MH1 2MB8 3MA1 MA18 MH7 7. |
      6. MH7 MA18 3MA1 MB5 6MA1 MB8 4MA1 MA18 MH7 7. |
      6. MH7 MA18 10MA1 MB8 4MA1 MA18 MH7 7. |
      6. MH7 MA18 15MA1 MA18 MH7 7. |
      6. MH7 17MA18 MH7 7. |
      6. 19MH7 7. |
      32. |
      32. |
      32. |
      32. |
      32. |
      32. |
      32.
    `, 32, 32, C_MAP)
  },
  {
    id: 'summer-watermelon',
    title: '盛夏多汁大西瓜',
    category: 'food',
    tag: '清凉水果',
    difficulty: '★★☆☆☆',
    desc: '32×32标准画幅。深绿翠瓜皮、鲜嫩多汁红瓤与饱满黑亮西瓜籽，夏日消暑必备。',
    matrix: decodeGrid(`
      32. |
      32. |
      32. |
      32. |
      32. |
      32. |
      32. |
      32. |
      32. |
      3. 26MH7 3. |
      3. MH7 24MF4 MH7 3. |
      3. 2MH7 22MF4 2MH7 3. |
      4. MH7 22MF4 MH7 4. |
      4. MH7 11MF4 MH7 10MF4 MH7 4. |
      4. MH7 5MF4 MH7 10MF4 MH7 5MF4 MH7 4. |
      4. MH7 22MF4 MH7 4. |
      4. 2MH7 20MF4 2MH7 4. |
      5. MH7 6MF4 MH7 6MF4 MH7 6MF4 MH7 5. |
      5. 2MH7 18MF4 2MH7 5. |
      6. MH7 18MB28 MH7 6. |
      6. 2MH7 16MB28 2MH7 6. |
      7. 2MH7 14MB8 2MH7 7. |
      8. 2MH7 12MB8 2MH7 8. |
      9. 3MH7 8MB8 3MH7 9. |
      11. 10MH7 11. |
      32. |
      32. |
      32. |
      32. |
      32. |
      32. |
      32.
    `, 32, 32, C_MAP)
  },
  {
    id: 'coffee-latte-art',
    title: '爱心拉花卡布奇诺',
    category: 'food',
    tag: '咖啡日常',
    difficulty: '★★★★☆',
    desc: '32×32标准画幅。深蓝陶瓷马克杯、醇厚深褐咖啡油脂与细腻奶泡爱心拉花。',
    matrix: decodeGrid(`
      32. |
      32. |
      32. |
      32. |
      32. |
      32. |
      11. 8MH7 13. |
      8. 4MH7 6MC8 4MH7 10. |
      7. 2MH7 12MC8 2MH7 9. |
      6. 2MH7 4MC8 6MG16 4MC8 2MH7 8. |
      5. 2MH7 3MC8 10MG16 3MC8 6MH7 3. |
      4. 2MH7 2MC8 14MG16 6MC8 MH7 3. |
      4. MH7 3MC8 3MG16 8MH1 3MG16 6MC8 2MH7 2. |
      4. MH7 2MC8 3MG16 10MH1 3MG16 2MC8 2MH7 2MC8 MH7 2. |
      4. MH7 2MC8 3MG16 10MH1 3MG16 2MC8 2MH7 2MC8 MH7 2. |
      4. MH7 2MC8 3MG16 10MH1 3MG16 2MC8 2MH7 2MC8 MH7 2. |
      4. MH7 2MC8 4MG16 8MH1 4MG16 2MC8 2MH7 2MC8 MH7 2. |
      4. MH7 2MC8 5MG16 6MH1 5MG16 2MC8 2MH7 2MC8 MH7 2. |
      4. MH7 2MC8 6MG16 4MH1 6MG16 2MC8 2MH7 2MC8 MH7 2. |
      4. MH7 3MC8 6MG16 2MH1 6MG16 6MC8 2MH7 2. |
      4. 2MH7 2MC8 14MG16 6MC8 MH7 3. |
      5. 2MH7 3MC8 10MG16 3MC8 6MH7 3. |
      6. 2MH7 4MC8 6MG16 4MC8 2MH7 8. |
      7. 2MH7 12MC8 2MH7 9. |
      8. 4MH7 6MC8 4MH7 10. |
      11. 8MH7 13. |
      32. |
      32. |
      32. |
      32. |
      32. |
      32.
    `, 32, 32, C_MAP)
  },
  {
    id: 'onigiri-nori',
    title: '日式海苔三角饭团',
    category: 'food',
    tag: '日料经典',
    difficulty: '★★☆☆☆',
    desc: '32×32标准画幅。圆润饱满雪白三角饭团，正中心包裹大块香脆纯黑海苔片。',
    matrix: decodeGrid(`
      32. |
      32. |
      32. |
      13. 6MH7 13. |
      13. MH7 4MH1 MH7 13. |
      12. 2MH7 4MH1 2MH7 12. |
      12. MH7 6MH1 MH7 12. |
      12. 2MH7 4MH1 2MH7 12. |
      12. 2MH7 4MH1 2MH7 12. |
      12. MH7 6MH1 MH7 12. |
      11. 2MH7 6MH1 2MH7 11. |
      11. MH7 3MH1 2MF4 3MH1 MH7 11. |
      10. 2MH7 3MH1 2MF4 3MH1 2MH7 10. |
      10. MH7 4MH1 2MF4 4MH1 MH7 10. |
      9. 2MH7 10MH1 2MH7 9. |
      9. MH7 12MH1 MH7 9. |
      8. 2MH7 12MH1 2MH7 8. |
      8. MH7 14MH1 MH7 8. |
      7. 2MH7 3MH1 7MH7 4MH1 2MH7 7. |
      7. MH7 4MH1 7MH7 5MH1 MH7 7. |
      6. 2MH7 4MH1 7MH7 5MH1 2MH7 6. |
      4. 3MH7 5MH1 7MH7 6MH1 3MH7 4. |
      3. 2MH7 7MH1 7MH7 8MH1 2MH7 3. |
      3. MH7 8MH1 7MH7 9MH1 MH7 3. |
      3. MH7 8MH1 7MH7 9MH1 MH7 3. |
      3. MH7 24MH1 MH7 3. |
      3. 2MH7 3MH1 16MH7 3MH1 2MH7 3. |
      4. 5MH7 14. 5MH7 4. |
      32. |
      32. |
      32. |
      32.
    `, 32, 32, C_MAP)
  },
  {
    id: 'mount-fuji-sakura',
    title: '富士山与飘落樱花',
    category: 'architecture',
    tag: '名胜风景',
    difficulty: '★★★★★',
    desc: '32×32标准画幅。白雪山冠、朱红初升旭日与和风吹拂的粉樱花瓣。',
    matrix: decodeGrid(`
      32. |
      32. |
      32. |
      4. 5MH7 23. |
      4. MH7 3ME4 MH7 2. 10MH7 11. |
      4. MH7 3ME4 MH7 1. 2MH7 8MF4 2MH7 10. |
      4. MH7 3ME4 3MH7 10MF4 7MH7 4. |
      4. 6MH7 5MF4 2MH1 5MF4 2MH7 3ME4 MH7 4. |
      8. 2MH7 4MF4 4MH1 4MF4 2MH7 3ME4 MH7 4. |
      8. MH7 4MF4 6MH1 4MF4 MH7 3ME4 MH7 4. |
      8. MH7 4MF4 6MH1 4MF4 5MH7 4. |
      8. MH7 3MF4 8MH1 3MF4 MH7 8. |
      8. MH7 2MF4 10MH1 2MF4 MH7 8. |
      8. MH7 2MF4 10MH1 2MF4 MH7 8. |
      8. 2MH7 12MH1 2MH7 8. |
      8. MH7 14MC8 MH7 8. |
      7. 2MH7 14MC8 2MH7 7. |
      7. MH7 16MC8 MH7 7. |
      6. 2MH7 16MC8 7MH7 1. |
      6. MH7 18MC8 2MH7 3ME4 MH7 1. |
      5. 2MH7 18MC8 2MH7 3ME4 MH7 1. |
      4. 2MH7 20MC8 MH7 3ME4 MH7 1. |
      4. MH7 22MC8 4MH7 1. |
      3. 2MH7 22MC8 2MH7 3. |
      3. MH7 24MC8 MH7 3. |
      2. 2MH7 24MC8 2MH7 2. |
      3MH7 26MC8 3MH7 |
      32MC11 |
      32MC11 |
      32MC3 |
      32MC11 |
      32MC11
    `, 32, 32, C_MAP)
  },
  {
    id: 'sea-torii-gate',
    title: '严岛水上鸟居',
    category: 'architecture',
    tag: '东方神韵',
    difficulty: '★★★★★',
    desc: '32×32标准画幅。朱红神木大鸟居傲立碧蓝海潮之中，气势恢宏。',
    matrix: decodeGrid(`
      32. |
      32. |
      32. |
      32. |
      32. |
      1. 30MH7 1. |
      1. MH7 28MF4 MH7 1. |
      1. MH7 28MF4 MH7 1. |
      1. MH7 28MF4 MH7 1. |
      1. 7MH7 3MF4 10MH7 3MF4 7MH7 1. |
      4. 4MH7 3MF4 10MH7 3MF4 4MH7 4. |
      4. MH7 22MF4 MH7 4. |
      4. MH7 22MF4 MH7 4. |
      4. 4MH7 3MF4 10MH7 3MF4 4MH7 4. |
      7. MH7 3MF4 MH7 8. MH7 3MF4 MH7 7. |
      7. MH7 3MF4 MH7 8. MH7 3MF4 MH7 7. |
      7. MH7 3MF4 MH7 8. MH7 3MF4 MH7 7. |
      7. MH7 3MF4 MH7 8. MH7 3MF4 MH7 7. |
      7. MH7 3MF4 MH7 8. MH7 3MF4 MH7 7. |
      7. MH7 3MF4 MH7 8. MH7 3MF4 MH7 7. |
      7. MH7 3MF4 MH7 8. MH7 3MF4 MH7 7. |
      8MH7 3MF4 10MH7 3MF4 8MH7 |
      8MC8 3MF4 10MC8 3MF4 8MC8 |
      7MC8 5MH7 8MC8 5MH7 7MC8 |
      7MC4 5MH7 8MC4 5MH7 7MC4 |
      7MC8 5MH7 8MC8 5MH7 7MC8 |
      32MC8 |
      32MC8 |
      32MC3 |
      32MC8 |
      32MC8 |
      32MC8
    `, 32, 32, C_MAP)
  },
  {
    id: 'forbidden-city-corner',
    title: '故宫角楼日落飞檐',
    category: 'architecture',
    tag: '国风古建',
    difficulty: '★★★★★',
    desc: '32×32标准画幅。朱红宫墙、层叠重檐金黄琉璃瓦与落日晚霞。',
    matrix: decodeGrid(`
      32MF1 |
      32MF1 |
      32MF1 |
      32MF1 |
      32MF1 |
      14MA7 4MA4 14MA7 |
      13MA7 6MA4 13MA7 |
      12MA7 8MA4 12MA7 |
      11MA7 11MA4 10MA7 |
      9MA7 14MA4 9MA7 |
      8MH7 16MA4 8MH7 |
      7. 5MH7 8MA4 5MH7 7. |
      8. 3MH7 10MA4 3MH7 8. |
      6. 3MH7 14MA4 3MH7 6. |
      5. 2MH7 18MA4 2MH7 5. |
      3. 3MH7 20MA4 3MH7 3. |
      3. MH7 24MA4 MH7 3. |
      3. 8MH7 10MA4 8MH7 3. |
      6. 3MH7 14MA4 3MH7 6. |
      4. 3MH7 18MA4 3MH7 4. |
      2. 3MH7 22MA4 3MH7 2. |
      3MH7 26MA4 3MH7 |
      MH7 5MA4 20MF15 5MA4 MH7 |
      6MH7 3MF15 3MH7 14MF15 6MH7 |
      5. MH7 3MF15 3MH7 14MF15 MH7 5. |
      5. MH7 3MF15 3MH7 14MF15 MH7 5. |
      5. MH7 3MF15 3MH7 14MF15 MH7 5. |
      5. MH7 3MF15 3MH7 14MF15 MH7 5. |
      5. MH7 3MF15 3MH7 14MF15 MH7 5. |
      5. MH7 3MF15 3MH7 14MF15 MH7 5. |
      5. 22MH7 5. |
      32.
    `, 32, 32, C_MAP)
  },
  {
    id: 'jiangnan-water-bridge',
    title: '江南水乡青瓦拱桥',
    category: 'architecture',
    tag: '水乡如诗',
    difficulty: '★★★★★',
    desc: '32×32标准画幅。粉墙黛瓦、青石圆拱桥跨越碧波绿水，垂柳依依。',
    matrix: decodeGrid(`
      32. |
      32. |
      32. |
      32. |
      4. 5MH7 23. |
      3. 7MH7 22. |
      2. 8MH7 22. |
      1. 10MH7 21. |
      1. 2MH7 6MH1 2MH7 21. |
      1. 2MH7 6MH1 2MH7 21. |
      2. MH7 6MH1 MH7 2. 8MH7 12. |
      2. MH7 6MH1 4MH7 6MH3 4MH7 9. |
      2. MH7 6MH1 MH7 12MH3 3MH7 7. |
      2. MH7 6MH1 15MH3 4MH7 4. |
      2. MH7 6MH1 18MH3 3MH7 2. |
      3MH7 6MH1 20MH3 3MH7 |
      13MH3 6MB8 13MH3 |
      12MH3 8MB8 12MH3 |
      11MH3 10MB8 11MH3 |
      11MH3 10MB8 11MH3 |
      11MH3 10MB8 11MH3 |
      11MH3 10MB8 11MH3 |
      11MB19 10MB8 11MB19 |
      12MB19 8MB8 12MB19 |
      13MB19 6MB8 13MB19 |
      32MB19 |
      32MB19 |
      32MB19 |
      32MB19 |
      32MB19 |
      32MB19 |
      32MB19
    `, 32, 32, C_MAP)
  },
  {
    id: 'guochao-lion-dance',
    title: '国潮醒狮威武狮头',
    category: 'architecture',
    tag: '非遗国潮',
    difficulty: '★★★★★',
    desc: '32×32标准画幅。威风凛凛醒狮头、正红金黄相间绒球、灵动大眼与威武金额。',
    matrix: decodeGrid(`
      32. |
      32. |
      32. |
      13. 6MH7 13. |
      12. 2MH7 4MA4 2MH7 12. |
      7. 3MH7 2. MH7 6MA4 MH7 2. 3MH7 7. |
      5. 3MH7 MA7 4MH7 6MA4 4MH7 MA7 3MH7 5. |
      5. MH7 5MA7 MF4 8MA4 MF4 5MA7 MH7 5. |
      4. 2MH7 5MA7 2MF4 6MA4 2MF4 5MA7 2MH7 4. |
      4. MH7 7MA7 MF4 6MA4 MF4 7MA7 MH7 4. |
      4. 2MH7 5MA7 3MF4 4MA4 3MF4 5MA7 2MH7 4. |
      4. 2MH7 5MA7 10MF4 5MA7 2MH7 4. |
      4. MH7 3MF4 4MH1 8MF4 4MH1 3MF4 MH7 4. |
      3. 2MH7 2MF4 6MH1 6MF4 6MH1 2MF4 2MH7 3. |
      3. MH7 3MF4 MH1 4MH7 MH1 6MF4 MH1 4MH7 MH1 3MF4 MH7 3. |
      3. MH7 2MF4 2MH1 4MH7 2MH1 4MF4 2MH1 4MH7 2MH1 2MF4 MH7 3. |
      3. MH7 3MF4 MH1 4MH7 MH1 6MF4 MH1 4MH7 MH1 3MF4 MH7 3. |
      3. MH7 3MF4 6MH1 6MF4 6MH1 3MF4 MH7 3. |
      3. MH7 4MF4 4MH1 8MF4 4MH1 4MF4 MH7 3. |
      3. MH7 24MF4 MH7 3. |
      3. MH7 24MF4 MH7 3. |
      3. 2MH7 22MF4 2MH7 3. |
      4. MH7 4MF4 5MH1 4MF15 4MH1 5MF4 MH7 4. |
      4. 2MH7 3MF4 5MH1 4MF15 4MH1 4MF4 2MH7 4. |
      5. 2MH7 2MF4 5MH1 4MF15 4MH1 3MF4 2MH7 5. |
      6. 2MH7 MF4 13MH1 2MF4 2MH7 6. |
      7. 2MH7 14MF4 2MH7 7. |
      8. 3MH7 10MF4 3MH7 8. |
      10. 12MH7 10. |
      32. |
      32. |
      32.
    `, 32, 32, C_MAP)
  },
  {
    id: 'galaxy-lighthouse',
    title: '星空银河灯塔',
    category: 'architecture',
    tag: '浪漫星海',
    difficulty: '★★★★★',
    desc: '32×32标准画幅。深蓝星幕璀璨、海岸礁石上纯白灯塔旋转射出破晓光芒。',
    matrix: decodeGrid(`
      32MC12 |
      32MC12 |
      11MC12 MA4 20MC12 |
      5MA1 22MC12 5MA1 |
      9MA1 14MC12 9MA1 |
      13MA1 5MA4 MC12 13MA1 |
      32MA1 |
      9MA1 4MC12 5MA4 5MC12 9MA1 |
      31MC12 MA1 |
      13MC12 5MH1 14MC12 |
      13MC12 5MH1 14MC12 |
      13MC12 5MH1 14MC12 |
      13MC12 6MH1 13MC12 |
      12MC12 7MF4 13MC12 |
      12MC12 7MF4 13MC12 |
      12MC12 7MF4 13MC12 |
      12MC12 7MH1 13MC12 |
      12MC12 7MH1 13MC12 |
      12MC12 7MH1 13MC12 |
      12MC12 7MH1 13MC12 |
      12MC12 8MH1 12MC12 |
      11MC12 9MH1 12MC12 |
      11MH4 9MH1 12MH4 |
      11MH4 9MH1 12MH4 |
      11MH4 9MH1 12MH4 |
      32MH4 |
      32MH4 |
      32MH4 |
      32MH4 |
      32MH4 |
      32MH4 |
      32MH4
    `, 32, 32, C_MAP)
  },
  {
    id: 'aurora-boreal-forest',
    title: '极光针叶林',
    category: 'architecture',
    tag: '极地自然',
    difficulty: '★★★★★',
    desc: '32×32标准画幅。天幕流淌幽绿与深蓝极光缎带，倒映在静谧的黑松剪影之上。',
    matrix: decodeGrid(`
      32MC16 |
      32MC16 |
      32MC16 |
      13MC16 5MB6 14MC16 |
      10MC16 11MB6 11MC16 |
      8MC16 15MB6 9MC16 |
      5MC16 20MB6 7MC16 |
      3MC16 24MB6 5MC16 |
      14MB6 3MC16 13MB6 2MC16 |
      11MB6 9MC16 12MB6 |
      9MB6 5MC16 7MC17 MC16 10MB6 |
      6MB6 5MC16 11MC17 2MC16 8MB6 |
      4MB6 3MC16 17MC17 2MC16 6MB6 |
      4MC16 22MC17 3MC16 3MB6 |
      15MC17 5MC16 7MC17 4MC16 MB6 |
      12MC17 9MC16 8MC17 3MC16 |
      8MC17 15MC16 7MC17 2MC16 |
      5MC17 20MC16 7MC17 |
      12MC16 MH7 13MC16 6MC17 |
      11MC16 3MH7 12MC16 MH7 MC16 4MC17 |
      5MC16 MH7 5MC16 3MH7 11MC16 3MH7 MC16 3MC17 |
      4MC16 3MH7 3MC16 5MH7 4MC16 MH7 5MC16 3MH7 3MC16 MC17 |
      4MC16 3MH7 3MC16 5MH7 3MC16 3MH7 3MC16 5MH7 3MC16 |
      3MC16 5MH7 MC16 7MH7 2MC16 3MH7 3MC16 5MH7 3MC16 |
      3MC16 5MH7 MC16 7MH7 MC16 5MH7 MC16 7MH7 2MC16 |
      2MC16 20MH7 MC16 7MH7 2MC16 |
      2MC16 29MH7 MC16 |
      MC16 30MH7 MC16 |
      MC16 31MH7 |
      11MH7 4MC16 17MH7 |
      11MH7 3MC16 11MH7 7MC16 |
      14MC16 11MH7 7MC16
    `, 32, 32, C_MAP)
  },
  {
    id: 'santorini-blue-dome',
    title: '圣托里尼蓝顶白教堂',
    category: 'architecture',
    tag: '爱琴海',
    difficulty: '★★★★★',
    desc: '32×32标准画幅。爱琴海标志性纯白地中海圆拱建筑与纯净深蓝穹顶十字架。',
    matrix: decodeGrid(`
      32MC4 |
      16MC4 MA4 15MC4 |
      16MC4 MA4 15MC4 |
      14MC4 5MA4 13MC4 |
      16MC4 MA4 15MC4 |
      13MC4 3MC8 MA4 2MC8 13MC4 |
      11MC4 10MC8 11MC4 |
      10MC4 12MC8 10MC4 |
      10MC4 12MC8 10MC4 |
      9MC4 14MC8 9MC4 |
      9MC4 14MC8 9MC4 |
      9MC4 14MC8 9MC4 |
      8MC4 16MC8 8MC4 |
      5MC4 21MH1 6MC4 |
      5MH7 21MH1 6MH7 |
      4. MH7 21MH1 MH7 5. |
      4. MH7 21MH1 MH7 5. |
      4. MH7 21MH1 MH7 5. |
      4. MH7 21MH1 MH7 5. |
      4. MH7 8MH1 5MC18 8MH1 MH7 5. |
      4. MH7 8MH1 5MC18 8MH1 MH7 5. |
      4. MH7 8MH1 5MC18 8MH1 MH7 5. |
      4. MH7 8MH1 5MC18 8MH1 MH7 5. |
      4. MH7 8MH1 5MC18 8MH1 MH7 5. |
      4. MH7 8MH1 5MC18 8MH1 MH7 5. |
      4. MH7 8MH1 5MC18 8MH1 MH7 5. |
      4. MH7 8MH1 5MC18 8MH1 MH7 5. |
      4. MH7 8MH1 5MC18 8MH1 MH7 5. |
      4. 23MH7 5. |
      32. |
      32. |
      32.
    `, 32, 32, C_MAP)
  },
  {
    id: 'cherry-blossom-train',
    title: '樱花铁道列车',
    category: 'architecture',
    tag: '和风物语',
    difficulty: '★★★★☆',
    desc: '32×32标准画幅。绿色复古铁道列车穿行在盛开的粉嫩樱花树下。',
    matrix: decodeGrid(`
      7MC13 ME4 8MC13 ME8 15MC13 |
      4MC13 7ME4 2MC13 7ME8 12MC13 |
      3MC13 9ME4 9ME8 2MC13 5ME4 4MC13 |
      2MC13 10ME4 9ME8 MC13 7ME4 3MC13 |
      2MC13 10ME4 9ME8 9ME4 2MC13 |
      2MC13 9ME4 9ME8 11ME4 MC13 |
      MC13 11ME4 8ME8 11ME4 MC13 |
      2MC13 10ME4 8ME8 11ME4 MC13 |
      2MC13 10ME4 8ME8 11ME4 MC13 |
      2MC13 11ME4 7ME8 11ME4 MC13 |
      3MC13 9ME4 4MC13 ME8 4MC13 9ME4 2MC13 |
      4MC13 7ME4 11MC13 7ME4 3MC13 |
      7MC13 ME4 15MC13 5ME4 4MC13 |
      32MC13 |
      32MC13 |
      32MC13 |
      32MC13 |
      32MC13 |
      4MH7 24MB8 4MH7 |
      3. MH7 2MB8 5MC11 2MB8 5MC11 2MB8 5MC11 3MB8 MH7 3. |
      3. MH7 2MB8 5MC11 2MB8 5MC11 2MB8 5MC11 3MB8 MH7 3. |
      3. MH7 2MB8 5MC11 2MB8 5MC11 2MB8 5MC11 3MB8 MH7 3. |
      3. MH7 2MB8 5MC11 2MB8 5MC11 2MB8 5MC11 3MB8 MH7 3. |
      3. MH7 24MB8 MH7 3. |
      3. MH7 24MB8 MH7 3. |
      3. MH7 24MB8 MH7 3. |
      3. MH7 24MB8 MH7 3. |
      3. 26MH7 3. |
      32MH7 |
      32MH4 |
      32MH4 |
      32MH7
    `, 32, 32, C_MAP)
  },
  {
    id: 'sunset-desert-pyramid',
    title: '金字塔夕阳剪影',
    category: 'architecture',
    tag: '古代遗迹',
    difficulty: '★★★★☆',
    desc: '32×32标准画幅。大漠落日晚霞、金色沙漠与古老神秘金字塔巍峨剪影。',
    matrix: decodeGrid(`
      32MF1 |
      32MF1 |
      32MF1 |
      20MF1 5MA4 7MF1 |
      19MF1 7MA4 6MF1 |
      18MF1 9MA4 5MF1 |
      17MF1 11MA4 4MF1 |
      17MA7 11MA4 4MA7 |
      12MA7 MG10 2MG16 2MA7 11MA4 4MA7 |
      12MA7 MG10 2MG16 2MA7 11MA4 4MA7 |
      11MA7 2MG10 3MG16 MA7 11MA4 4MA7 |
      11MA7 2MG10 4MG16 MA7 9MA4 5MA7 |
      10MA7 3MG10 5MG16 MA7 7MA4 6MA7 |
      10MA7 3MG10 5MG16 2MA7 5MA4 7MA7 |
      9MH7 4MG10 6MG16 13MH7 |
      7. 2MH7 4MG10 7MG16 2MH7 10. |
      6. 2MH7 5MG10 8MG16 MH7 10. |
      6. MH7 6MG10 8MG16 2MH7 9. |
      5. 2MH7 6MG10 9MG16 2MH7 8. |
      5. MH7 7MG10 10MG16 MH7 8. |
      4. 2MH7 7MG10 10MG16 2MH7 7. |
      4. MH7 8MG10 11MG16 2MH7 6. |
      3. 2MH7 8MG10 12MG16 2MH7 5. |
      4MH7 9MG10 13MG16 6MH7 |
      32MA8 |
      32MA8 |
      32MA8 |
      32MA8 |
      32MA8 |
      32MA8 |
      32MA8 |
      32MA8
    `, 32, 32, C_MAP)
  },
  {
    id: 'windy-dutch-windmill',
    title: '荷兰郁金香风车',
    category: 'architecture',
    tag: '欧式田园',
    difficulty: '★★★★☆',
    desc: '32×32标准画幅。复古欧式木风车与山坡下盛开的彩色郁金香花海。',
    matrix: decodeGrid(`
      21MC10 2MH1 9MC10 |
      20MC10 3MH1 9MC10 |
      5MC10 3MH1 12MC10 3MH1 9MC10 |
      5MC10 4MH1 10MC10 3MH1 10MC10 |
      6MC10 5MH1 7MC10 3MH1 11MC10 |
      8MC10 5MH1 4MC10 3MH1 12MC10 |
      10MC10 4MH1 3MC10 3MH1 12MC10 |
      11MC10 8MH1 13MC10 |
      13MC10 5MH1 14MC10 |
      13MC10 MG12 5MH1 13MC10 |
      13MC10 MG12 7MH1 11MC10 |
      13MC10 3MH1 2MG12 5MH1 9MC10 |
      12MC10 3MH1 4MG12 MC10 4MH1 8MC10 |
      12MC10 3MH1 4MG12 2MC10 5MH1 6MC10 |
      11MC10 3MH1 5MG12 4MC10 4MH1 5MC10 |
      10MC10 3MH1 6MG12 6MC10 2MH1 5MC10 |
      10MC10 3MH1 6MG12 13MC10 |
      9MC10 3MH1 7MG12 13MC10 |
      9MH7 2MH1 9MG12 12MH7 |
      8. 3MH7 9MG12 MH7 11. |
      11MH7 9MG12 12MH7 |
      32MB5 |
      3MB5 3MF4 9MB5 3MF4 9MB5 3MF4 2MB5 |
      3MB5 3MF4 3MB5 3MF4 3MB5 3MF4 9MB5 3MF4 2MB5 |
      3MB5 3MF4 3MB5 3MF4 3MB5 3MF4 3MB5 3MF4 3MB5 3MF4 2MB5 |
      9MB5 3MF4 9MB5 3MF4 8MB5 |
      21MB5 3MF4 8MB5 |
      32MB5 |
      32MB5 |
      32MB5 |
      32MB5 |
      32MB5
    `, 32, 32, C_MAP)
  },
  {
    id: 'new-year-lucky-fortune',
    title: '新春福到大红包',
    category: 'festival',
    tag: '新春民俗',
    difficulty: '★★★☆☆',
    desc: '32×32标准画幅。吉祥喜庆正红大红包，烫金祥云与正中大大的金黄“福”字。',
    matrix: decodeGrid(`
      32. |
      32. |
      32. |
      32. |
      6. 19MH7 7. |
      6. MH7 17MF4 MH7 7. |
      6. MH7 MF4 16MF15 MH7 7. |
      6. MH7 2MF4 14MF15 MF4 MH7 7. |
      6. MH7 4MF4 10MF15 3MF4 MH7 7. |
      6. MH7 5MF4 8MF15 4MF4 MH7 7. |
      6. MH7 6MF4 6MF15 5MF4 MH7 7. |
      6. MH7 7MF4 4MF15 6MF4 MH7 7. |
      6. MH7 7MF4 4MA4 6MF4 MH7 7. |
      6. MH7 5MF4 8MA4 4MF4 MH7 7. |
      6. MH7 4MF4 2MA4 5MF4 3MA4 3MF4 MH7 7. |
      6. MH7 4MF4 2MA4 5MF4 3MA4 3MF4 MH7 7. |
      6. MH7 4MF4 2MA4 5MF4 3MA4 3MF4 MH7 7. |
      6. MH7 3MF4 3MA4 5MF4 4MA4 2MF4 MH7 7. |
      6. MH7 4MF4 2MA4 5MF4 3MA4 3MF4 MH7 7. |
      6. MH7 4MF4 2MA4 5MF4 3MA4 3MF4 MH7 7. |
      6. MH7 4MF4 10MA4 3MF4 MH7 7. |
      6. MH7 5MF4 8MA4 4MF4 MH7 7. |
      6. MH7 7MF4 4MA4 6MF4 MH7 7. |
      6. MH7 17MF4 MH7 7. |
      6. MH7 17MF4 MH7 7. |
      6. MH7 17MF4 MH7 7. |
      6. MH7 17MF4 MH7 7. |
      6. 19MH7 7. |
      32. |
      32. |
      32. |
      32.
    `, 32, 32, C_MAP)
  },
  {
    id: 'lucky-four-leaf-clover',
    title: '幸运四叶草水晶瓶',
    category: 'festival',
    tag: '幸运祝愿',
    difficulty: '★★★★☆',
    desc: '32×32标准画幅。四片碧绿心形叶片环绕、透亮水晶瓶与露珠微光。',
    matrix: decodeGrid(`
      32. |
      32. |
      32. |
      32. |
      32. |
      10. 11MH7 11. |
      10. MH7 9MG12 MH7 11. |
      10. MH7 9MG12 MH7 11. |
      10. 2MH7 7MC2 2MH7 11. |
      11. MH7 7MC2 MH7 12. |
      10. 2MH7 7MC2 3MH7 10. |
      9. 2MH7 MC13 7MC2 2MC13 2MH7 9. |
      8. 2MH7 4MC13 4MB5 4MC13 2MH7 8. |
      7. 2MH7 5MC13 4MB5 5MC13 2MH7 7. |
      6. 2MH7 5MC13 6MB5 5MC13 2MH7 6. |
      6. MH7 5MC13 8MB5 5MC13 MH7 6. |
      6. MH7 4MC13 5MB5 MB8 4MB5 4MC13 MH7 6. |
      5. 2MH7 5MC13 4MB5 MB8 3MB5 5MC13 2MH7 5. |
      5. MH7 7MC13 3MB5 MB8 2MB5 7MC13 MH7 5. |
      5. 2MH7 7MC13 2MB5 MB8 MB5 7MC13 2MH7 5. |
      6. MH7 7MC13 2MB5 MB8 MB5 7MC13 MH7 6. |
      6. MH7 9MC13 MB8 8MC13 MH7 6. |
      6. 2MH7 8MC13 MB8 7MC13 2MH7 6. |
      7. 2MH7 14MC13 2MH7 7. |
      8. 2MH7 12MC13 2MH7 8. |
      9. 2MH7 10MC13 2MH7 9. |
      10. 12MH7 10. |
      32. |
      32. |
      32. |
      32. |
      32.
    `, 32, 32, C_MAP)
  },
  {
    id: 'halloween-jack-lantern',
    title: '万圣杰克南瓜灯',
    category: 'festival',
    tag: '奇趣万圣',
    difficulty: '★★★☆☆',
    desc: '32×32标准画幅。圆滚滚饱满熟橙南瓜、头顶绿瓜蒂与镂空邪魅金光笑脸。',
    matrix: decodeGrid(`
      32. |
      32. |
      32. |
      32. |
      13. 5MH7 14. |
      13. MH7 3MB8 MH7 14. |
      13. MH7 3MB8 MH7 14. |
      13. MH7 3MB8 MH7 14. |
      11. 3MH7 3MB8 4MH7 11. |
      9. 3MH7 8MA7 3MH7 9. |
      7. 3MH7 12MA7 3MH7 7. |
      6. 2MH7 16MA7 2MH7 6. |
      5. 2MH7 18MA7 2MH7 5. |
      4. 2MH7 5MA7 MA4 8MA7 MA4 5MA7 2MH7 4. |
      4. MH7 5MA7 3MA4 6MA7 3MA4 5MA7 MH7 4. |
      3. 2MH7 5MA7 3MA4 6MA7 3MA4 5MA7 2MH7 3. |
      3. MH7 5MA7 5MA4 4MA7 5MA4 5MA7 MH7 3. |
      3. MH7 24MA7 MH7 3. |
      3. MH7 11MA7 2MA4 11MA7 MH7 3. |
      3. MH7 11MA7 3MA4 10MA7 MH7 3. |
      3. MH7 24MA7 MH7 3. |
      3. 2MH7 22MA7 2MH7 3. |
      4. MH7 5MA7 12MA4 5MA7 MH7 4. |
      4. 2MH7 5MA7 10MA4 5MA7 2MH7 4. |
      5. 2MH7 5MA7 8MA4 5MA7 2MH7 5. |
      6. 2MH7 16MA7 2MH7 6. |
      7. 3MH7 12MA7 3MH7 7. |
      9. 3MH7 8MA7 3MH7 9. |
      11. 10MH7 11. |
      32. |
      32. |
      32.
    `, 32, 32, C_MAP)
  },
  {
    id: 'christmas-snow-bell',
    title: '圣诞雪人与金铃铛',
    category: 'festival',
    tag: '暖心圣诞',
    difficulty: '★★★★☆',
    desc: '32×32标准画幅。戴着正红圣诞帽的纯白雪人、红绿暖围巾与闪闪金铃铛。',
    matrix: decodeGrid(`
      17. 2MH7 MH1 2MH7 10. |
      16. 2MH7 3MH1 2MH7 9. |
      16. MH7 5MH1 MH7 9. |
      15. 2MH7 MF4 3MH1 2MH7 9. |
      14. 2MH7 3MF4 MH1 2MH7 10. |
      12. 3MH7 5MF4 2MH7 10. |
      11. 2MH7 8MF4 MH7 10. |
      10. 2MH7 9MF4 2MH7 9. |
      9. 2MH7 11MF4 MH7 9. |
      9. MH7 12MF4 MH7 9. |
      9. 2MH7 10MH1 2MH7 9. |
      9. MH7 3MH1 MH7 4MH1 MH7 3MH1 MH7 9. |
      9. MH7 2MH1 3MH7 2MH1 3MH7 2MH1 MH7 9. |
      9. MH7 3MH1 MH7 4MH1 MH7 3MH1 MH7 9. |
      9. MH7 12MH1 MH7 9. |
      9. MH7 6MH1 MA7 5MH1 MH7 9. |
      9. 2MH7 10MH1 2MH7 9. |
      8. 2MH7 2MF4 2MB5 3MF4 2MB5 2MF4 MH1 2MH7 8. |
      7. 2MH7 MH1 2MF4 2MB5 3MF4 2MB5 2MF4 2MH1 2MH7 7. |
      7. MH7 2MH1 2MF4 2MB5 3MF4 2MB5 2MF4 3MH1 MH7 7. |
      7. MH7 16MH1 MH7 7. |
      7. MH7 16MH1 MH7 7. |
      6. 2MH7 16MH1 2MH7 6. |
      6. MH7 18MH1 MH7 6. |
      6. 2MH7 16MH1 2MH7 6. |
      7. MH7 16MH1 MH7 7. |
      7. MH7 16MH1 MH7 7. |
      7. MH7 16MH1 MH7 7. |
      7. 2MH7 14MH1 2MH7 7. |
      8. 2MH7 12MH1 2MH7 8. |
      9. 2MH7 10MH1 2MH7 9. |
      10. 3MH7 6MH1 3MH7 10.
    `, 32, 32, C_MAP)
  },
  {
    id: 'double-pixel-heart',
    title: '霓虹像素双爱心',
    category: 'festival',
    tag: '浪漫情缘',
    difficulty: '★★★☆☆',
    desc: '32×32标准画幅。粉红与紫罗兰两颗心紧紧相扣交织，层次分明高光浪漫。',
    matrix: decodeGrid(`
      32. |
      32. |
      32. |
      32. |
      32. |
      32. |
      32. |
      6. 16MH7 10. |
      5. 2MH7 6ME4 2MH7 6ME4 2MH7 9. |
      4. 2MH7 16ME4 2MH7 8. |
      4. MH7 18ME4 MH7 8. |
      4. MH7 18ME4 7MH7 2. |
      4. MH7 13ME4 5MD20 MH7 5MD20 2MH7 1. |
      4. MH7 12ME4 13MD20 2MH7 |
      4. MH7 11ME4 15MD20 MH7 |
      4. MH7 11ME4 15MD20 MH7 |
      4. 2MH7 10ME4 15MD20 MH7 |
      5. 2MH7 9ME4 15MD20 MH7 |
      6. MH7 9ME4 15MD20 MH7 |
      6. 2MH7 9ME4 13MD20 2MH7 |
      7. 2MH7 8ME4 12MD20 2MH7 1. |
      8. 2MH7 8ME4 10MD20 2MH7 2. |
      9. 2MH7 6ME4 2MH7 9MD20 MH7 3. |
      10. 2MH7 4ME4 4MH7 7MD20 2MH7 3. |
      11. 2MH7 2ME4 2MH7 2. 2MH7 5MD20 2MH7 4. |
      12. 2MH7 ME4 MH7 4. MH7 4MD20 2MH7 5. |
      13. 3MH7 4. 2MH7 3MD20 MH7 6. |
      21. 2MH7 MD20 2MH7 6. |
      22. 3MH7 7. |
      32. |
      32. |
      32.
    `, 32, 32, C_MAP)
  },
  {
    id: 'magic-potion-bottle',
    title: '星愿魔法药水瓶',
    category: 'festival',
    tag: '奇幻潮流',
    difficulty: '★★★★☆',
    desc: '32×32标准画幅。圆球玻璃瓶装满深紫渐变星光药水，冒出金色神秘气泡。',
    matrix: decodeGrid(`
      15. 3MH7 14. |
      15. MH7 MA4 MH7 14. |
      15. 3MH7 14. |
      10. 11MH7 11. |
      10. MH7 9MG12 MH7 11. |
      10. MH7 9MG12 MH7 11. |
      10. 2MH7 7MC13 2MH7 11. |
      11. MH7 7MC13 MH7 12. |
      11. MH7 7MC13 MH7 12. |
      10. 2MH7 7MC13 3MH7 10. |
      9. 2MH7 3MC13 4MD14 3MC13 2MH7 9. |
      8. 2MH7 2MC13 8MD14 2MC13 2MH7 8. |
      7. 2MH7 2MC13 10MD14 2MC13 2MH7 7. |
      6. 2MH7 2MC13 12MD14 2MC13 2MH7 6. |
      6. MH7 3MC13 2MD14 3MA4 7MD14 3MC13 MH7 6. |
      6. MH7 2MC13 MD7 2MD14 3MA4 7MD14 MD7 2MC13 MH7 6. |
      6. MH7 2MC13 3MD14 3MA4 8MD14 2MC13 MH7 6. |
      5. 2MH7 2MC13 MD7 12MD14 MD7 2MC13 2MH7 5. |
      5. MH7 2MC13 2MD7 8MD14 MA4 3MD14 2MD7 2MC13 MH7 5. |
      5. 2MH7 2MC13 MD7 7MD14 3MA4 2MD14 MD7 2MC13 2MH7 5. |
      6. MH7 2MC13 2MD7 7MD14 MA4 2MD14 2MD7 2MC13 MH7 6. |
      6. MH7 2MC13 3MD7 8MD14 3MD7 2MC13 MH7 6. |
      6. MH7 3MC13 4MD7 4MD14 4MD7 3MC13 MH7 6. |
      6. 2MH7 2MC13 12MD7 2MC13 2MH7 6. |
      7. 2MH7 2MC13 10MD7 2MC13 2MH7 7. |
      8. 2MH7 3MC13 6MD7 3MC13 2MH7 8. |
      9. 2MH7 10MC13 2MH7 9. |
      10. 3MH7 6MC13 3MH7 10. |
      12. 8MH7 12. |
      32. |
      32. |
      32.
    `, 32, 32, C_MAP)
  },
  {
    id: 'carnival-balloon-dog',
    title: '波普艺术气球狗',
    category: 'festival',
    tag: '现代潮流',
    difficulty: '★★★★☆',
    desc: '32×32标准画幅。波普艺术经典造型！金黄高反光气球折叠成俏皮小狗。',
    matrix: decodeGrid(`
      32. |
      13. 3MH7 16. |
      12. 2MH7 MA4 2MH7 15. |
      11. 2MH7 3MA4 2MH7 14. |
      11. MH7 5MA4 MH7 14. |
      11. MH7 5MA4 MH7 14. |
      8. 4MH7 5MA4 MH7 14. |
      5. 4MH7 MA4 2MH7 5MA4 MH7 14. |
      4. 2MH7 11MA4 MH7 7. 3MH7 4. |
      4. MH7 11MA4 2MH7 6. 2MH7 MA4 2MH7 3. |
      4. MH7 10MA4 2MH7 7. MH7 3MA4 MH7 3. |
      4. MH7 9MA4 2MH7 7. 2MH7 3MA4 2MH7 2. |
      4. 2MH7 8MA4 MH7 8. MH7 5MA4 MH7 2. |
      5. 4MH7 MA4 MH7 3MA4 MH7 2. 3MH7 3. 2MH7 3MA4 2MH7 2. |
      8. 3MH7 3MA4 4MH7 MA4 4MH7 1. MH7 3MA4 MH7 3. |
      10. MH7 3MA4 MH7 7MA4 4MH7 MA4 2MH7 3. |
      10. MH7 12MA4 5MH7 4. |
      10. MH7 14MA4 MH7 6. |
      10. MH7 14MA4 MH7 6. |
      10. MH7 3MA4 MH7 10MA4 MH7 6. |
      10. MH7 3MA4 4MH7 MA4 3MH7 3MA4 MH7 6. |
      10. MH7 3MA4 MH7 2. 3MH7 1. MH7 3MA4 MH7 6. |
      10. MH7 3MA4 MH7 6. MH7 3MA4 MH7 6. |
      8. 3MH7 MA7 2MA4 MH7 4. 3MH7 MA7 2MA4 MH7 6. |
      7. 2MH7 5MA7 2MH7 2. 2MH7 5MA7 2MH7 5. |
      7. MH7 7MA7 MH7 2. MH7 7MA7 MH7 5. |
      7. 2MH7 5MA7 2MH7 2. 2MH7 5MA7 2MH7 5. |
      8. 3MH7 MA7 3MH7 4. 3MH7 MA7 3MH7 6. |
      10. 3MH7 8. 3MH7 8. |
      32. |
      32. |
      32.
    `, 32, 32, C_MAP)
  },
  {
    id: 'golden-coin-treasure',
    title: '满溢金币宝箱',
    category: 'festival',
    tag: '财富愿景',
    difficulty: '★★★★☆',
    desc: '32×32标准画幅。复古铁皮木质宝箱大开，堆满闪闪发光的纯金金币与红宝石。',
    matrix: decodeGrid(`
      32. |
      32. |
      32. |
      32. |
      32. |
      7. 19MH7 6. |
      6. 2MH7 17MG14 2MH7 5. |
      6. MH7 19MG14 MH7 5. |
      6. MH7 19MG14 MH7 5. |
      5. 2MH7 19MG14 2MH7 4. |
      5. MH7 21MG14 MH7 4. |
      5. MH7 21MG14 MH7 4. |
      4. 2MH7 21MG14 2MH7 3. |
      4. MH7 23MG14 MH7 3. |
      3. 2MH7 23MG14 MH7 3. |
      3. MH7 3MH4 4MA4 MA7 8MA4 MA7 4MA4 3MH4 MH7 3. |
      3. MH7 4MH4 16MA4 4MH4 MH7 3. |
      3. 2MH7 5MG12 12MA4 5MG12 2MH7 3. |
      4. MH7 22MG12 MH7 4. |
      4. MH7 22MG12 MH7 4. |
      4. MH7 22MG12 MH7 4. |
      4. MH7 22MG12 MH7 4. |
      4. MH7 22MG12 MH7 4. |
      4. MH7 22MG12 MH7 4. |
      4. MH7 22MG12 MH7 4. |
      4. MH7 22MG12 MH7 4. |
      4. MH7 22MG12 MH7 4. |
      4. 24MH7 4. |
      32. |
      32. |
      32. |
      32.
    `, 32, 32, C_MAP)
  },
  {
    id: 'peace-dove-olive',
    title: '和平白鸽与橄榄枝',
    category: 'festival',
    tag: '美好祝愿',
    difficulty: '★★★★☆',
    desc: '32×32标准画幅。展翅高飞纯白和平鸽，喙中衔着一枝翠绿苍翠橄榄叶。',
    matrix: decodeGrid(`
      32. |
      32. |
      32. |
      32. |
      32. |
      5. 5MH7 16. 3MH7 3. |
      4. 2MH7 3MH1 2MH7 12. 4MH7 MB5 2MH7 2. |
      4. MH7 5MH1 MH7 11. 2MH7 MB5 MH7 3MB5 MH7 2. |
      3. 2MH7 5MH1 2MH7 10. MH7 3MB5 MH1 MB5 2MH7 2. |
      2. 2MH7 7MH1 8MH7 3. 2MH7 MB5 2MB8 MH1 2MH7 2. |
      1. 2MH7 9MH1 2MH7 4MH1 5MH7 2MB8 4MH1 MH7 2. |
      1. MH7 17MH1 2MH7 3MB8 5MH1 2MH7 1. |
      1. 2MH7 12MH1 MH7 3MH1 MH7 2MB8 8MH1 MH7 1. |
      2. 3MH7 12MH1 MA7 12MH1 MH7 1. |
      4. 2MH7 22MH1 3MH7 1. |
      5. 2MH7 19MH1 3MH7 3. |
      6. 2MH7 17MH1 2MH7 5. |
      7. 2MH7 14MH1 3MH7 6. |
      7. MH7 16MH1 MH7 7. |
      7. 2MH7 14MH1 2MH7 7. |
      8. MH7 14MH1 MH7 8. |
      8. 2MH7 12MH1 2MH7 8. |
      9. MH7 12MH1 MH7 9. |
      9. 3MH7 8MH1 3MH7 9. |
      11. MH7 5MH1 4MH7 11. |
      11. MH7 6MH1 MH7 13. |
      10. 2MH7 6MH1 MH7 13. |
      10. MH7 7MH1 MH7 13. |
      10. MH7 7MH1 MH7 13. |
      10. 9MH7 13. |
      32. |
      32.
    `, 32, 32, C_MAP)
  },
  {
    id: 'mid-autumn-rabbit',
    title: '中秋月兔望月',
    category: 'festival',
    tag: '传统中秋',
    difficulty: '★★★★☆',
    desc: '32×32标准画幅。皎洁金黄大圆月、祥云环绕，软萌雪白玉兔依偎远眺。',
    matrix: decodeGrid(`
      32. |
      32. |
      32. |
      9. 14MH7 9. |
      9. MH7 6MH1 6MA3 3MH7 7. |
      7. 3MH7 MA4 5MH1 8MA3 2MH7 6. |
      6. 2MH7 3MA4 4MH1 10MA3 2MH7 5. |
      6. MH7 3MA4 MA3 4MH1 11MA3 MH7 5. |
      5. 2MH7 3MA4 MA3 4MH1 11MA3 2MH7 4. |
      4. 2MH7 3MA4 3MA3 3MH1 12MA3 MH7 4. |
      4. MH7 4MA4 2MA3 5MH1 11MA3 MH7 4. |
      4. MH7 4MA4 2MA3 3MH1 ME4 MH1 11MA3 MH7 4. |
      4. MH7 4MA4 2MA3 5MH1 11MA3 MH7 4. |
      4. MH7 4MA4 MA3 7MH1 10MA3 MH7 4. |
      4. MH7 4MA4 MA3 7MH1 10MA3 MH7 4. |
      4. MH7 4MA4 MA3 7MH1 10MA3 MH7 4. |
      4. MH7 4MA4 9MH1 9MA3 MH7 4. |
      4. MH7 4MA4 8MH1 9MA3 MA4 MH7 4. |
      4. MH7 3MA4 9MH1 9MA3 MA4 MH7 4. |
      1. 4MH7 MA4 MH1 2MA4 8MH1 8MA3 2MA4 MH7 4. |
      2MH7 14MH1 8MA3 MH1 MA4 5MH7 1. |
      MH7 11MH1 MA4 2MH1 4MA3 11MH1 2MH7 |
      31MH1 MH7 |
      MH7 31MH1 |
      2MH7 29MH1 MH7 |
      1. 5MH7 MH1 MH7 22MH1 2MH7 |
      5. 4MH7 11MH1 4MH7 MH1 6MH7 1. |
      8. 6MH7 MH1 6MH7 2. 3MH7 6. |
      13. 3MH7 16. |
      32. |
      32. |
      32.
    `, 32, 32, C_MAP)
  }
];
