import { test, expect } from "../../fixtures/baseTest";

const products = [
    {
        title: "QA Product",
        price: 100,
        category: "testing"
    },
    {
        title: "Playwright Product",
        price: 250,
        category: "automation"
    },
    {
        title: "API Product",
        price: 500,
        category: "api"
    }
];

for (const product of products) {

    test(
        `API-025 - Create ${product.title}`,
        async ({ apiClient }) => {

            const response =
                await apiClient.createProduct(product);

            expect(response.status()).toBe(201);

            const body =
                await response.json();

            expect(body.title)
                .toBe(product.title);

            expect(body.price)
                .toBe(product.price);

        }
    );
}