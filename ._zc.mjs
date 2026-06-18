import { chromium } from 'playwright-core';
const browser = await chromium.launch({ channel: 'chrome' });
const page = await browser.newPage({ viewport: { width: 1366, height: 860 }, deviceScaleFactor: 2 });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(5000);
// creative (violet variant) bottom-left aurora
await page.evaluate(()=>{const e=document.getElementById('creative');const r=e.getBoundingClientRect();window.scrollBy(0,r.top-40);});
await page.waitForTimeout(1200);
await page.screenshot({ path: '._zc.png', clip: { x: 0, y: 380, width: 600, height: 420 } });
await browser.close(); console.log('done');
