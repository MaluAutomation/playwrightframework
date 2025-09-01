const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { HomePage } = require('../pages/HomePage');
const { addProductPage } = require('../pages/addProductPage');
const languageData = require('../test-data/languages.json');

const languages = languageData.languages;
const translations = languageData.translations;

for (const lang of languages) {
  test(`Multilingual flow: Add Pizza to cart in ${lang}`, async ({ page }) => {
    const login = new LoginPage(page);
    const home = new HomePage(page);
    const addProduct = new addProductPage(page);
    const t = translations[lang];

    // Step 1: Login
    await login.gotoLoginPage();
    await login.selectLanguage(lang);
    await login.validateLabels({
      username: t.username,
      password: t.password,
      language: t.language
    });
    await login.loginDetails('testuser', 'testpass');
    await login.clickSubmitBtn();

    // Step 2: Homepage validations
    await home.validateHeading(translations);
    await home.validateMenuItems(translations);
    await home.clickPizzaItem(translations);

    // Step 3: Add Product page
    const pizzaLabel = t.menuItems.find(item => item.includes('🍕'));
    await addProduct.validateProductName({ [lang]: pizzaLabel });
    await addProduct.setQuantity(2);

    // Step 4: Validate localized alert on Add to Cart
  page.once('dialog', async (dialog) => {
  const expectedAlert = t.addedMsg; // ✅ flat string
  expect(dialog.message()).toBe(expectedAlert);
  await dialog.dismiss();
});

await addProduct.addToCart(); // trigger after listener is registered
  });
}