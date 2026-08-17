import { test, expect } from "../../fixtures/baseTest";

test("TC-E2E-001 - Complete purchase flow", async ({
    page,
    productPage,
    cartPage,
    checkoutPage
}) => {

    // 1. Login
    // await page.goto("/");

    // // Because authenticated storageState is already being used,
    // // we should already be logged in.

    // await expect(page).toHaveURL(
    //     /inventory\.html/
    // );


    // 2. Products
    await productPage.gotoProducts();

    await expect(
        productPage.products
    ).toHaveCount(6);


    // 3. Add Backpack
    await productPage.addProductToCart(
        "Sauce Labs Backpack"
    );


    // 4. Open Cart
    await cartPage.gotoCart();


    // 5. Verify product
    await expect(
        cartPage.cartItemNames
    ).toContainText(
        "Sauce Labs Backpack"
    );


    // 6. Checkout
    await cartPage.checkout();


    // 7. Verify checkout page
    await expect(page).toHaveURL(
        /checkout-step-one\.html/
    );


    // 8. Enter customer information
    await checkoutPage.fillCustomerInformation(
        "Lubna",
        "QA",
        "54000"
    );


    // 9. Continue
    await checkoutPage.continueToSummary();


    // 10. Verify order summary
    await expect(page).toHaveURL(
        /checkout-step-two\.html/
    );

    await expect(
        page.getByText("Sauce Labs Backpack")
    ).toBeVisible();


    // 11. Finish
    await checkoutPage.finishOrder();


    // 12. Verify successful order
    await expect(page).toHaveURL(
        /checkout-complete\.html/
    );

    await expect(
        checkoutPage.completeMessage
    ).toBeVisible();

});