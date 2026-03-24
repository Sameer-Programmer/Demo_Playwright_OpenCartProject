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
    private readonly buttonAddToCart: Locator;
    private readonly selectproduct: Locator;
    private readonly quantityFieldfield:Locator
    private readonly addToCartButton: Locator;
    readonly successMessage: Locator;



    constructor(page: Page) {
        this.page = page;
        this.prouctNameLocator = page.locator(`//div[@class="caption"]//a[normalize-space()='${config.productName}']`)
        this.txtSearch = page.locator('input[placeholder="Search"]');
        this.buttonSearch = page.locator(".fa.fa-search");
        this.selectproduct = page.getByRole('link', { name: `${config.productName}` }).first();
        this.quantityFieldfield=page.locator("#input-quantity"); 
        this.addToCartButton = page.locator(`(//button[@id='button-cart'])[1]`); 

        this.buttonAddToCart = page.locator('div', {
            has: page.locator('a', { hasText: config.productName })
        }).getByRole('button', { name: 'Add to Cart' });  // is this kind not requireed ${config.productName} here ? 
        this.successMessage = page.locator("//div[contains(@class,'alert-success') and contains(.,'Success')]");
    }

    async searchProduct(productName: string) {
        await this.txtSearch.fill(productName);
        await this.buttonSearch.click();
    }


    async searchBoxClick() {
        await this.txtSearch.click();
    }

    async searchBoxFill(productName: string) {
        await this.txtSearch.fill(productName);
    }

    async searchButtonClick() {
        await this.buttonSearch.click();
    }

    async selectProduct() {
        await this.selectproduct.click();
    }

    async updateQuantity(quantity: string) {
        await this.quantityFieldfield.clear();
        await this.quantityFieldfield.fill(quantity);
    }


    async addToCartClick() {
        await this.buttonAddToCart.click();
    }

    async addToCartButton2() {
        await this.addToCartButton.click();
    }








}