import { chromium } from 'playwright-core';
const browser = await chromium.launch({ channel: 'chrome' });
const page = await browser.newPage({ viewport: { width: 1366, height: 860 }, deviceScaleFactor: 2 });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(5000);
await page.evaluate(()=>{const e=document.getElementById('about');const r=e.getBoundingClientRect();window.scrollBy(0,r.top-40);});
await page.waitForTimeout(1200);
// clip an empty navy region (right side, mid)
await page.screenshot({ path: '._st.png', clip: { x: 760, y: 380, width: 520, height: 300 } });
await browser.close(); console.log('done');
