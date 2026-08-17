import { test, expect } from "../../fixtures/baseTest";

test("API-017 - Authenticated API client", async ({
    authenticatedApi
}) => {

    const response =
        await authenticatedApi.getProfile();

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.username).toBeDefined();
    expect(body.email).toBeDefined();

});
test("API-018 - Authenticated product request", async ({
   authenticatedApi
}) => {

    const response = await authenticatedApi.getProducts();

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.products).toBeDefined();

    expect(body.products.length)
        .toBeGreaterThan(0);

});
