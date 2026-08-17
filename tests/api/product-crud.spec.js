import { test, expect } from "../../fixtures/baseTest";

test("APIC-011 - Create products using API client", async ({
    apiClient
}) => {

    const response =
        await apiClient.createProduct(
            {
                title: "QA Automation Product",
                price: 250,
                category: "automation"
            }
        )

    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(body.title).toBeDefined();
    expect(body.price).toBeDefined();

}); 

test("APIC-012 - Update product using API client", async ({
    apiClient
}) => {

    const productId = 1;

    const res = await apiClient.updateProduct(productId, {
        title: "Updated QA Product",
        price: 500
    });

    expect(res.status()).toBe(200);

    const body = await res.json();

    expect(body.id).toBe(productId);
    expect(body.title).toBe("Updated QA Product");
    expect(body.price).toBe(500);
});

test("API-013 - Product response validation", async ({
    apiClient
}) => {

    const response = await apiClient.getProduct(1);

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(typeof body.id).toBe("number");
    expect(typeof body.title).toBe("string");
    expect(typeof body.price).toBe("number");
    expect(typeof body.category).toBe("string");

});


test("API-014 - Product not found", async ({
    apiClient
}) => {

    const response =
        await apiClient.getProduct(999999);

    expect(response.status()).toBe(404);

    const body = await response.json();

    expect(body.message).toBeDefined();

});

test("API-015 - Invalid product payload", async ({
    apiClient
}) => {

    const response =
        await apiClient.createProduct({
            price: "invalid"
        });

    console.log(response.status());

    const body = await response.json();

    console.log(body);

});

test("API-016 - Product API response performance", async ({
    apiClient
}) => {

    const start = Date.now();

    const response =
        await apiClient.getProduct(1);

    const duration = Date.now() - start;

    expect(response.status()).toBe(200);

    expect(duration).toBeLessThan(3000);

    console.log(`Response time: ${duration}ms`);

});