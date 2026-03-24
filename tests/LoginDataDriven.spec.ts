
import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { HomePage } from "../pages/HomePage";
import { TestConfig } from "../test.config";
import { MyAccountPage } from "../pages/MyAccountPage";
import { DataProvider } from "../utils/dataPovider";

//Load the test Data from the testdata folder from the json file 
//testdata\logintestdata.json

const jsonPath = "testdata/logintestdata.json";
const jsonTestData = DataProvider.getTestDatafromJson(jsonPath);


let homePage: HomePage;
let loginpage: LoginPage;
let config: TestConfig;
let accountPage: MyAccountPage;



for (const data of jsonTestData) {
    test(`Login by ${data.testName} @dataDriven`, async ({ page }) => {
        homePage = new HomePage(page);
        loginpage = new LoginPage(page);
        config = new TestConfig();
        accountPage = new MyAccountPage(page);

        await page.goto(config.appUrl);
        await homePage.clickMyAccount();
        await homePage.clickLogin();
        await loginpage.loginOperation(data.email, data.Password)
        if (data.expected === "success") {
            expect(await accountPage.accountHeadingVisible()).toBeTruthy()
        } else {
            expect(await accountPage.accountHeadingVisible()).toBeFalsy()
            await expect(loginpage.warningMessage).toBeVisible()
        }

    });

}

// Now lets go and use CSV

const csvPath = "testdata/login_test_data.csv";
const csvTestData: any[] = DataProvider.getTestDatafromCSV(csvPath);

for (const data of csvTestData) {
    test(`Login with ${data.testName} @dataDriven`, async ({ page }) => {
        homePage = new HomePage(page);
        loginpage = new LoginPage(page);
        config = new TestConfig();
        accountPage = new MyAccountPage(page);

        await page.goto(config.appUrl);
        await homePage.clickMyAccount();
        await homePage.clickLogin();
        await loginpage.loginOperation(data.email, data.Password)
        if (data.expected === "success") {
            expect(await accountPage.accountHeadingVisible()).toBeTruthy()
        } else {
            expect(await accountPage.accountHeadingVisible()).toBeFalsy()
            await expect(loginpage.warningMessage).toBeVisible()
        }

    });



}