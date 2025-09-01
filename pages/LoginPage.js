const { expect } = require('@playwright/test');

exports.LoginPage = class LoginPage {
  constructor(page) {
    this.page = page;

    // Label selectors
    this.userNameLabel = '#label-username';
    this.passwdLabel = '#label-password';
    this.languageLabel = '#label-language';

    // Input selectors
    this.userNameInput = '#username';
    this.passwdInput = '#password';
    this.languageSelect = '#language-select';

    // Submit button
    this.submitBtn = "//button[@class='submit-btn']";
  }

  async gotoLoginPage() {
    await this.page.goto(process.env.BASE_URL);
  }
  async selectLanguage(language) {
    await this.page.selectOption(this.languageSelect, { label: language });

    // Save to localStorage so HomePage can retrieve it
    await this.page.evaluate((lang) => {
      localStorage.setItem('selectedLanguage', lang);
    }, language);

    await this.page.waitForTimeout(500); // Optional: replace with smarter wait
  }

  async loginDetails(uname, pwd) {
    await this.page.locator(this.userNameInput).fill(uname);
    await this.page.locator(this.passwdInput).fill(pwd);

  }

  async validateLabels(expectedLabels) {
    const usernameText = await this.page.locator(this.userNameLabel).innerText();
    const passwordText = await this.page.locator(this.passwdLabel).innerText();
    const languageText = await this.page.locator(this.languageLabel).innerText();

    expect(usernameText.trim()).toContain(expectedLabels.username);
    expect(passwordText.trim()).toContain(expectedLabels.password);
    expect(languageText.trim()).toContain(expectedLabels.language);
  }
  async clickSubmitBtn() {
    await this.page.locator(this.submitBtn).click();
  }
};