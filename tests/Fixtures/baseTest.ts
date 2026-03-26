import { test as base, Page } from "@playwright/test";
import { RegistrationPage } from "../../pages/RegistrationPage";
import { HomePage } from "../../pages/HomePage";
import { LoginPage } from "../../pages/LoginPage";
import { MyAccountPage } from "../../pages/MyAccountPage";
import { LogoutPage } from "../../pages/LogoutPage";
import { SearchPage } from "../../pages/SearchPage";
import { CartPage } from "../../pages/CartPage";
import { TestDataFactory } from "../../utils/TestDataFactory";
import { EnvConfig } from "../../types/env.types";
import { getEnvConfig } from "../../config/env.config";

type Env = EnvConfig;


type MyFixtures = {
  registrationPage: RegistrationPage;
  homePage: HomePage;
  loginPage: LoginPage;
  accountPage: MyAccountPage;
  logoutPage: LogoutPage;
  searchPage: SearchPage;
  cartPage: CartPage;
  testDataFactory: TestDataFactory;
  env: Env;
};

export const test = base.extend<MyFixtures>({

  registrationPage: async ({ page }, use) => {
    await use(new RegistrationPage(page));
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

  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },

  testDataFactory: async ({ }, use) => {
    await use(new TestDataFactory());
  },

  env: async ({}, use) => {
    const config = getEnvConfig();
    await use(config);
  },

});

  

export { expect } from "@playwright/test";

//Filename tests\Fixtures\baseTest.ts