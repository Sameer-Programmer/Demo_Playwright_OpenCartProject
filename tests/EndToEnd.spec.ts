
import { LoginPage } from "../pages/LoginPage";
import { test, expect } from "../tests/Fixtures/baseTest"; //tests\Fixtures\baseTest.ts
import { TestDataFactory } from "../utils/TestDataFactory";



test("End to End flow", async ({ page, registrationPage, homePage, config, searchPage, logoutPage, loginPage, cartPage }) => {

    // Navigate to Home page of APP
    await homePage.registerCreation();

    // Fill Registration Form and Validate Success Message
    const userData = TestDataFactory.getRegistrationData();
    await registrationPage.fillRegistrationForm(userData);
    await expect(registrationPage.msgConfirmation).toBeVisible();

    console.log(userData.email)
    console.log(userData.password)
    console.log("Registration Successfull")


    // perform Logout and Validate Logout 
    await logoutPage.performLogout();
    console.log("Logout Successfull")
    await page.waitForLoadState('domcontentloaded');
    expect(await logoutPage.AccountLogoutHeaderVisible()).toBeFalsy();

    //) Login with same account
    await loginPage.loginWithSameAccount(userData.email, userData.password);
    console.log("Login Successfull")

    // Search for product

    await test.step('Search for product', async () => {
        await searchPage.searchBoxClick();
        await searchPage.searchBoxFill(config.productName);
        await searchPage.searchButtonClick();
        await expect(searchPage.prouctNameLocator).toBeVisible();
        console.log("Product Searched Successfully")
    });

    // Add the product to Cart
    await test.step('Add the product to Cart', async () => {
        await searchPage.selectProduct();
        //wait for page to load 
        await page.waitForLoadState('domcontentloaded');
        await searchPage.updateQuantity(config.productQuantity);
        await searchPage.addToCartButton2()
        await expect(searchPage.successMessage).toContainText("Success: You have added " + config.productName + " to your shopping cart!");
        console.log("Product Added to Cart Successfully")
    });

    // Navigate to Cart Page
    await test.step('Navigate to Cart Page', async () => {
        await cartPage.NavigateToCartPage();
        // validate title -> Shopping Cart 
        await expect(cartPage.CartPageTitle).toContainText("Shopping Cart");
        console.log("Navigated to Cart Page Successfully")
        // validate product name
        await expect(cartPage.productname).toHaveText(config.productName);
        console.log("Product Name Validated Successfully")
        // validate total price
        await expect(cartPage.TotalPrice).toHaveText(config.totalPrice);
        console.log("Total Price Validated Successfully")
    });



})

// run through command npx playwright test tests/EndToEnd.spec.ts

/* 
 productName = "iPhone"
    productQuantity = "2"
    totalPrice = "$1,204.00"
*/