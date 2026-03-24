import { test, expect, Locator, Page } from "@playwright/test";

export class LogoutPage {
   private readonly page: Page;
   private readonly continueButton: Locator;
   private readonly AccountLogoutHeader:Locator

   constructor(page: Page) {
    this.page = page;
    this.continueButton = page.locator('//a[normalize-space()="Continue"]'); 
    this.AccountLogoutHeader = page.locator('//h1[normalize-space()="Account Logout"]');
   }

   async clickContinueButton() {
    await this.continueButton.click();
   }

   async AccountLogoutHeaderVisible(){
    return await this.AccountLogoutHeader.isVisible();
   }
     
}   

//logout link we have in my account page above is not required 