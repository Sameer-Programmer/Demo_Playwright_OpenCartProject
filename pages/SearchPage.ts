import { test, expect, Locator, Page } from "@playwright/test";
import { HomePage } from "./HomePage";
import { TestConfig } from "../test.config";


let homepage: HomePage
let config = new TestConfig()



export class SearchPage {
    private readonly page: Page;
    readonly prouctNameLocator: Locator
    private readonly txtSearch: Locator;
    private readonly buttonSearch: Locator;



    constructor(page: Page) {
        this.page = page;
        this.prouctNameLocator = page.locator(`//a[normalize-space()='${config.productName}']`) // we have right this dynamic locator 
        this.txtSearch = page.locator('input[placeholder="Search"]');
        this.buttonSearch = page.locator(".fa.fa-search");
    }

    async searchProduct(productName: string) {
        await this.txtSearch.fill(productName);
        await this.buttonSearch.click();
    }


    async searchBoxClick(){
        await this.txtSearch.click();
    }

    async searchBoxFill(productName: string){
        await this.txtSearch.fill(productName);
    }

    async searchButtonClick(){
        await this.buttonSearch.click();
    }





}