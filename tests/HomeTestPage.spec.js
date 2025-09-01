const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { HomePage } = require('../pages/HomePage');
const languageData = require('../test-data/languages.json');

const { languages, translations } = languageData;

for (const lang of languages) {
  test(`🌐 Validate homepage UI for ${lang}`, async ({ page }) => {
    const loginObj = new LoginPage(page);
    const homeObj = new HomePage(page);

    await loginObj.gotoLoginPage();
    await loginObj.selectLanguage(lang);
    await loginObj.loginDetails('malu', 'abcde');
    await loginObj.clickSubmitBtn();

    await page.waitForSelector('#welcome-text');

    await homeObj.validateHeading(translations);
    await homeObj.validateMenuItems(translations);
    await homeObj.clickPizzaItem(translations);

   const addToCartBtn = page.locator('[data-testid="add-to-cart"]');
await expect(addToCartBtn).toBeVisible(); // ✅ Stable across all languages
  });
}