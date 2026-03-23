/* 
Login with Valid Credentials
1- Navigate to the Homepage -Click on My account and then click on Login button
2- Enter the email and password
3- Click on the login button
4- Verify that the user is logged in successfully

===========================================
Blueprint of testpage
1- imports of pages required for test 
2- Declaration of pages 
3. anyHooks
4-Tests 
5- Tags


*/


import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { HomePage } from "../pages/HomePage";
import { TestConfig } from "../test.config";
import {MyAccountPage} from "../pages/MyAccountPage";


let homePage :HomePage;
let loginpage :LoginPage;
let config:TestConfig;
let accountPage:MyAccountPage;



test.beforeEach("BeforeEachHook",async({page})=>{
    config = new TestConfig()
     await page.goto(config.appUrl)
     loginpage = new LoginPage(page);
     homePage = new HomePage(page);
     accountPage = new MyAccountPage(page);
})



test('Login with valid credentials @master @sanity @regression @smoke', async ({ page }) => {
    await homePage.clickMyAccount();
    await homePage.clickLogin();
    await loginpage.loginOperation(config.email,config.password)
    await expect(accountPage.myAccountHeading).toBeVisible()

});     