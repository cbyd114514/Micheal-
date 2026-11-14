// verify-compliance.mjs — 隐私政策与全站合规同意机制专用自动化测试
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

console.log('⚖️ 开始执行合规与隐私保护机制自动化验证...\n');

let total = 0;
let passed = 0;

async function test(name, fn) {
  total++;
  try {
    await fn();
    passed++;
    console.log(`  ✓ [PASS] ${name}`);
  } catch (err) {
    console.error(`  ✗ [FAIL] ${name}`);
    console.error(`     -> ${err.message}`);
  }
}

// 模拟 DOM 与 LocalStorage
class MockLocalStorage {
  constructor() {
    this.store = {};
  }
  getItem(k) { return this.store[k] || null; }
  setItem(k, v) { this.store[k] = String(v); }
  removeItem(k) { delete this.store[k]; }
  clear() { this.store = {}; }
}

globalThis.localStorage = new MockLocalStorage();
globalThis.window = {
  location: { pathname: '/index.html', href: 'http://localhost/index.html' },
  matchMedia: () => ({ matches: false }),
  addEventListener: () => {},
  dispatchEvent: () => {},
};

// 1. 验证 privacy.html 的法务完备性
await test('privacy.html 文件存在且包含法定核心要素', () => {
  const pPath = path.join(ROOT, 'privacy.html');
  assert.ok(fs.existsSync(pPath), 'privacy.html 必须存在');
  const html = fs.readFileSync(pPath, 'utf8');

  // 必须引用的法规与核心声明
  assert.ok(html.includes('个人信息保护法') || html.includes('PIPL'), '必须包含个人信息保护法');
  assert.ok(html.includes('网络安全法'), '必须包含网络安全法');
  assert.ok(html.includes('纯本地') && html.includes('零隐私上传'), '必须明示纯本地计算与零隐私上传承诺');
  assert.ok(html.includes('淫秽') || html.includes('色情'), '必须包含严禁淫秽色情内容禁止规范');
  assert.ok(html.includes('知识产权') && html.includes('24 小时'), '必须包含知识产权声明及侵权下架联络时效');
  assert.ok(html.includes('未成年人') && html.includes('监护'), '必须包含未成年人保护及高温熨烫防烫伤指引');
});

// 2. 验证 chrome.js 中导出的合规检测与交互逻辑
await test('chrome.js 导出 isComplianceAgreed 与 openComplianceModal 接口', async () => {
  const chrome = await import('../assets/js/chrome.js');
  assert.strictEqual(typeof chrome.isComplianceAgreed, 'function');
  assert.strictEqual(typeof chrome.openComplianceModal, 'function');
  assert.strictEqual(typeof chrome.closeComplianceModal, 'function');
});

// 3. 验证未同意状态与同意后状态切换
await test('未签署时 isComplianceAgreed() 返回 false，签署后返回 true', async () => {
  const chrome = await import('../assets/js/chrome.js');
  localStorage.clear();
  assert.strictEqual(chrome.isComplianceAgreed(), false);

  localStorage.setItem('pindou_compliance_agreed', 'true');
  assert.strictEqual(chrome.isComplianceAgreed(), true);
  localStorage.clear();
});

// 4. 验证 HTML 页面中均常驻隐私政策链接与合规入口
await test('各主要页面均具备合规指引或调用 injectChrome', () => {
  const pages = ['index.html', 'create.html', 'inspiration.html', 'whiteboard.html', 'tutorial.html'];
  for (const p of pages) {
    const content = fs.readFileSync(path.join(ROOT, p), 'utf8');
    assert.ok(content.includes('injectChrome'), `${p} 必须调用 injectChrome 注入全站合规拦截`);
  }
});

// 5. 验证 inspiration.html 用户上传图纸包含合规承诺
await test('inspiration.html 包含用户上传合规承诺勾选框与校验拦截', () => {
  const content = fs.readFileSync(path.join(ROOT, 'inspiration.html'), 'utf8');
  assert.ok(content.includes('upload-compliance-check'), '上传弹窗必须包含合规复选框 upload-compliance-check');
  assert.ok(content.includes('隐私政策与合规协议'), '必须引导查阅隐私政策与合规协议');
  assert.ok(content.includes('complianceCheck.checked'), '发布前必须校验合规复选框');
});

// 6. 验证 theme.css 中包含合规弹窗与锁定样式
await test('theme.css 包含合规遮罩及锁定状态样式定义', () => {
  const css = fs.readFileSync(path.join(ROOT, 'assets/css/theme.css'), 'utf8');
  assert.ok(css.includes('compliance-locked'), '必须包含 body.compliance-locked 样式');
  assert.ok(css.includes('compliance-backdrop'), '必须包含 .compliance-backdrop');
  assert.ok(css.includes('compliance-modal-dialog'), '必须包含 .compliance-modal-dialog');
  assert.ok(css.includes('compliance-shake'), '必须包含未勾选警示动画 compliance-shake');
});

console.log(`\n================ 合规验证测试报告 ================`);
console.log(`总项数: ${total} | 通过: ${passed} | 失败: ${total - passed}`);
console.log(`==================================================\n`);

if (total !== passed) {
  process.exit(1);
}
