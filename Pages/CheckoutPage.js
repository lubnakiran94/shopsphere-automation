export class CheckoutPage {

    constructor(page) {
        this.page = page;

        this.firstNameInput = page.locator(
            '[data-test="firstName"]'
        );

        this.lastNameInput = page.locator(
            '[data-test="lastName"]'
        );

        this.postalCodeInput = page.locator(
            '[data-test="postalCode"]'
        );

        this.continueButton = page.getByRole(
            "button",
            { name: "Continue" }
        );

        this.finishButton = page.getByRole(
            "button",
            { name: "Finish" }
        );

        this.completeMessage = page.getByText(
            "Thank you for your order!"
        );
    }

    async fillCustomerInformation(
        firstName,
        lastName,
        postalCode
    ) {
        await this.firstNameInput.fill(firstName);

        await this.lastNameInput.fill(lastName);

        await this.postalCodeInput.fill(postalCode);
    }

    async continueToSummary() {
        await this.continueButton.click();
    }

    async finishOrder() {
        await this.finishButton.click();
    }
}