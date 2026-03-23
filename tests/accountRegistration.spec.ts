/* 
Test Case : Account Registration 
Steps :
1. Navigate to the OpenCart website.
2. Click the My Account Link then click on Register Link.
3. Fill in the registration form with valid data.
4. Click the "Continue" button.
5. Verify that the account is created successfully.
*/

import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { RegisterPage } from '../pages/RegistrationPage';
import { RandomDataUtil } from '../utils/RandomDataGenerator';
import { TestConfig } from '../test.config';

test("UserRegistration_001", async ({ page }) => {
    test.setTimeout(60000)

    const config = new TestConfig();
    await page.goto(config.appUrl)  // Navigate to URl 
    const homePage = new HomePage(page);
    const registerPage = new RegisterPage(page);


    await homePage.registerCreation();


    const firstName = RandomDataUtil.getRandomFirstname();
    const lastName = RandomDataUtil.getRandomLastname();
    const email = RandomDataUtil.getRandomEmail();
    const telephone = RandomDataUtil.getRandomTelephone();
    const password = RandomDataUtil.getRandomPassword();

    //Fill the register Details 

    await registerPage.register(firstName, lastName, email, telephone, password);
    await expect(registerPage.msgConfirmation).toBeVisible();


})

