// import { test, expect } from '@playwright/test';
// import * as grafanaE2E from '@grafana/plugin-e2e';

// console.log('Grafana E2E module loaded:', grafanaE2E);

// const BASE_URL = process.env.GRAFANA_URL || 'http://localhost:3000';

// test.describe('Grafana Plugin E2E Basic Tests', () => {
//   test('Module should be imported', async () => {
//     expect(grafanaE2E).toBeDefined();
//   });

//   test('Grafana homepage should load', async ({ page }) => {
//     await page.goto(BASE_URL);
//     await expect(page).toHaveTitle(/Grafana/);
//   });

//     test('Grafana 12.x login with debug', async ({ page }) => { 
//       const GRAFANA_URL = process.env.GRAFANA_URL ?? 'http://localhost:3000';
//       const ADMIN_USER = process.env.GRAFANA_ADMIN_USER ?? 'admin';
//       const ADMIN_PASS = process.env.GRAFANA_ADMIN_PASSWORD ?? 'admin';

//       await page.goto(GRAFANA_URL); 

//       // login page 
//       await page.fill('input[name="user"]', ADMIN_USER); 
//       await page.fill('input[name=password]', ADMIN_PASS); 
//       await page.click('button[type="submit"]');

//       await page.waitForTimeout(3000);
      
//       await page.screenshot({ path: 'debug-login-1.png', fullPage: true });
      
//       const skipButton = page.locator('button[aria-label="Skip change password button"]');

     

//       if (await skipButton.count() > 0) {
//         await skipButton.waitFor({ state: 'visible', timeout: 10000 });
//         await skipButton.click();
//       }

//       const toggleMenuButton = page.locator('button[aria-label="Toggle menu"]');
//       if (await toggleMenuButton.count() > 0) {
//           console.log('Selector exists');
//       } else {
//           console.log('Selector NOT found');
//       }
//     })
// });
