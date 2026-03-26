import { test, expect, Locator, Page } from "@playwright/test";


export class LogoutPage {
   private readonly page: Page;
   private readonly continueButton: Locator;
   private readonly AccountLogoutHeader: Locator
   private readonly linkMyAccount: Locator
   private readonly logout: Locator


   constructor(page: Page) {
      this.page = page;
      this.continueButton = page.locator('//a[normalize-space()="Continue"]');
      this.AccountLogoutHeader = page.locator('//h1[normalize-space()="Account Logout"]');
      this.linkMyAccount = page.locator('span:has-text("My Account")')
      this.logout = page.locator("(//a[normalize-space()='Logout'])[1]");
   }

   async clickContinueButton() {
      await this.continueButton.click();
   }


   async performLogout() {
      await this.linkMyAccount.click();
      await this.page.hover("//a[normalize-space()='Logout']");
      await this.logout.click();
      await this.clickContinueButton();
   }

   async AccountLogoutHeaderVisible() {
      return await this.AccountLogoutHeader.isVisible();
   }

   async verifyLogoutSuccess() {
      await expect(this.AccountLogoutHeader).not.toBeVisible();
   }


}

//logout link we have in my account page above is not required 