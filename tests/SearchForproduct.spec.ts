import { test, expect, Page } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { TestConfig } from "../test.config";
import { SearchPage } from "../pages/SearchPage";
import { LoginPage } from "../pages/LoginPage";
import { MyAccountPage } from "../pages/MyAccountPage";
import { LogoutPage } from "../pages/LogoutPage";


let page: Page;
let homePage: HomePage;
let searchPage: SearchPage;
let loginPage: LoginPage;
let accountPage: MyAccountPage;
let logoutPage: LogoutPage;
const  config = new TestConfig();

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        homePage = new HomePage(page);
        loginPage = new LoginPage(page);
        accountPage = new MyAccountPage(page);
        logoutPage = new LogoutPage(page);
        searchPage = new SearchPage(page);
        await page.goto(config.appUrl);
    });








test("Search for product @smoke", async ({ page }) => {
    await page.goto(config.appUrl);
    await homePage.searchProduct(config.productName);
    await searchPage.searchforProduct(config.productName);
    await expect(searchPage.prouctNameLocator).toBeVisible();
    await page.waitForTimeout(10000)
}); 