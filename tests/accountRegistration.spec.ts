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

import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { RegistrationPage } from '../pages/RegistrationPage';
import { RandomDataUtil } from '../utils/RandomDataGenerator';
import { TestConfig } from '../test.config';

test("UserRegistration_001 @master @sanity @regression @smoke", async ({ page }) => {
    test.setTimeout(60000)

    const config = new TestConfig();
    await page.goto(config.appUrl)  // Navigate to URl 
    const homePage = new HomePage(page);
    const registrationPage = new RegistrationPage(page);


    await homePage.registerCreation();


    const firstName = RandomDataUtil.getRandomFirstname();
    const lastName = RandomDataUtil.getRandomLastname();
    const email = RandomDataUtil.getRandomEmail();
    const telephone = RandomDataUtil.getRandomTelephone();
    const password = RandomDataUtil.getRandomPassword();

    //Fill the register Details 

    await registrationPage.performRegistration(firstName, lastName, email, telephone, password);
    console.log(`First Name : ${firstName}`)
    console.log(`Last Name : ${lastName}`)
    console.log(`Email : ${email}`)
    console.log(`Telephone : ${telephone}`)
    console.log(`Password : ${password}`)
    await expect(registrationPage.msgConfirmation).toBeVisible();


})



