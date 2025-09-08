// homepagesection.js
const { expect } = require('@playwright/test');
exports.HomePageSection = 
class HomePageSection {
  constructor(page) {
    this.page = page;
  this.menuListItems = '.menu-item'; 
  }

  async getMenuItemTexts() {
  return await this.page.locator(this.menuListItems).allInnerTexts();
}
}

