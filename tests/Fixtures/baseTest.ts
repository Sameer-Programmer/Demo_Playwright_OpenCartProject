import { test as base, Page } from "@playwright/test";
import { HomePage } from "../../pages/HomePage";
import { LoginPage } from "../../pages/LoginPage";
import { MyAccountPage } from "../../pages/MyAccountPage";
import { LogoutPage } from "../../pages/LogoutPage";
import { SearchPage } from "../../pages/SearchPage";
import { TestConfig } from "../../test.config";

type MyFixtures = {
  page: Page;
  homePage: HomePage;
  loginPage: LoginPage;
  accountPage: MyAccountPage;
  logoutPage: LogoutPage;
  searchPage: SearchPage;
  config: TestConfig;
};

const config = new TestConfig();

export const test = base.extend<MyFixtures>({
  
  page: async ({ browser }, use) => {
    const page = await browser.newPage();
    await page.goto(config.appUrl);
    await use(page);
    await page.close();
  },

  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  accountPage: async ({ page }, use) => {
    await use(new MyAccountPage(page));
  },

  logoutPage: async ({ page }, use) => {
    await use(new LogoutPage(page));
  },

  searchPage: async ({ page }, use) => {
    await use(new SearchPage(page));
  },

  config: async ({}, use) => {
    await use(config);
  },
});

export { expect } from "@playwright/test";