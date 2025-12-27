import { test, expect } from '@grafana/plugin-e2e'; 
import panelSandboxDashboard from '../dashboards/PanelSandboxDashboard.json'; 
const DASHBOARD_ID = 'c46b2460-16b7-42a5-82d1-b07fbf431950';

test.beforeAll(async ({ request }) => {
  await request.post('/api/dashboards/import', {
    headers: {
      Authorization:
        'Basic ' + Buffer.from('admin:admin').toString('base64'),
    },
    data: {
      dashboard: panelSandboxDashboard,
      overwrite: true,
    },
  });
});

test.describe('Panels test: Panel sandbox',
    {
        tag: ['@panels'], 
    },
    () => { 
        test.describe('Sandbox disabled', () => { 
            test.beforeEach(async ({ page }) => {
                await page.addInitScript(() => {
                    window.localStorage.setItem('grafana.featureToggles', 'pluginsFrontendSandbox=0');
                });
                await page.reload(); 
            }); 

            test('Add iframes to body', async ({ page, gotoDashboardPage }) => {
                await gotoDashboardPage({
                    uid: DASHBOARD_ID
                }); 
            
                // this button adds iframes to the body 
                await page.locator('[data-testid="button-create-iframes"]').click(); 
                const iframeIds = [
                    'createElementIframe',
                    'innerHTMLIframe',
                    'appendIframe',
                    'prependIframe',
                    'afterIframe',
                    'beforeIframe',
                    'outerHTMLIframe',
                    'parseFromStringIframe',
                    'insertBeforeIframe',
                    'replaceChildIframe',
                ]; 

                for (const id of iframeIds) { 
                    await expect(page.locator(`#${id}`)).toBeVisible(); 
                }
            }); 
        }); 
    }
); 