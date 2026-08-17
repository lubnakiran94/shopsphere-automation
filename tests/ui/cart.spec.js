import { test, expect } from "../../fixtures/baseTest";

test("TC-CART-001 - Added product appears in cart", async ({
    productPage,
    cartPage
}) => {

    await productPage.gotoProducts();

    await productPage.addProductToCart(
        "Sauce Labs Backpack"
    );

    await cartPage.gotoCart();

    await expect(
        cartPage.cartItemNames
    ).toContainText(
        "Sauce Labs Backpack"
    );

});

test("TC-CART-002 - Cart contains correct item count", async ({
    productPage,
    cartPage
}) => {

    await productPage.gotoProducts();

    await productPage.addProductToCart(
        "Sauce Labs Backpack"
    );

    await productPage.addProductToCart(
        "Sauce Labs Bike Light"
    );

    await cartPage.gotoCart();

    await expect(
        cartPage.cartItems
    ).toHaveCount(2);

});

test("TC-CART-003 - Product price remains consistent in cart", async ({
    productPage,
    cartPage
}) => {

    await productPage.gotoProducts();

    const productPrice =
        await productPage.productPrices
            .first()
            .textContent();

    await productPage.addProductToCart(
        "Sauce Labs Backpack"
    );

    await cartPage.gotoCart();

    const cartPrice =
        await cartPage.cartItemPrices
            .first()
            .textContent();

    expect(cartPrice).toBe(productPrice);

});

test("TC-CART-004 - User can remove product from cart", async ({
    productPage,
    cartPage
}) => {

    await productPage.gotoProducts();

    await productPage.addProductToCart(
        "Sauce Labs Backpack"
    );

    await cartPage.gotoCart();

    await expect(
        cartPage.cartItems
    ).toHaveCount(1);

    await cartPage.removeProduct(
        "Sauce Labs Backpack"
    );

    await expect(
        cartPage.cartItems
    ).toHaveCount(0);

});

test("TC-CART-005 - User can manage multiple cart items", async ({
    productPage,
    cartPage
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

    await cartPage.gotoCart();

    await expect(
        cartPage.cartItems
    ).toHaveCount(3);

    await cartPage.removeProduct(
        "Sauce Labs Bike Light"
    );

    await expect(
        cartPage.cartItems
    ).toHaveCount(2);

});

test("TC-CART-006 - Cart item verification", async ({
    productPage,
    cartPage
}) => {

    await productPage.gotoProducts();

    await productPage.addProductToCart(
        "Sauce Labs Backpack"
    );

    await productPage.addProductToCart(
        "Sauce Labs Bike Light"
    );


    await cartPage.gotoCart();

    await expect(
        cartPage.cartItems
    ).toHaveCount(2);

    const names = await cartPage.getItemNames();

    expect(names).toContain("Sauce Labs Backpack");
    expect(names).toContain("Sauce Labs Bike Light");

});

test("TC-CART-007 - Remove all products", async ({
    productPage,
    cartPage
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

    await cartPage.gotoCart();

    await expect(
        cartPage.cartItems
    ).toHaveCount(3);

    await cartPage.removeProduct(
        "Sauce Labs Bike Light"
    );

     await cartPage.removeProduct(
        "Sauce Labs Bolt T-Shirt"
    );
    await cartPage.removeProduct(
        "Sauce Labs Backpack"
    );

    await expect(
        cartPage.cartItems
    ).toHaveCount(0);

});


test("TC-CART-008 - Continue Shopping", async ({
    productPage,
    cartPage,
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

    await cartPage.gotoCart();

    await expect(
        cartPage.cartItems
    ).toHaveCount(3);

    await cartPage.continueShopping();

     await expect(page).toHaveURL(
        /inventory\.html/
    );

});