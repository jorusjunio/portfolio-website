import { chromium } from 'playwright-core';
const browser = await chromium.launch({ channel: 'chrome' });
const page = await browser.newPage({ viewport: { width: 1366, height: 860 } });
const errs=[]; page.on('pageerror',e=>errs.push(e.message));
await page.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(5200);
await page.screenshot({ path: '._t-hero.png' });
for (const id of ['about','projects','creative']) {
  await page.evaluate((s)=>{const e=document.getElementById(s);const r=e.getBoundingClientRect();window.scrollBy(0,r.top-40);},id);
  await page.waitForTimeout(1300);
  await page.screenshot({ path: `._t-${id}.png` });
}
console.log('ERRORS:', errs.length?errs.join(' | '):'none');
await browser.close();
