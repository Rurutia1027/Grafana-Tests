import { Locator } from "@playwright/test";
import { test, expect } from '@grafana/plugin-e2e'; 

test.use({
    featureToggles: {
        canvasPanelPanZoom: true, 
    }
}); 

test.describe('Canvas Panel - Scene Tests', () => { 
    test.beforeEach(async ({ page, gotoDashboardPage }) => { 
        const dashboardPage = await gotoDashboardPage({}); 
        const panelEditPage = await dashboardPage.addPanel(); 
        await panelEditPage.setVisualization('Canvas'); 

        // Wait for canvas panel to load 
        await page.waitForSelector('[data-testid="canvas-scene-pan-zoom"]', {timeout: 10000}); 
    }); 

    test('should create and render canvas panel with scene elements', async ({ page }) => {
        const canvasElement = await page.getByRole('button', { name: 'Double click to set field' }); 
        await expect(canvasElement).toBeVisible(); 
    }); 

    test('should handle scene pan and zoom when enabled', async ({ page }) => { 
        // Feature toggle is enabled, pan/zoom functionality should be available
        const panZoomCheckbox = await page.getByLabel('Canvas Pan and zoom field').locator('label').nth(1); 
        await panZoomCheckbox.setChecked(true); 
        await expect(panZoomCheckbox).toBeChecked({ checked: true }); 
        
        const canvasElement = await page.getByRole('button', { name: 'Double click to set field' }); 
        const canvasSceneWrapper = await page.getByTestId('canvas-scene-wrapper'); 

        // Check if infinite viewer is present (pan/zoom feature)
        await page.waitForSelector('[data-testid="canvas-scene-pan-zoom"]', { timeout: 10000 }); 
        const infiniteViewer = page.locator('[data-testid="canvas-scene-pan-zoom"]'); 
        await infiniteViewer.waitFor({ state: 'visible', timeout: 5000 }); 
        await expect(await infiniteViewer.isVisible()).toBe(true); 
        await infiniteViewer.hover(); 

        const viewerBounds = await infiniteViewer.boundingBox(); 
        await expect(viewerBounds).toBeDefined(); 


        // Test pan functionality 
        const startX = viewerBounds!.x + 50; 
        const startY = viewerBounds!.y + 50; 
        const endX = viewerBounds!.x + 250; 
        const endY = viewerBounds!.y + 250; 
        await page.getByTestId('canvas-scene-pan-zoom'); 
        await page.mouse.move(startX, startY); 
        await page.mouse.down({ button: 'middle' }); 
        await page.mouse.move(endX, endY); 
        await page.mouse.up({ button: 'middle' }); 
        await expect(await isOutsideViewport(canvasElement, canvasSceneWrapper)).toBe(true); 

        // Test zoom reset with double-click 
        await page.mouse.dblclick(startX, startY); 

        // Verify canvas element is visible after pan/zoom operations 
        await expect(await isOutsideViewport(canvasElement, canvasSceneWrapper)).toBe(false); 
    })
}); 


async function isOutsideViewport(element: Locator, viewport: Locator): Promise<boolean> { 
    const elementBounds = await element.boundingBox(); 
    const viewportBounds = await viewport.boundingBox(); 
    return (
        elementBounds!.x + elementBounds!.width < viewportBounds!.x || 
        elementBounds!.x > viewportBounds!.x + viewportBounds!.width || 
        elementBounds!.y + elementBounds!.height < viewportBounds!.y || 
        elementBounds!.y > viewportBounds!.y + viewportBounds!.height
    ); 
}