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

test('verify imported dashboard exists', async ({ page }) => {
  await page.goto('/d/c46b2460-16b7-42a5-82d1-b07fbf431950');
  await expect(page.locator('text=Sandbox Panel Test')).toBeVisible();
});