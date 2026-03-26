import { Locator, Page } from "@playwright/test";

export class SearchPage {
    private readonly page: Page;
    private readonly txtSearch: Locator;
    private readonly buttonSearch: Locator;
    private readonly quantityFieldfield: Locator
    private readonly addToCartButton: Locator;
    readonly successMessage: Locator;



    constructor(page: Page) {
        this.page = page;
        this.txtSearch = page.locator('input[placeholder="Search"]');
        this.buttonSearch = page.locator(".fa.fa-search");
        this.quantityFieldfield = page.locator("#input-quantity");
        this.addToCartButton = page.locator(`(//button[@id='button-cart'])[1]`);
        this.successMessage = page.locator('.alert-success');
    }

    //dynamic Locators 

    getProductName(product: string) {
        return this.page.getByRole('link', { name: `${product}` }).first();
    }

    getAddToCartButton(product: string) {
        return this.page.locator('div', {
            has: this.page.locator('a', { hasText: product })
        }).getByRole('button', { name: 'Add to Cart' });
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



    async updateQuantity(quantity: string) {
        await this.quantityFieldfield.clear();
        await this.quantityFieldfield.fill(quantity);
    }


    // async addToCartClick() {
    //     await this.buttonAddToCart.click();
    // }

    async addToCartButton2() {
        await this.addToCartButton.click();
    }








}