import { test, expect } from "../../fixtures/baseTest";
import { createProductData } from "../../utils/productFactory";


test("API-011 - Get products using API client", async ({
    apiClient
}) => {

    const response =
        await apiClient.getProducts();

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.products).toBeDefined();

    expect(body.products.length)
        .toBeGreaterThan(0);

});

test("API 002 - Login using API client", async({
    apiClient
    })=>{
        const response = await apiClient.login(
             "emilys",
            "emilyspass"
        );

        expect(response.status()).toBe(200);

         const body = await response.json();
          expect(body.accessToken).toBeDefined();
  });

  test("API-013 - Get profile using token", async ({
    apiClient
}) => {
     
    const loginResponse = await apiClient.login(
            "emilys",
            "emilyspass"
        );

    expect(loginResponse.status()).toBe(200);

    const loginBody = await loginResponse.json();

    const token = loginBody.accessToken;

    const profileResponse = await apiClient.getProfile(token);

    expect(profileResponse.status()).toBe(200);

    const profile = await profileResponse.json();

    expect(profile.username).toBeDefined();
    expect(profile.email).toBeDefined();
  
});

test("API-019 - Create product with generated data", async ({
    apiClient
}) => {

    const product =
        createProductData();

    const response =
        await apiClient.createProduct(product);

    expect(response.status()).toBe(201);

    const body =
        await response.json();

    expect(body.title)
        .toBe(product.title);

    expect(body.price)
        .toBe(product.price);

    expect(body.category)
        .toBe(product.category);

});




