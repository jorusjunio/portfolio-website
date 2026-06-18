import { chromium } from 'playwright-core';
const browser = await chromium.launch({ channel: 'chrome' });
const page = await browser.newPage({ viewport: { width: 1366, height: 860 } });
const errs=[]; page.on('pageerror',e=>errs.push(e.message));
await page.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(4500);
// Scroll to the Tools/Services boundary (the circled divider area)
await page.evaluate(()=>{const e=document.getElementById('services');const r=e.getBoundingClientRect();window.scrollBy(0, r.top - 420);});
await page.waitForTimeout(1300);
await page.screenshot({ path: '._sm-seam-a.png' });
// second frame ~1.4s later, same scroll -> should differ if animating
await page.waitForTimeout(1400);
await page.screenshot({ path: '._sm-seam-b.png' });
console.log('ERRORS:', errs.length?errs.join(' | '):'none');
await browser.close();
