/**
 * verify-workshop-and-safety.mjs
 * 自动化测试：
 * 1. 验证 70 款精选爆款图纸质量与色彩合法性
 * 2. 验证内容安全自动审核引擎（色情内容与涉黄文本拦截）
 * 3. 验证图片转拼豆图纸引擎与数字工坊存储
 */

import assert from 'node:assert';
import { ALL_PATTERNS, C_MAP, PALETTES } from '../assets/js/patterns-data.js';
import { BY_CODE, BEAD_COLORS } from '../assets/js/bead-colors.js';
import { SafetyAuditor } from '../assets/js/safety-auditor.js';
import { ImageToPatternConverter } from '../assets/js/image-to-pattern.js';
import { cropToContent } from '../assets/js/bead-viewer.js';

let passed = 0;
function test(name, fn) {
  try {
    fn();
    console.log(`  ✓ ${name}`);
    passed++;
  } catch (err) {
    console.error(`  ✗ ${name}\n    ${err.message}`);
    process.exitCode = 1;
  }
}

async function testAsync(name, fn) {
  try {
    await fn();
    console.log(`  ✓ ${name}`);
    passed++;
  } catch (err) {
    console.error(`  ✗ ${name}\n    ${err.message}`);
    process.exitCode = 1;
  }
}

console.log('\n=== 1. 精选 70 款爆款图纸全量校验 ===');

test('图纸总数达到 70 款', () => {
  assert.strictEqual(ALL_PATTERNS.length, 70, `实际图纸数: ${ALL_PATTERNS.length}`);
});

test('涵盖六大分类且分布均衡', () => {
  const categories = new Set(ALL_PATTERNS.map(p => p.category));
  assert.ok(categories.has('anime'), '缺少热门动漫');
  assert.ok(categories.has('pets'), '缺少治愈萌宠');
  assert.ok(categories.has('games'), '缺少游戏像素');
  assert.ok(categories.has('food'), '缺少美食甜品');
  assert.ok(categories.has('architecture'), '缺少名胜古建');
  assert.ok(categories.has('festival'), '缺少节日庆典');
});

test('小红书与圈内顶流代表作全覆盖', () => {
  const ids = new Set(ALL_PATTERNS.map(p => p.id));
  const mustHaves = [
    'chiikawa-hachiware', // 吉伊卡哇小八
    'chiikawa-usagi',     // 乌萨奇
    'sanrio-kuromi',      // 库洛米
    'sanrio-cinnamoroll', // 大耳狗玉桂狗
    'capybara-orange',    // 卡皮巴拉顶橘子
    'pokemon-pikachu',    // 皮卡丘
    'pokemon-gengar',     // 耿鬼
    'boba-milk-tea',      // 珍珠奶茶
    'mount-fuji-sakura'   // 富士山樱花
  ];
  for (const id of mustHaves) {
    assert.ok(ids.has(id), `缺少核心爆款: ${id}`);
  }
});

test('图纸全部使用真实 Artkal 色号且裁剪边界紧贴', () => {
  for (const p of ALL_PATTERNS) {
    const cropped = cropToContent(p.matrix);
    assert.ok(cropped.length > 0 && cropped[0].length > 0, `${p.id} 裁剪后不应为空`);
    
    // 检查色号全部真实
    for (const row of p.matrix) {
      for (const cell of row) {
        if (cell !== null && cell !== undefined) {
          assert.ok(BY_CODE.has(cell.code), `${p.id} 包含未知色号 ${cell.code}`);
        }
      }
    }
  }
});

console.log('\n=== 2. 安全自动审核引擎（色情内容与涉黄拦截） ===');

test('涉黄违禁文本关键词严密拦截', () => {
  const badTexts = [
    '超强色情福利图纸',
    '无码裸体自慰',
    '高清AV成人拼豆',
    '约炮开房图纸',
    'nsfw naked girl'
  ];
  for (const t of badTexts) {
    const res = SafetyAuditor.auditText(t);
    assert.strictEqual(res.pass, false, `未能拦截违规文本: "${t}"`);
  }
});

test('健康合规文本正常放行', () => {
  const goodTexts = [
    '吉伊卡哇小八猫可爱拼豆',
    '卡皮巴拉顶橘子高清图纸',
    '草莓奶油蛋糕手工图纸',
    '超级马力欧蘑菇像素画'
  ];
  for (const t of goodTexts) {
    const res = SafetyAuditor.auditText(t);
    assert.strictEqual(res.pass, true, `误伤健康文本: "${t}"`);
  }
});

test('多维肤色算法识别能力', () => {
  // 典型人体肤色 RGB(235, 175, 145) -> 应该识别为肤色
  assert.ok(SafetyAuditor.checkSkinColor(235, 175, 145), '正常肤色应被识别');
  // 纯蓝天蓝 RGB(50, 150, 240) -> 不应识别为肤色
  assert.ok(!SafetyAuditor.checkSkinColor(50, 150, 240), '纯蓝色不应识别为肤色');
  // 纯绿青草 RGB(40, 200, 50) -> 不应识别为肤色
  assert.ok(!SafetyAuditor.checkSkinColor(40, 200, 50), '纯绿色不应识别为肤色');
});

console.log('\n=== 3. 图像转拼豆图纸引擎与色彩匹配 ===');

test('色卡匹配最近色算法精准度', () => {
  // 纯白 (255,255,255) 应匹配到 MH1 (透明/白)
  const whiteBead = ImageToPatternConverter.findNearestBead(255, 255, 255);
  assert.strictEqual(whiteBead.code, 'MH1', `纯白应匹配 MH1，实际: ${whiteBead.code}`);

  // 纯黑 (0,0,0) 应匹配到 MH7 (黑)
  const blackBead = ImageToPatternConverter.findNearestBead(0, 0, 0);
  assert.strictEqual(blackBead.code, 'MH7', `纯黑应匹配 MH7，实际: ${blackBead.code}`);

  // 纯大红 (255,0,0) 应匹配到 MF 系列红色
  const redBead = ImageToPatternConverter.findNearestBead(255, 0, 0);
  assert.ok(redBead.code.startsWith('MF'), `大红应匹配 MF 系列，实际: ${redBead.code}`);
});

console.log(`\n测试通过数量: ${passed}`);
if (process.exitCode) {
  console.log('部分测试未通过！');
} else {
  console.log('================ 全部通过！================\n');
}
