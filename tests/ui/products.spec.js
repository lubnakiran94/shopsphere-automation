import { test, expect } from "../../fixtures/baseTest";

test("TC-PROD-001 - Products page loads", async ({  productPage }) => {

    await  productPage.gotoProducts();

    await expect(
         productPage.products
    ).toHaveCount(6);

});

test("TC-PROD-002 - Products are displayed", async ({  productPage }) => {

    await  productPage.gotoProducts();

    await expect(productPage.products).toHaveCount(6);


});

test("TC-PROD-003 - Verify product names and prices are displayed", async ({ productPage }) => {

     await productPage.gotoProducts();

    await expect(
        productPage.productNames
    ).toHaveCount(6);

    await expect(
        productPage.productPrices
    ).toHaveCount(6);

});

test("TC-PROD-004 - Products can be sorted A to Z", async ({
    productPage
}) => {

    await productPage.gotoProducts();

    await productPage.sortBy("az");

    const names =
        await productPage.getProductNames();

    const sortedNames = [...names].sort();

    expect(names).toEqual(sortedNames);

});

test("TC-PROD-005 - Products can be sorted Z to A", async ({
    productPage
}) => {

    await productPage.gotoProducts();

    await productPage.sortBy("za");

    const names =
        await productPage.getProductNames();

    const sortedNames = [...names].sort().reverse();;

    expect(names).toEqual(sortedNames);

});

test("TC-PROD-006 - Products sorted by price low to high", async ({
    productPage
}) => {

     await productPage.gotoProducts();

    await productPage.sortBy("lohi");

    const prices =
        await productPage.getProductPrices();

    const numericPrices = prices.map(price =>
        Number(price.replace("$", ""))
    );

    const sortedPrices = [...numericPrices].sort(
        (a, b) => a - b
    );

    expect(numericPrices).toEqual(
        sortedPrices
    );

});

test("TC-PROD-007 - Products sorted by price high to low", async ({
    productPage
}) => {

    await productPage.gotoProducts();

    await productPage.sortBy("hilo");

    const prices =
        await productPage.getProductPrices();

    const numericPrices = prices.map(price =>
        Number(price.replace("$", ""))
    );

    const sortedPrices = [...numericPrices].sort(
        (a, b) => b - a
    );

    expect(numericPrices).toEqual(
        sortedPrices
    );

});

test("TC-PROD-008 - User can open product details", async ({
    productPage,
    page
}) => {

    await productPage.gotoProducts();

    await productPage.selectProduct(
        "Sauce Labs Backpack"
    );

    await expect(page).toHaveURL(
        /inventory-item\.html/
    );

    await expect(
        page.getByText("Sauce Labs Backpack")
    ).toBeVisible();

});

test("TC-PROD-010 - User can add product to cart", async ({
    productPage,
    page
}) => {

    await productPage.gotoProducts();

    await productPage.addProductToCart(
        "Sauce Labs Backpack"
    );

    await expect(
        page.locator('[data-test="shopping-cart-badge"]')
    ).toHaveText("1");

});


test("TC-PROD-010 - User can add multiple products to cart", async ({
    productPage,
    page
}) => {

    await productPage.gotoProducts();

    await productPage.addProductToCart(
        "Sauce Labs Backpack"
    );

    await productPage.addProductToCart(
        "Sauce Labs Bike Light"
    );

    await productPage.addProductToCart(
        "Sauce Labs Bolt T-Shirt"
    );

    await expect(
        page.locator('[data-test="shopping-cart-badge"]')  
    ).toHaveText("3");

});

// test("TC-LOGOUT-001 - User can logout", async ({ page }) => {

//     await page.goto("/inventory.html");

//     await page.getByRole("button", {
//         name: "Open Menu"
//     }).click();

//     await page.getByRole("link", {
//         name: "Logout"
//     }).click();

//     await expect(page).toHaveURL(
//         "https://www.saucedemo.com/"
//     );

//     await expect(
//         page.getByPlaceholder("Username")
//     ).toBeVisible();

// });