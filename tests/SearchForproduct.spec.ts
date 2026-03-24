
import { test, expect } from "../tests/Fixtures/baseTest"; //tests\Fixtures\baseTest.ts



// implement with describe block 

test.describe("Search and Add to Cart Flow", () => {


  test("Search and add product to cart @smoke @regression", async ({ searchPage, config, page }) => {
   
    await test.step('Search for product', async () => {
      await searchPage.searchBoxClick();
      await searchPage.searchBoxFill(config.productName);
      await searchPage.searchButtonClick();
      await expect(searchPage.prouctNameLocator).toBeVisible();
    });

    await test.step('Add the product to Cart', async () => {
      await searchPage.selectProduct();
      //wait for page to load 
      await page.waitForLoadState('domcontentloaded');
      await searchPage.updateQuantity(config.productQuantity);
      await searchPage.addToCartButton2()
      await expect(searchPage.successMessage).toContainText("Success: You have added " + config.productName + " to your shopping cart!");
      await page.waitForTimeout(5000);
    });

  });
});
