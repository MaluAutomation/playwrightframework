const { expect } = require('@playwright/test');

exports.addProductPage = class addProductPage {
  constructor(page) {
    this.page = page; 
    this.productName = page.locator('[data-testid="product-name"]');
    this.quantityInput = page.locator('[data-testid="quantity-input"]');
    this.addToCartBtn = page.locator('[data-testid="add-to-cart"]');
    this.backBtn = page.locator('[data-testid="back-button"]');
    this.logoutBtn = page.locator('[data-testid="logout-button"]');
  }

  async validateProductName(expectedTranslations) {
    const selectedLang = await this.page.evaluate(() => localStorage.getItem('selectedLanguage'));
    const expectedName = expectedTranslations[selectedLang];
    const actualName = await this.productName.textContent();
    expect(actualName.trim()).toBe(expectedName);
  }

  async setQuantity(qty) {
    await this.quantityInput.fill(String(qty));
  }

  async addToCart() {
    await this.addToCartBtn.click();
  }

  async goBack() {
    await this.backBtn.click();
  }

  async logout() {
    await this.logoutBtn.click();
  }
};