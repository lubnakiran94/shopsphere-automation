import { faker } from "@faker-js/faker";

export function createProductData() {

    return {
        title: faker.commerce.productName(),
        price: Number(
            faker.commerce.price({
                min: 10,
                max: 1000
            })
        ),
        category: faker.commerce.department()
    };
}