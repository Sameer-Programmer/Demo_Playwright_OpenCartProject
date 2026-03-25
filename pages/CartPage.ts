import { Page, Locator } from '@playwright/test';
import { TestConfig } from '../test.config';
const config = new TestConfig()

export class CartPage {
    readonly page: Page;
    readonly shoppingCart: Locator;
    readonly viewCart: Locator;
    readonly productname: Locator;
    readonly TotalPrice: Locator;
    readonly CartPageTitle: Locator;


    constructor(page: Page) {
        this.page = page;
        this.shoppingCart = page.locator("#cart button").first();
        this.viewCart = page.locator(`strong:has-text("View Cart")`)
        this.productname = page.getByRole('link', { name: config.productName }).last();
        this.TotalPrice = page.locator('td').filter({ hasText: config.totalPrice }).first();
        this.CartPageTitle = page.locator("//h1[contains(text(),'Shopping Cart')]");
    }


    async shoppingCartClick() {
        await this.shoppingCart.click();
    }

    //view Cart
    async viewCartClick() {
        await this.viewCart.click();
    }

    //product name
    async productNameVisible() {
        return this.productname.isVisible();
    }

    //total price
    async totalPriceVisible() {
        return this.TotalPrice.isVisible();
    }



    async NavigateToCartPage() {
        await this.shoppingCart.click();
        await this.viewCartClick();
        await this.productNameVisible();
        await this.totalPriceVisible();
    }

}


