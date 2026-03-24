import { test, expect, Page } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { HomePage } from "../pages/HomePage";
import { TestConfig } from "../test.config";
import { MyAccountPage } from "../pages/MyAccountPage";
import { LogoutPage } from "../pages/Logoutpage";

// run this below test.describe block in serial mode
test.describe.configure({ mode: 'serial' });

test.describe("Test 1", () => {
    let page: Page;
    let homePage: HomePage;
    let loginPage: LoginPage;
    let accountPage: MyAccountPage;
    let logoutPage: LogoutPage;
    const config = new TestConfig();

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        homePage = new HomePage(page);
        loginPage = new LoginPage(page);
        accountPage = new MyAccountPage(page);
        logoutPage = new LogoutPage(page);
        await page.goto(config.appUrl);
    });

    test.afterAll(async () => {
        await page.close();
    });

    test('Login with valid credentials @master @sanity @regression @smoke', async () => {
        await homePage.clickMyAccount();
        await homePage.clickLogin();
        await loginPage.loginOperation(config.email, config.password);
        expect(await accountPage.accountHeadingVisible()).toBeTruthy();
    });

    test('Logout from My Account @master @sanity @regression @smoke', async () => {
        await accountPage.performLogout();
        expect(await logoutPage.AccountLogoutHeaderVisible()).toBeTruthy();
        await logoutPage.clickContinueButton();
        expect(await logoutPage.AccountLogoutHeaderVisible()).toBeFalsy();
        expect(await homePage.isHomePageTitleExists()).toBeTruthy();
    });
});