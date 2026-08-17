import { test as base, expect } from "@playwright/test";
import { LoginPage } from "../Pages/LoginPage";
import { ProductPage } from "../Pages/ProductPage";
import { CartPage } from "../Pages/CartPage";
import { CheckoutPage } from "../Pages/CheckoutPage";
import { ApiClient } from "../utils/ApiClient";
import { AuthenticatedApiClient } from "../utils/AuthenticatedApiClient";

export const test = base.extend({

    loginPage: async ({ page }, use) => {

        const loginPage = new LoginPage(page);

        await use(loginPage);

    },
    productPage: async ({ page }, use) =>{
        const productPage = new ProductPage(page);

        await use(productPage);
    },
    cartPage: async ({ page }, use) =>{
        const cartPage = new CartPage(page);

        await use(cartPage);
    },
    checkoutPage: async ({ page }, use) => {

    const checkoutPage = new CheckoutPage(page);

    await use(checkoutPage);

    },
     apiClient: async ({ request }, use) => {

        const apiClient = new ApiClient(request);

        await use(apiClient);

    },
     authenticatedApi: async ({ request }, use) => {

    const apiClient = new ApiClient(request);

    const loginResponse = await apiClient.login(
        "emilys",
        "emilyspass"
    );

    expect(loginResponse.status()).toBe(200);

    const loginBody = await loginResponse.json();

    expect(loginBody.accessToken).toBeDefined();

    const token = loginBody.accessToken;

    console.log("TOKEN EXISTS:", !!token);

    const authenticatedApi =
        new AuthenticatedApiClient(
            request,
            token
        );

    await use(authenticatedApi);

    }

});

export { expect };