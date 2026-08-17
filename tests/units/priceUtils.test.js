import { describe, test, expect } from "vitest";

import {
    calculateSubtotal,
    calculateTax,
    calculateTotal
} from "../../utils/priceUtils.js";


describe("Price Utilities", () => {

    test("calculates subtotal correctly", () => {

        const items = [
            {
                name: "Backpack",
                price: 50,
                quantity: 2
            },
            {
                name: "Bike Light",
                price: 20,
                quantity: 1
            }
        ];

        expect(
            calculateSubtotal(items)
        ).toBe(120);

    });


    test("calculates tax correctly", () => {

        expect(
            calculateTax(100, 0.10)
        ).toBe(10);

    });


    test("calculates total correctly", () => {

        expect(
            calculateTotal(100, 10)
        ).toBe(110);

    });

});
test("returns zero for empty cart", () => {

    expect(
        calculateSubtotal([])
    ).toBe(0);

});

test("handles quantity greater than one", () => {

    const items = [
        {
            name: "Product",
            price: 25,
            quantity: 4
        }
    ];

    expect(
        calculateSubtotal(items)
    ).toBe(100);

});

test("rejects invalid items input", () => {

    expect(() =>
        calculateSubtotal(null)
    ).toThrow("Items must be an array");

});
