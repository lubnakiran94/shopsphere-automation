export class CartPage {

    constructor(page) {
        this.page = page;

        this.cartItems = page.locator(
            '[data-test="inventory-item"]'
        );

        this.cartItemNames = page.locator(
            '[data-test="inventory-item-name"]'
        );

        this.cartItemPrices = page.locator(
            '[data-test="inventory-item-price"]'
        );

        this.checkoutButton = page.getByRole(
            "button",
            { name: "Checkout" }
        );

        this.continueShoppingButton = page.getByRole(
            "button",
            { name: "Continue Shopping" }
        );
    }

    async gotoCart() {

        await this.page.goto("/cart.html");

    }

    async getItemCount() {

        return await this.cartItems.count();

    }

    async getItemNames() {

        return await this.cartItemNames.allTextContents();

    }

    async getItemPrices() {

        return await this.cartItemPrices.allTextContents();

    }

    async removeProduct(productName) {

        const item = this.cartItems.filter({
            hasText: productName
        });

        await item.getByRole("button", {
            name: /Remove/
        }).click();

    }

    async checkout() {

        await this.checkoutButton.click();

    }

    async continueShopping() {

        await this.continueShoppingButton.click();

    }
}