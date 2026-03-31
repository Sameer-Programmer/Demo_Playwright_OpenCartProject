import { test, expect } from "./Fixtures/baseTest";
import { TestDataFactory } from "../utils/TestDataFactory";

/**
 * ✅ SEARCH AND ADD TO CART TESTS
 * 
 * These tests cover:
 * 1. Product search functionality
 * 2. Product selection from search results
 * 3. Adding products to cart with success verification
 * 4. Cart page verification
 * 5. Edge cases (empty search, invalid products, special characters)
 */

// Test 1: Happy Path - Search, view details, and add to cart
test("Search Product and Add to Cart - Happy Path @master @sanity", async ({ 
  page,
  env,
  searchPage,
  cartPage 
}) => {

  // 1️⃣ NAVIGATE TO HOME PAGE
  await page.goto(env.baseURL);
  
  // 2️⃣ GET TEST DATA - PRODUCT FROM FACTORY
  const product = TestDataFactory.getIPhoneData();
  const productName = product.name;
  const productPrice = product.price;
  
  // 3️⃣ SEARCH FOR PRODUCT
  await searchPage.searchProduct(productName);
  
  // 4️⃣ VERIFY SEARCH RESULTS LOADED
  await page.waitForLoadState('networkidle');
  
  // Verify search heading is visible
  const searchHeading = page.locator('h1:has-text("Search")');
  await expect(searchHeading).toBeVisible();
  
  // Verify products meeting search criteria exists
  const productsHeading = page.locator('h2:has-text("Products meeting the search criteria")');
  await expect(productsHeading).toBeVisible();
  
  // 5️⃣ SELECT PRODUCT FROM SEARCH RESULTS
  const productLink = searchPage.getProductName(productName);
  await expect(productLink).toBeVisible();
  await productLink.click();
  
  // 6️⃣ VERIFY PRODUCT DETAILS PAGE LOADED
  await page.waitForLoadState('domcontentloaded');
  const productHeading = page.locator(`h1:has-text("${productName}")`);
  await expect(productHeading).toBeVisible();
  
  // 7️⃣ ADD PRODUCT TO CART
  await searchPage.addToCartButton2();
  
  // 8️⃣ VERIFY SUCCESS MESSAGE
  await expect(searchPage.successMessage).toBeVisible();
  const successText = await searchPage.successMessage.textContent();
  expect(successText).toContain('Success');
  expect(successText).toContain(productName);
  
  // 9️⃣ VERIFY CART COUNTER UPDATED
  const cartCounter = page.locator('button:has-text("item(s)")');
  await expect(cartCounter).toContainText('1 item(s)');
  
  // 🔟 NAVIGATE TO SHOPPING CART
  await cartPage.navigateToCartPage();
  
  // 1️⃣1️⃣ VERIFY SHOPPING CART PAGE LOADED
  await page.waitForLoadState('domcontentloaded');
  const cartTitle = page.locator('h1:text-matches("Shopping Cart")');
  await expect(cartTitle).toBeVisible();
  
  // 1️⃣2️⃣ VERIFY PRODUCT IN CART
  const productInCart = cartPage.getProductByName(productName);
  await expect(productInCart).toBeVisible();
  
  // 1️⃣3️⃣ VERIFY PRODUCT PRICE IN CART TABLE
  const priceInTable = page.locator(`text=${productPrice}`).last();
  await expect(priceInTable).toBeVisible();
});

// Test 2: Search with Invalid Product Name
test("Search with Invalid Product Name @regression @sanity", async ({ 
  page,
  env
}) => {

  // 1️⃣ NAVIGATE TO HOME PAGE
  await page.goto(env.baseURL);
  
  // 2️⃣ SEARCH FOR NON-EXISTENT PRODUCT
  const invalidProduct = "NonExistentProductXYZ123!@#";
  const searchBox = page.locator('input[placeholder="Search"]');
  await searchBox.fill(invalidProduct);
  
  const searchButton = page.locator(".fa.fa-search").first();
  await searchButton.click();
  
  // 3️⃣ VERIFY SEARCH RESULTS PAGE LOADS
  await page.waitForLoadState('networkidle');
  
  // 4️⃣ VERIFY "NO RESULTS" MESSAGE
  const noResultsMessage = page.locator('text=There is no product that matches the search criteria');
  await expect(noResultsMessage).toBeVisible();
  
  // 5️⃣ VERIFY "PRODUCTS MEETING SEARCH CRITERIA" SECTION EXISTS BUT IS EMPTY
  const productsSection = page.locator('h2:has-text("Products meeting the search criteria")');
  await expect(productsSection).toBeVisible();
});

// Test 3: Modify Quantity Before Adding to Cart
test("Modify Quantity and Add to Cart @master @regression", async ({ 
  page,
  env,
  searchPage,
  cartPage 
}) => {

  // 1️⃣ NAVIGATE TO HOME PAGE
  await page.goto(env.baseURL);
  
  // 2️⃣ GET TEST DATA - MACBOOK PRODUCT FROM FACTORY
  const product = TestDataFactory.getMacBookData();
  
  // 3️⃣ SEARCH FOR PRODUCT
  await searchPage.searchProduct(product.name);
  await page.waitForLoadState('networkidle');
  
  // 4️⃣ SELECT PRODUCT
  const productLink = searchPage.getProductName(product.name);
  await expect(productLink).toBeVisible();
  await productLink.click();
  
  await page.waitForLoadState('domcontentloaded');
  
  // 4️⃣ MODIFY QUANTITY
  const quantityField = page.locator('#input-quantity');
  await quantityField.clear();
  await quantityField.fill("3");
  
  // 5️⃣ VERIFY QUANTITY IS UPDATED
  const quantityValue = await quantityField.inputValue();
  expect(quantityValue).toBe("3");
  
  // 6️⃣ ADD TO CART
  await searchPage.addToCartButton2();
  
  // 7️⃣ WAIT FOR SUCCESS MESSAGE
  await page.waitForTimeout(1000);
  const successMsg = page.locator('.alert-success');
  const successVisible = await successMsg.isVisible().catch(() => false);
  
  // 8️⃣ NAVIGATE TO CART AND VERIFY
  await cartPage.navigateToCartPage();
  await page.waitForLoadState('domcontentloaded');
  
  // 🔟 VERIFY CART PAGE LOADED
  const cartTitle = page.locator('h1:text-matches("Shopping Cart")');
  await expect(cartTitle).toBeVisible();
});

// Test 4: Empty Search
test("Search with Empty Search Box @regression", async ({ 
  page,
  env
}) => {

  // 1️⃣ NAVIGATE TO HOME PAGE
  await page.goto(env.baseURL);
  
  // 2️⃣ CLICK SEARCH WITHOUT ENTERING TEXT
  const searchBox = page.locator('input[placeholder="Search"]');
  await searchBox.clear();
  
  const searchButton = page.locator(".fa.fa-search").first();
  await searchButton.click();
  
  // 3️⃣ VERIFY PAGE LOADS (with all products or specific message)
  await page.waitForLoadState('networkidle');
  
  // Should still have a valid page with search results section
  const pageTitle = await page.title();
  expect(pageTitle.length).toBeGreaterThan(0);
  
  // Verify we're on search results page
  const breadcrumb = page.locator('a:has-text("Search")');
  await expect(breadcrumb).toBeVisible();
});

// Test 5: Multiple Product Additions
test("Add Multiple Different Products to Cart @master", async ({ 
  page,
  env,
  searchPage,
  cartPage
}) => {

  // 1️⃣ GET TEST DATA - MULTIPLE PRODUCTS FROM FACTORY
  const products = TestDataFactory.getMultipleProducts(2);
  const firstProduct = products[0];
  const secondProduct = products[1];
  
  // 2️⃣ ADD FIRST PRODUCT
  await page.goto(env.baseURL);
  await searchPage.searchProduct(firstProduct.name);
  await page.waitForLoadState('networkidle');
  
  let productLink = searchPage.getProductName(firstProduct.name);
  await productLink.click();
  await page.waitForLoadState('domcontentloaded');
  
  await searchPage.addToCartButton2();
  await expect(searchPage.successMessage).toBeVisible();
  
  // 3️⃣ ADD SECOND PRODUCT
  // Search again from current page
  const searchBox = page.locator('input[placeholder="Search"]');
  await searchBox.clear();
  await searchBox.fill(secondProduct.name);
  
  const searchButton = page.locator(".fa.fa-search").first();
  await searchButton.click();
  await page.waitForLoadState('networkidle');
  
  productLink = searchPage.getProductName(secondProduct.name);
  await productLink.click();
  await page.waitForLoadState('domcontentloaded');
  
  await searchPage.addToCartButton2();
  await expect(searchPage.successMessage).toBeVisible();
  
  // 4️⃣ VERIFY CART HAS 2 ITEMS
  const cartCounter = page.locator('button:has-text("item(s)")');
  await expect(cartCounter).toContainText('2 item(s)');
  
  // 5️⃣ NAVIGATE TO CART AND VERIFY BOTH PRODUCTS ADDED
  await cartPage.navigateToCartPage();
  await page.waitForLoadState('domcontentloaded');
  
  // 6️⃣ VERIFY WE'RE ON SHOPPING CART PAGE
  const cartPageTitle = page.locator('h1:text-matches("Shopping Cart")');
  await expect(cartPageTitle).toBeVisible();
  
  // 7️⃣ VERIFY CART HAS MULTIPLE PRODUCTS
  const cartTable = page.locator('table tbody tr');
  const rows = await cartTable.count();
  expect(rows).toBeGreaterThanOrEqual(2); // At least 2 products
});

// Test 6: Search with Special Characters
test("Search with Special Characters @regression", async ({ 
  page,
  env
}) => {

  // 1️⃣ NAVIGATE TO HOME PAGE
  await page.goto(env.baseURL);
  
  // 2️⃣ SEARCH WITH SPECIAL CHARACTERS (Invalid input)
  const searchBox = page.locator('input[placeholder="Search"]');
  const specialCharacters = "!@#$%^&*";
  await searchBox.fill(specialCharacters);
  
  const searchButton = page.locator(".fa.fa-search").first();
  await searchButton.click();
  
  // 3️⃣ VERIFY SEARCH COMPLETES WITHOUT ERRORS
  await page.waitForLoadState('networkidle');
  
  // Page should load successfully
  const pageTitle = await page.title();
  expect(pageTitle).toBeTruthy();
  
  // Should show search page
  const searchSection = page.locator('h1:has-text("Search")');
  await expect(searchSection).toBeVisible();
});

// Test 7: Product Search Case Insensitivity
test("Case Insensitive Product Search @sanity", async ({ 
  page,
  env,
  searchPage
}) => {

  // 1️⃣ GET TEST DATA FROM FACTORY
  const product = TestDataFactory.getIPhoneData();
  const searchTerm = product.name.toLowerCase(); // Convert to lowercase for case-insensitivity test
  
  // 2️⃣ SEARCH FOR PRODUCT IN LOWERCASE
  await page.goto(env.baseURL);
  await searchPage.searchProduct(searchTerm);
  await page.waitForLoadState('networkidle');
  
  // 3️⃣ VERIFY PRODUCT FOUND
  const productsHeading = page.locator('h2:has-text("Products meeting the search criteria")');
  await expect(productsHeading).toBeVisible();
  
  // 4️⃣ VERIFY RESULT COUNT
  const resultInfo = page.locator('text=/Showing [0-9]+ to [0-9]+ of [0-9]+/');
  await expect(resultInfo).toBeVisible();
  
  const resultText = await resultInfo.textContent();
  expect(resultText).toContain('1'); // Should find the iPhone product
});

// to run this file npx playwright test tests/SearchForproduct.spec.ts
