import { test, expect } from "@playwright/test";

test("API-001 - Get products", async ({ request }) => {

    const response = await request.get(
        "https://dummyjson.com/products"
    );

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.products).toBeDefined();

    expect(body.products.length).toBeGreaterThan(0);

    expect(response.status()).toBe(200);

});

test("API-002 - Product response structure", async ({
    request
}) => {

    const response = await request.get(
        "https://dummyjson.com/products"
    );

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body).toHaveProperty("products");

    expect(body.products.length).toBeGreaterThan(0);

    const product = body.products[0];

    expect(product).toHaveProperty("id");
    expect(product).toHaveProperty("title");
    expect(product).toHaveProperty("price");
    expect(product).toHaveProperty("category");

});

test("API-003 - Product data types are valid", async ({
    request
}) => {

    const response = await request.get(
        "https://dummyjson.com/products"
    );

    expect(response.status()).toBe(200);

    const body = await response.json();

    for (const product of body.products) {

        expect(typeof product.id)
            .toBe("number");

        expect(typeof product.title)
            .toBe("string");

        expect(typeof product.price)
            .toBe("number");

        expect(typeof product.category)
            .toBe("string");

    }

});

test("API-004 - Invalid product returns 404", async ({
    request
}) => {

    const response = await request.get(
        "https://dummyjson.com/products/999999"
    );

    expect(response.status()).toBe(404);

});

test("API-005 - Create product", async ({
    request
}) => {

    const response = await request.post(
        "https://dummyjson.com/products/add",
        {
            data: {
                title: "Automation QA Product",
                price: 100
            }
        }
    );

    expect(response.status()).toBe(201);

    const body = await response.json();

    expect(body.title)
        .toBe("Automation QA Product");

    expect(body.price)
        .toBe(100);

});

test("HYBRID-001 - API product data used in UI", async ({
    request,
    page
}) => {

    const response = await request.get(
        "https://dummyjson.com/products/1"
    );

    expect(response.status()).toBe(200);

    const product = await response.json();

    console.log(
        "API Product:",
        product.title
    );

    await page.goto(
        "https://www.saucedemo.com/inventory.html"
    );

});

test("API-006 - Get a single product", async ({ request }) => {

    const response = await request.get(
        "https://dummyjson.com/products/1"
    );

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.id)
        .toBe(1); 

    expect(body.title).toBeDefined();

    expect(body.price)
        .toBeDefined();

});


test("API-007 - Search products", async ({ request }) => {

    const response = await request.get(
        "https://dummyjson.com/products/search?q=phone"
    );

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.products).toBeDefined();
    expect(body.products.length).toBeGreaterThan(0);

    expect(body.products[0].title).toBeDefined();
    expect(body.products[0].price).toBeDefined();
});

test("API-008 - Create product", async ({ request }) => {

    const response = await request.post(
        "https://dummyjson.com/products/add",
        {
            data: {
                title: "QA Automation Product",
                price: 250,
                category: "automation"
            }
        }
    );

    expect(response.status()).toBe(201);

    const body = await response.json();

    expect(body.title).toBe("QA Automation Product");

    expect(body.price)
        .toBe(250);

});

test("API-009 - Login and retrieve token", async ({ request }) => {

    const response = await request.post(
        "https://dummyjson.com/auth/login",
        {
            data: {
                username: "emilys",
                password: "emilyspass"
            }
        }
    );

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.accessToken).toBeDefined();

});


test("API-010 - token verification", async ({ request }) => {


    const response = await request.post(
        "https://dummyjson.com/auth/login",
        {
            data: {
                username: "emilys",
                password: "emilyspass"
            }
        }
    );

    expect(response.status()).toBe(200);

    const body = await response.json();

    const token = body.accessToken;

    const response2 = await request.get(
        "https://dummyjson.com/auth/me",
        {
            headers: {
                 Authorization: `Bearer ${token}`
            }
        }
    );

    expect(response2.status()).toBe(200);

    const body2 = await response2.json();

    expect(body2.username).toBeDefined();
    expect(body2.email).toBeDefined();

});


test("API-11 - Invalid token verification", async ({ request }) => {


    const response = await request.get(
        "https://dummyjson.com/auth/me",
        {
            headers: {
                 Authorization: "Bearer invalid-token"
            }
        }
    );

    expect(response.status()).toBe(401);

});
