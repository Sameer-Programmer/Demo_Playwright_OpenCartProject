import { test, expect } from "../tests/Fixtures/baseTest";
import { TestDataFactory } from "../utils/TestDataFactory";
import { getEnvConfig } from "../config/env.config";

test("End to End flow", async ({ page,
    registrationPage,
    homePage,
    searchPage,
    logoutPage,
    loginPage,
    cartPage,
    testDataFactory
}) => {

    const configfile = getEnvConfig();
    if (!configfile.baseURL) {
        throw new Error("Base URL is missing in ENV");
    }
    await page.goto(configfile.baseURL);
    console.log(configfile.baseURL);
    // Navigate to Home page
    await homePage.registerCreation();

    // Generate Test Data
    const userData = testDataFactory.getRegistrationData();
    const product = TestDataFactory.getProductData(); // ✅ Added

    // Fill Registration Form and Validate Success Message
    await registrationPage.fillRegistrationForm(userData);
    expect(await registrationPage.isAccountCreated()).toBe(true);

    console.log(userData.email);
    console.log(userData.password);
    console.log("Registration Successful");

    // Logout
    await logoutPage.performLogout();
    console.log("Logout Successful");

    await logoutPage.verifyLogoutSuccess();
    await expect(logoutPage.verifyLogoutSuccess()).toBeTruthy()



    // Login with same account
    await loginPage.loginWithSameAccount(userData.email, userData.password);
    console.log("Login Successful");

    // 🔍 Search for product
    await test.step('Search for product', async () => {
        await searchPage.searchBoxClick();
        await searchPage.searchBoxFill(product.productName);
        await searchPage.searchButtonClick();

        await expect(searchPage.getProductName(product.productName)).toBeVisible();
        console.log("Product Searched Successfully");
    });

    // 🛒 Add product to cart
    await test.step('Add the product to Cart', async () => {
        await searchPage.getProductName(product.productName).click();
        console.log(product.productName);
        await page.waitForLoadState('domcontentloaded');
        await searchPage.updateQuantity(product.quantity); // ✅ Fixed
        await searchPage.addToCartButton2();

        // ✅ Stable assertion
        await expect(searchPage.successMessage).toBeVisible();
        await expect(searchPage.successMessage).toContainText("Success:");
        await expect(searchPage.successMessage).toContainText(product.productName);

        console.log("Product Added to Cart Successfully");
    });

    // 🧾 Navigate to Cart Page
    await test.step('Navigate to Cart Page', async () => {
        await cartPage.navigateToCartPage(); // ✅ method name updated

        await expect(cartPage.cartPageTitle).toBeVisible();
        console.log("Navigated to Cart Page Successfully");

        // ✅ Use dynamic locator methods
        await expect(cartPage.getProductByName(product.productName)).toBeVisible();
        console.log("Product Name Validated Successfully");

        await expect(cartPage.getTotalPrice(product.totalPrice)).toBeVisible();
        console.log("Total Price Validated Successfully");
    });

});



// await page.waitForLoadState('domcontentloaded');
// expect(await logoutPage.AccountLogoutHeaderVisible()).toBeFalsy();

/*
 async verifyLogoutSuccess() {
await expect(this.AccountLogoutHeader).not.toBeVisible();
}
*/