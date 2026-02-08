import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';

// Set HOME for the current process to ensure Playwright can find browsers
process.env.HOME = process.env.USERPROFILE;

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function runTest() {
    console.log('🚀 Starting Automated Admin Panel Test...');

    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();

    try {
        // 1. Navigation
        console.log('📍 Navigating to Login Page (http://localhost:3000/admin/login)...');
        await page.goto('http://localhost:3000/admin/login', { waitUntil: 'networkidle' });

        // 2. Login
        console.log('🔐 Logging in...');
        await page.fill('input[type="email"]', 'admin@nepxcreation.com');
        await page.fill('input[type="password"]', 'admin123');
        await page.click('button[type="submit"]');

        // Wait for Dashboard to load
        await page.waitForURL('**/admin/dashboard', { timeout: 10000 });
        console.log('✅ Login Successful! Dashboard loaded.');

        // 3. Navigate to Services
        console.log('📍 Navigating to Services Page...');
        await page.goto('http://localhost:3000/admin/services', { waitUntil: 'networkidle' });

        // 4. Create Service
        console.log('➕ Testing CREATE operation...');
        await page.click('button:has-text("Add Service")');
        await page.fill('label:has-text("Title") + input', 'Automated Test Service');
        await page.fill('label:has-text("Description") + textarea', 'Testing service created by automation script.');

        // Add a feature
        await page.click('button:has-text("+ Add Feature")');
        const featureInputs = await page.$$('input[placeholder="Feature name"]');
        await featureInputs[featureInputs.length - 1].fill('Feature A');

        console.log('💾 Saving new service...');
        await page.click('button:has-text("Save Service")');

        // Wait for success toast or modal close
        await page.waitForSelector('text=Service created successfully', { timeout: 5000 }).catch(() => { });
        console.log('✅ Service Created.');

        // 5. Update Service
        console.log('✏️ Testing UPDATE operation...');
        // Find the newly created service row/card (it should be the last or have the title)
        await page.waitForSelector('text=Automated Test Service');
        const editButton = await page.locator('div:has-text("Automated Test Service")').locator('..').locator('button:has(.lucide-pencil)').first();
        await editButton.click();

        await page.fill('label:has-text("Title") + input', 'Automated Test Service UPDATED');
        await page.click('button:has-text("Save Service")');

        await page.waitForSelector('text=Automated Test Service UPDATED');
        console.log('✅ Service Updated.');

        // 6. Delete Service
        console.log('🗑️ Testing DELETE operation...');
        const deleteButton = await page.locator('div:has-text("Automated Test Service UPDATED")').locator('..').locator('button:has(.lucide-trash2)').first();

        // Set up dialog handler for confirmation
        page.once('dialog', dialog => dialog.accept());
        await deleteButton.click();

        await page.waitForSelector('text=Automated Test Service UPDATED', { state: 'detached' });
        console.log('✅ Service Deleted.');

        console.log('🎉 Automated Test Completed Successfully!');

    } catch (error) {
        console.error('❌ Test Failed:', error);
        // Take a screenshot on failure
        await page.screenshot({ path: 'test-failure.png' });
        console.log('📸 Failure screenshot saved to test-failure.png');
    } finally {
        await browser.close();
    }
}

runTest();
