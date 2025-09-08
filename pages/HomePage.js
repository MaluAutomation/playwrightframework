const { expect } = require('@playwright/test');
const { HomePageSection } = require('../sections/HomePageSection');


exports.HomePage = class HomePage {
  constructor(page) {
    this.page = page;
    this.section = new HomePageSection(page); 
    this.headingSelector = '#welcome-text';
    this.menuItemSelector = '.menu-item'; 

  }

  async getSelectedLanguage() {
    return await this.page.evaluate(() => localStorage.getItem('selectedLanguage'));
  }

  async validateHeading(translations) {
    const selectedLanguage = await this.getSelectedLanguage();
    const expectedHeading = translations[selectedLanguage]?.welcome;

    if (!expectedHeading) {
      throw new Error(`Missing 'welcome' translation for language: ${selectedLanguage}`);
    }

    const actualHeading = await this.page.locator(this.headingSelector).innerText();
    console.log(`✅ Validating heading for ${selectedLanguage}: ${actualHeading.trim()}`);
    expect(actualHeading.trim()).toContain(expectedHeading);
  }


    async validateMenuItems(translations) {
    const selectedLanguage = await this.page.evaluate(() => localStorage.getItem('selectedLanguage'));
    const expectedItems = translations[selectedLanguage]?.menuItems;

    if (!expectedItems || expectedItems.length === 0) {
      throw new Error(`Missing or empty 'menuItems' translation for language: ${selectedLanguage}`);
    }

    const actualItems = await this.section.getMenuItemTexts(); // Calling the method
    const trimmedActual = actualItems.map(item => item.trim());

    console.log(`✅ Validating menu items for ${selectedLanguage}`);
    console.log(`Expected:`, expectedItems);
    console.log(`Actual:`, trimmedActual);

    expect(trimmedActual).toEqual(expectedItems);
  }
  async clickPizzaItem(translations) {
    const selectedLanguage = await this.getSelectedLanguage();
    const menuItems = translations[selectedLanguage]?.menuItems;

    if (!menuItems || menuItems.length === 0) {
      throw new Error(`❌ No menu items found for language: ${selectedLanguage}`);
    }

    const pizzaLabel = menuItems.find(item => item.includes('🍕'));

    if (!pizzaLabel) {
      throw new Error(`🍕 No Pizza item found in menu for language: ${selectedLanguage}`);
    }

    const pizzaButton = this.page.locator('.menu-item', { hasText: pizzaLabel });
    await expect(pizzaButton).toBeVisible();
    await pizzaButton.click();
  }

};