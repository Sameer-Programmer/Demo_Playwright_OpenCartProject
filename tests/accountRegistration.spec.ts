/* 

👉 “Framework means a predefined structure that helps us develop something in a consistent and efficient way.”
Test Case : Account Registration 
Steps :
1. Navigate to the OpenCart website.
2. Click the My Account Link then click on Register Link.
3. Fill in the registration form with valid data.
4. Click the "Continue" button.
5. Verify that the account is created successfully.
*/

import { test, expect } from './Fixtures/baseTest';


test("UserRegistration_001 @master @sanity @regression @smoke", async ({ page,
    homePage,
    registrationPage,
    testDataFactory,
    env }) => {

    const userData = testDataFactory.getRegistrationData(); // ✅ Added

    await page.goto(env.baseURL);
    console.log(env.baseURL)
    await homePage.registerCreation();
    //PerformRegistration 
    await registrationPage.fillRegistrationForm(userData);
    //assertion 
    expect(await registrationPage.isAccountCreated()).toBe(true);

});






