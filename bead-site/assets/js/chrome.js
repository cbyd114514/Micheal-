// chrome.js — 全站统一主题控制、页头导航、页脚与赞助弹窗
// 视觉样式统一由 assets/css/theme.css 提供，此处只负责结构与行为。

/* ------------------------------------------------------------------ *
 * 主题
 * ------------------------------------------------------------------ */
export function initTheme() {
  const savedTheme = localStorage.getItem('site-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', initialTheme);
  updateThemeButton();
}

export function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const target = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', target);
  localStorage.setItem('site-theme', target);
  updateThemeButton();
  window.dispatchEvent(new Event('site:themechange'));
}

export function currentTheme() {
  return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
}

function updateThemeButton() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const label = isDark ? '亮色模式' : '暗色模式';
  const iconSvg = isDark
    ? `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`
    : `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
  document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
    btn.innerHTML = `<span class="theme-btn-icon" style="display:inline-flex;align-items:center;">${iconSvg}</span><span>${label}</span>`;
  });
}

/* ------------------------------------------------------------------ *
 * 赞助支持弹窗
 * ------------------------------------------------------------------ */
function injectSponsorModal() {
  if (document.getElementById('sponsor-modal')) return;

  // 子目录页面（如 inspiration/xxx.html）需要回退到站点根
  const BASE = location.pathname.includes('/inspiration/') ? '../' : '';

  const modalHtml = `
    <div id="sponsor-modal" class="modal-backdrop sponsor-backdrop" role="dialog" aria-modal="true" aria-label="赞助支持">
      <div class="modal-dialog sponsor-dialog">
        <button id="sponsor-close-btn" class="modal-close-btn" type="button" aria-label="关闭">&times;</button>

        <div id="sponsor-step-pay">
          <div style="text-align:center;margin-bottom:18px;">
            <span class="section-label section-label--plain" style="margin-bottom:12px;">Support</span>
            <h3 style="margin:0;font-size:21px;">赞助支持</h3>
            <p class="muted" style="font-size:13.5px;margin:10px auto 0;max-width:380px;line-height:1.7;">
              如果拼豆工具为你的创作提供了帮助，欢迎赞助支持服务器维护与功能开发。
            </p>
            <div class="sponsor-amount-badge">赞助金额：<strong>¥ 5.00</strong></div>
          </div>

          <div class="sponsor-tabs">
            <button id="tab-wechat" class="sponsor-tab active" type="button">微信支付</button>
            <button id="tab-alipay" class="sponsor-tab" type="button">支付宝</button>
          </div>

          <div class="sponsor-qr-box">
            <div id="qr-wechat" class="qr-panel active" style="text-align:center;">
              <img src="${BASE}assets/images/wechat-pay.png" alt="微信收款码" style="width:180px;height:180px;object-fit:contain;border-radius:10px;background:#fff;padding:6px;box-shadow:var(--shadow-sm);" onerror="this.parentElement.innerHTML='&lt;div style=&quot;padding:30px 10px;color:var(--muted-foreground);font-size:13px;&quot;&gt;请将微信收款码放置于&lt;br&gt;&lt;code&gt;assets/images/wechat-pay.png&lt;/code&gt;&lt;/div&gt;'" />
              <p style="margin:10px 0 0;font-size:12px;color:#16a34a;font-weight:600;">微信扫码赞助</p>
            </div>
            <div id="qr-alipay" class="qr-panel" style="text-align:center;">
              <img src="${BASE}assets/images/alipay.png" alt="支付宝收款码" style="width:180px;height:180px;object-fit:contain;border-radius:10px;background:#fff;padding:6px;box-shadow:var(--shadow-sm);" onerror="this.parentElement.innerHTML='&lt;div style=&quot;padding:30px 10px;color:var(--muted-foreground);font-size:13px;&quot;&gt;请将支付宝收款码放置于&lt;br&gt;&lt;code&gt;assets/images/alipay.png&lt;/code&gt;&lt;/div&gt;'" />
              <p style="margin:10px 0 0;font-size:12px;color:var(--accent);font-weight:600;">支付宝扫码赞助</p>
            </div>
          </div>

          <div style="margin-top:18px;">
            <button id="btn-confirm-sponsored" class="btn btn-primary btn-block" type="button">已完成赞助</button>
          </div>
        </div>

        <div id="sponsor-step-thanks" style="display:none;text-align:center;padding:18px 10px;">
          <h3 style="font-size:21px;margin:0 0 10px;">感谢支持</h3>
          <div class="sponsor-thanks-card">
            <p style="margin:0;font-size:14px;line-height:1.75;">已收到你的赞助，感谢对本站的支持，祝你拼豆创作愉快。</p>
          </div>
          <button id="btn-close-thanks" class="btn btn-primary" type="button" style="margin-top:20px;">关闭</button>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHtml);

  const modal = document.getElementById('sponsor-modal');
  const closeBtn = document.getElementById('sponsor-close-btn');
  const tabWechat = document.getElementById('tab-wechat');
  const tabAlipay = document.getElementById('tab-alipay');
  const qrWechat = document.getElementById('qr-wechat');
  const qrAlipay = document.getElementById('qr-alipay');
  const btnConfirm = document.getElementById('btn-confirm-sponsored');
  const stepPay = document.getElementById('sponsor-step-pay');
  const stepThanks = document.getElementById('sponsor-step-thanks');
  const btnCloseThanks = document.getElementById('btn-close-thanks');

  const close = () => modal.classList.remove('open');
  closeBtn?.addEventListener('click', close);
  modal?.addEventListener('click', e => {
    if (e.target === modal) close();
  });

  tabWechat?.addEventListener('click', () => {
    tabWechat.classList.add('active');
    tabAlipay.classList.remove('active');
    qrWechat.classList.add('active');
    qrAlipay.classList.remove('active');
  });

  tabAlipay?.addEventListener('click', () => {
    tabAlipay.classList.add('active');
    tabWechat.classList.remove('active');
    qrAlipay.classList.add('active');
    qrWechat.classList.remove('active');
  });

  btnConfirm?.addEventListener('click', () => {
    stepPay.style.display = 'none';
    stepThanks.style.display = 'block';
  });

  btnCloseThanks?.addEventListener('click', () => {
    close();
    setTimeout(() => {
      stepPay.style.display = 'block';
      stepThanks.style.display = 'none';
    }, 250);
  });
}

/* ------------------------------------------------------------------ *
 * 隐私政策与全站合规同意弹窗 (Compliance Consent Gate)
 * ------------------------------------------------------------------ */
export function isComplianceAgreed() {
  try {
    return localStorage.getItem('pindou_compliance_agreed') === 'true';
  } catch (e) {
    return false;
  }
}

export function openComplianceModal({ force = false, viewOnly = false } = {}) {
  injectComplianceModal();
  const modal = document.getElementById('compliance-modal');
  if (!modal) return;

  const closeBtn = document.getElementById('compliance-close-btn');
  const mainBox = document.getElementById('compliance-main-box');
  const disagreeBox = document.getElementById('compliance-disagree-box');
  const statusTip = document.getElementById('compliance-status-tip');
  const checkbox = document.getElementById('compliance-agree-checkbox');

  if (mainBox) mainBox.style.display = 'block';
  if (disagreeBox) disagreeBox.style.display = 'none';

  const agreed = isComplianceAgreed();

  if (viewOnly || agreed) {
    if (closeBtn) closeBtn.style.display = 'grid';
    if (checkbox) checkbox.checked = true;
    if (statusTip) {
      const agreedTime = localStorage.getItem('pindou_compliance_agreed_time');
      const timeStr = agreedTime ? new Date(agreedTime).toLocaleDateString('zh-CN') : '已完成';
      statusTip.textContent = `（您已于 ${timeStr} 签署同意，可再次查阅）`;
      statusTip.style.display = 'inline';
    }
    document.body.classList.remove('compliance-locked');
  } else {
    if (closeBtn) closeBtn.style.display = 'none';
    if (checkbox) checkbox.checked = false;
    if (statusTip) statusTip.style.display = 'none';
    document.body.classList.add('compliance-locked');
  }

  modal.classList.add('open');
}

export function closeComplianceModal() {
  const modal = document.getElementById('compliance-modal');
  if (modal) modal.classList.remove('open');
  if (isComplianceAgreed()) {
    document.body.classList.remove('compliance-locked');
  }
}

function injectComplianceModal() {
  if (document.getElementById('compliance-modal')) return;

  const BASE = location.pathname.includes('/inspiration/') ? '../' : '';

  const modalHtml = `
    <div id="compliance-modal" class="modal-backdrop compliance-backdrop" role="dialog" aria-modal="true" aria-label="服务协议与隐私合规指引">
      <div class="modal-dialog compliance-modal-dialog">
        <button id="compliance-close-btn" class="modal-close-btn" type="button" aria-label="关闭" style="display:none;">&times;</button>

        <div id="compliance-main-box">
          <div style="text-align:center;">
            <div class="compliance-header-tag">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:2px;"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              <span>合规与隐私指引</span>
            </div>
            <h3 class="compliance-modal-title">欢迎使用 Micheal 的拼豆网</h3>
            <p class="compliance-modal-sub">
              根据《中华人民共和国个人信息保护法》与《网络安全法》等法规要求，为保障您的合法权益，请在使用前阅读并同意服务与隐私说明。
              <span id="compliance-status-tip" style="color:var(--accent);font-weight:600;display:none;"></span>
            </p>
          </div>

          <div class="compliance-grid">
            <div class="compliance-card">
              <span class="compliance-card-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              </span>
              <div class="compliance-card-title">纯本地运算</div>
              <p class="compliance-card-desc">图片转图纸在浏览器本地完成，绝不上传云端，零隐私泄露。</p>
            </div>
            <div class="compliance-card">
              <span class="compliance-card-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg>
              </span>
              <div class="compliance-card-title">内容安全守则</div>
              <p class="compliance-card-desc">严禁涉黄、低俗、暴力恐怖与侵权内容，系统内置 AI 审核。</p>
            </div>
            <div class="compliance-card">
              <span class="compliance-card-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>
              </span>
              <div class="compliance-card-title">非商业手作</div>
              <p class="compliance-card-desc">图库资源仅限个人研习交流，尊重原作者合法著作权。</p>
            </div>
          </div>

          <div class="compliance-summary-box">
            <p><strong>1. 数据零上传承诺：</strong>本工具为纯前端 Web 离线计算工具，图片解码、像素化与色卡比对完全在您的设备本地内存进行，不保存或传输您的图片。</p>
            <p><strong>2. 严格恪守内容安全：</strong>禁止生成或传播任何色情裸露、暴力恐怖或违法违规图样。若违规将被系统拦截阻断。</p>
            <p><strong>3. 知识产权与免责：</strong>精选图纸仅供手作学习参考。拼豆熨烫作业涉及高温，未成年人需在监护人陪同指导下进行。</p>
            <p><strong>4. 完整条款：</strong>请参阅 <a href="${BASE}privacy.html" target="_blank" rel="noopener">《拼豆网隐私政策与合规协议全文》</a>。</p>
          </div>

          <label class="compliance-check-label" id="compliance-check-container">
            <input type="checkbox" id="compliance-agree-checkbox" checked />
            <span>我已认真阅读并同意遵守上述《用户服务协议》、《隐私政策》及国家互联网内容安全管理规定。</span>
          </label>

          <div class="compliance-actions-row">
            <button id="btn-disagree-compliance" class="btn btn-outline" type="button">暂不同意</button>
            <button id="btn-agree-compliance" class="btn btn-primary" type="button">同意并开始使用</button>
          </div>
        </div>

        <div id="compliance-disagree-box" style="display:none;text-align:center;padding:12px 6px;">
          <div style="margin-bottom:12px;color:var(--accent);display:flex;justify-content:center;">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg>
          </div>
          <h4 style="margin:0 0 10px;font-size:18px;">依据法规要求提示</h4>
          <p class="muted" style="font-size:13.5px;line-height:1.75;margin:0 auto 20px;max-width:440px;">
            依据相关网络信息服务法律法规，使用在线创作、图片转图纸与设计保存功能需确认隐私与合规条款。若您暂不同意，您可以先以访客身份浏览公开图纸与教程。
          </p>
          <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;">
            <button id="btn-reconsider-compliance" class="btn btn-primary" type="button">返回签署协议</button>
            <button id="btn-exit-site" class="btn btn-outline" type="button">以访客身份浏览</button>
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHtml);

  const modal = document.getElementById('compliance-modal');
  const closeBtn = document.getElementById('compliance-close-btn');
  const checkbox = document.getElementById('compliance-agree-checkbox');
  const checkContainer = document.getElementById('compliance-check-container');
  const btnAgree = document.getElementById('btn-agree-compliance');
  const btnDisagree = document.getElementById('btn-disagree-compliance');
  const mainBox = document.getElementById('compliance-main-box');
  const disagreeBox = document.getElementById('compliance-disagree-box');
  const btnReconsider = document.getElementById('btn-reconsider-compliance');
  const btnExit = document.getElementById('btn-exit-site');

  closeBtn?.addEventListener('click', () => {
    closeComplianceModal();
  });

  btnAgree?.addEventListener('click', () => {
    if (!checkbox.checked) {
      checkContainer?.classList.remove('compliance-shake');
      void checkContainer?.offsetWidth; // trigger reflow
      checkContainer?.classList.add('compliance-shake');
      return;
    }
    localStorage.setItem('pindou_compliance_agreed', 'true');
    localStorage.setItem('pindou_compliance_agreed_time', new Date().toISOString());
    closeComplianceModal();
  });

  btnDisagree?.addEventListener('click', () => {
    if (mainBox) mainBox.style.display = 'none';
    if (disagreeBox) disagreeBox.style.display = 'block';
  });

  btnReconsider?.addEventListener('click', () => {
    if (disagreeBox) disagreeBox.style.display = 'none';
    if (mainBox) mainBox.style.display = 'block';
  });

  btnExit?.addEventListener('click', () => {
    // 允许以访客模式浏览网页公开内容，解除死锁遮罩
    sessionStorage.setItem('pindou_visitor_mode', 'true');
    document.body.classList.remove('compliance-locked');
    modal.classList.remove('open');
  });
}

/* ------------------------------------------------------------------ *
 * 滚动淡入
 * ------------------------------------------------------------------ */
function initReveal() {
  const targets = document.querySelectorAll('.reveal:not(.is-visible)');
  if (!targets.length) return;
  if (!('IntersectionObserver' in window)) {
    targets.forEach(el => el.classList.add('is-visible'));
    return;
  }
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach((entry, i) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        setTimeout(() => el.classList.add('is-visible'), Math.min(i, 6) * 90);
        observer.unobserve(el);
      });
    },
    { rootMargin: '-60px 0px', threshold: 0.15 }
  );
  targets.forEach(el => observer.observe(el));
}

/* ------------------------------------------------------------------ *
 * 页头 / 页脚
 * ------------------------------------------------------------------ */
const NAV_ITEMS = [
  { key: 'home', href: 'index.html', label: '首页' },
  { key: 'create', href: 'create.html', label: '创作工坊' },
  { key: 'whiteboard', href: 'whiteboard.html', label: '白板画板' },
  { key: 'inspiration', href: 'inspiration.html', label: '灵感图库' },
  { key: 'tutorial', href: 'tutorial.html', label: '制作教程' },
];

function resolveActivePage(activePage) {
  const href = (window.location.href || window.location.pathname || '').toLowerCase();
  if (href.includes('whiteboard')) return 'whiteboard';
  if (href.includes('create')) return 'create';
  if (href.includes('inspiration')) return 'inspiration';
  if (href.includes('tutorial')) return 'tutorial';
  if (href.endsWith('/') || href.includes('index')) return 'home';
  return activePage;
}

export function injectChrome(activePage = '') {
  initTheme();

  const page = resolveActivePage(activePage);
  const header = document.getElementById('site-header');

  if (header) {
    const desktopLinks = NAV_ITEMS.map(
      item =>
        `<a href="${item.href}" class="nav-link ${page === item.key ? 'active' : ''}">${item.label}</a>`
    ).join('');

    const mobileLinks = NAV_ITEMS.map(
      item =>
        `<li><a href="${item.href}" class="nav-mobile-link ${page === item.key ? 'active' : ''}">${item.label}</a></li>`
    ).join('');

    header.innerHTML = `
      <header class="site-nav-header">
        <div class="nav-container">
          <a href="index.html" class="nav-brand">
            <span class="nav-brand-mark" aria-hidden="true">M</span>
            <span>Micheal 的拼豆网</span>
          </a>

          <nav class="nav-desktop-menu" aria-label="主导航">${desktopLinks}</nav>

          <div class="nav-actions">
            <button class="sponsor-btn-compact" id="btn-open-sponsor" type="button">赞助支持</button>
            <button class="theme-toggle-btn" id="theme-toggle-btn" type="button" aria-label="切换主题">暗色模式</button>
            <button class="nav-hamburger-btn" id="nav-hamburger-btn" type="button" aria-label="切换菜单" aria-expanded="false">
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>

        <div class="nav-mobile-dropdown" id="nav-mobile-dropdown">
          <ul class="nav-mobile-list">
            ${mobileLinks}
            <li><a href="javascript:void(0)" class="nav-mobile-link" id="mobile-sponsor-btn">赞助支持</a></li>
            <li><a href="privacy.html" class="nav-mobile-link" id="mobile-privacy-link">隐私与合规说明</a></li>
          </ul>
        </div>
      </header>
    `;

    document.getElementById('theme-toggle-btn')?.addEventListener('click', toggleTheme);

    const hamburgerBtn = document.getElementById('nav-hamburger-btn');
    const mobileDropdown = document.getElementById('nav-mobile-dropdown');

    hamburgerBtn?.addEventListener('click', e => {
      e.stopPropagation();
      const isOpen = mobileDropdown.classList.toggle('open');
      hamburgerBtn.classList.toggle('active', isOpen);
      hamburgerBtn.setAttribute('aria-expanded', String(isOpen));
    });

    document.addEventListener('click', e => {
      if (mobileDropdown && !mobileDropdown.contains(e.target) && !hamburgerBtn?.contains(e.target)) {
        mobileDropdown.classList.remove('open');
        hamburgerBtn?.classList.remove('active');
        hamburgerBtn?.setAttribute('aria-expanded', 'false');
      }
    });

    injectSponsorModal();
    const openSponsor = () => document.getElementById('sponsor-modal')?.classList.add('open');
    document.getElementById('btn-open-sponsor')?.addEventListener('click', openSponsor);
    document.getElementById('mobile-sponsor-btn')?.addEventListener('click', () => {
      mobileDropdown?.classList.remove('open');
      hamburgerBtn?.classList.remove('active');
      openSponsor();
    });
  }

  const footer = document.getElementById('site-footer');
  if (footer) {
    footer.innerHTML = `
      <footer class="site-footer">
        <div class="site-footer-inner">
          <div>
            <div class="site-footer-brand">Micheal 的拼豆网</div>
            <p style="margin-top:6px;">在线拼豆图纸生成器 · 上传图片即可获得色号图纸与用量清单</p>
          </div>
          <nav class="site-footer-links" aria-label="页脚导航">
            <a href="create.html">创作工坊</a>
            <a href="whiteboard.html">白板画板</a>
            <a href="inspiration.html">灵感图库</a>
            <a href="tutorial.html">制作教程</a>
            <a href="privacy.html" id="footer-privacy-link">隐私与合规说明</a>
          </nav>
          <p>© 2026 Micheal · 纯本地沙盒运算 · 零个人信息上传</p>
        </div>
      </footer>
    `;
  }

  // 绑定合规协议弹窗查看事件
  const handlePrivacyClick = (e) => {
    if (e.button === 0 && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
      e.preventDefault();
      openComplianceModal({ viewOnly: true });
    }
  };
  document.getElementById('footer-privacy-link')?.addEventListener('click', handlePrivacyClick);
  document.getElementById('mobile-privacy-link')?.addEventListener('click', (e) => {
    document.getElementById('nav-mobile-dropdown')?.classList.remove('open');
    document.getElementById('nav-hamburger-btn')?.classList.remove('active');
    handlePrivacyClick(e);
  });

  // 全站注入合规模态框并执行拦截检查
  injectComplianceModal();
  const isPrivacyPage = (window.location.pathname || '').toLowerCase().includes('privacy');
  const isVisitorMode = sessionStorage.getItem('pindou_visitor_mode') === 'true';
  const isCreatePage = (window.location.pathname || '').toLowerCase().includes('create');

  if (!isComplianceAgreed() && !isPrivacyPage) {
    if (!isVisitorMode || isCreatePage) {
      openComplianceModal({ force: true });
    }
  }

  initReveal();
  window.addEventListener('site:themechange', () => {
    setTimeout(initReveal, 40);
  });
}
