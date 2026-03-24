
import { test, expect } from "../tests/Fixtures/baseTest"; //tests\Fixtures\baseTest.ts

test("Search for product @smoke", async ({ searchPage ,config, page}) => {
    await searchPage.searchBoxClick();
    await searchPage.searchBoxFill(config.productName);
    await searchPage.searchButtonClick();
    await expect(searchPage.prouctNameLocator).toBeVisible();
    await page.waitForTimeout(10000)
}); 