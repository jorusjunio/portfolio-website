import { chromium } from 'playwright-core';
const browser = await chromium.launch({ channel: 'chrome' });
const page = await browser.newPage({ viewport: { width: 1366, height: 860 } });
const errs=[]; page.on('pageerror',e=>errs.push(e.message));
await page.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(4500);
// About at two scroll offsets to show parallax difference
const el = await page.evaluate(()=>{const e=document.getElementById('about');const r=e.getBoundingClientRect();return window.scrollY+r.top;});
await page.evaluate((y)=>window.scrollTo(0,y-120), el);
await page.waitForTimeout(1200); await page.screenshot({ path: '._pa-1.png' });
await page.evaluate((y)=>window.scrollTo(0,y+260), el);
await page.waitForTimeout(1200); await page.screenshot({ path: '._pa-2.png' });
// creative for color variety
await page.evaluate(()=>{const e=document.getElementById('creative');const r=e.getBoundingClientRect();window.scrollBy(0,r.top-60);});
await page.waitForTimeout(1200); await page.screenshot({ path: '._pa-creative.png' });
console.log('ERRORS:', errs.length?errs.join(' | '):'none');
await browser.close();
