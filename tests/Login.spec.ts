import { test, expect, Page } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { HomePage } from "../pages/HomePage";
import { MyAccountPage } from "../pages/MyAccountPage";
import { LogoutPage } from "../pages/LogoutPage";
import { getEnvConfig } from "../config/env.config";



// run this below test.describe block in serial mode
test.describe.configure({ mode: 'serial' });

test.describe("Test 1 @master", () => {
   const config = getEnvConfig();
    let page: Page;
    let homePage: HomePage;
    let loginPage: LoginPage;
    let accountPage: MyAccountPage;
    let logoutPage: LogoutPage;
  

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        page.goto(config.baseURL); //baseURL from env.config.ts
        homePage = new HomePage(page);
        loginPage = new LoginPage(page);
        accountPage = new MyAccountPage(page);
        logoutPage = new LogoutPage(page);
       
    });

    test.afterAll(async () => {
        await page.close();
    });

    test('Login with valid credentials @master @sanity @regression @smoke', async () => {
        await homePage.clickMyAccount();
        await homePage.clickLogin();
        await loginPage.loginOperation(config.username, config.password);
        expect(await accountPage.accountHeadingVisible()).toBeTruthy();
    });

    test('Logout from My Account @master @sanity @regression @smoke', async () => {
        await logoutPage.performLogout();
        expect(await logoutPage.AccountLogoutHeaderVisible()).toBeFalsy();
        expect(await homePage.isHomePageTitleExists()).toBeTruthy();
    });
});