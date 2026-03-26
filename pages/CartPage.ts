import { Page, Locator } from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly shoppingCart: Locator;
    readonly viewCart: Locator;
    readonly cartPageTitle: Locator;

    constructor(page: Page) {
        this.page = page;
        this.shoppingCart = page.locator("#cart button").first();
        this.viewCart = page.getByText("View Cart");
        this.cartPageTitle = page.getByRole('heading', { name: "Shopping Cart" });
    }

    // 🔹 Navigate to cart page
    async navigateToCartPage() {
        await this.shoppingCart.click();
        await this.viewCart.click();
    }

    // 🔹 Dynamic locator for product name
    getProductByName(productName: string): Locator {
        return this.page.getByRole('link', { name: productName }).first();
    }

    // 🔹 Dynamic locator for total price
    getTotalPrice(price: string): Locator {
        return this.page.locator('td').filter({ hasText: price }).last();
    }
}