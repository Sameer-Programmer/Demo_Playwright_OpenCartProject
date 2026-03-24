import { test, expect, Locator, Page } from "@playwright/test";

export class HomePage {

    //locators

    private readonly page: Page;
    private readonly linkMyAccount: Locator;
    private readonly register: Locator;
    private readonly linkLogin: Locator;
    private readonly txtSearch: Locator;
    private readonly buttonSearch: Locator;

    //constructer

    constructor(page: Page) {
        this.page = page;
        this.register = page.locator("//a[normalize-space()='Register']");
        this.linkMyAccount = page.locator("//span[normalize-space()='My Account']");
        this.linkLogin = page.locator("//a[normalize-space()='Login']");
        this.txtSearch = page.locator('input[placeholder="Search"]');
        this.buttonSearch = page.locator(".fa.fa-search");
    }


    // verify the Title is Present or not 

    // actions

    async isHomePageTitleExists() : Promise<boolean> {
        const title: string = await this.page.title();
        if (title) {
            return true
        } else {
            return false
        }
    }

   // click to my account
   async clickMyAccount(){
    await this.page.waitForLoadState('domcontentloaded');
    await this.linkMyAccount.click();
   }

   // click to login
   async clickLogin(){
    await this.page.waitForLoadState('domcontentloaded');
    await this.linkLogin.click();
   }

    // Click the register Button 
    async registerCreation() {
        await this.linkMyAccount.click();
        await this.register.click();
    }

    // Click the Login Button 
    async loginClick() {
        await this.linkMyAccount.click();
        await this.linkLogin.click();
    }

    // Search the Product 
    async searchProduct(productName: string) {
        await this.txtSearch.fill(productName);
        await this.buttonSearch.click();
    }


    async linkMyAccountClick(){
        await this.linkMyAccount.click();
    }



}   