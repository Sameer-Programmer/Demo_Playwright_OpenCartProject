import { test, expect, Locator, Page } from "@playwright/test";
import { HomePage } from "./HomePage";
import { TestConfig } from "../test.config";


let homepage: HomePage
let config = new TestConfig()



export class SearchPage {
    private readonly page: Page;
    readonly prouctNameLocator: Locator



    constructor(page: Page) {
        this.page = page;
        this.prouctNameLocator = page.locator(`//a[normalize-space()='${config.productName}']`) // we have right this dynamic locator 

    }

    async searchforProduct(productName: string) {
        homepage = new HomePage(this.page)
        await homepage.searchProduct(productName)
    }




}