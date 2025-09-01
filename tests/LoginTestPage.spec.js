import { test } from '@playwright/test';
import dotenv from 'dotenv';
import { LoginPage } from '../pages/LoginPage';
import languageData from '../test-data/languages.json';

dotenv.config(); // Load .env variables

const baseUrl = process.env.BASE_URL;
const defaultLanguage = process.env.LANGUAGE || 'en';

if (!baseUrl) throw new Error('BASE_URL is missing from .env file');

for (const lang of languageData.languages) {
  test(`Validate login labels for language: ${lang}`, async ({ page }) => {
    const loginObj = new LoginPage(page, {
      baseUrl,
      language: lang
    });

    await loginObj.gotoLoginPage();
    await loginObj.selectLanguage(lang);
    await loginObj.loginDetails('malu', 'abcde');

    const labels = languageData.translations[lang];
    if (!labels) throw new Error(`Missing translation data for language: ${lang}`);

    await loginObj.validateLabels(labels);
    await loginObj.clickSubmitBtn();
    await page.waitForTimeout(3000);
  });
}