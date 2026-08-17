import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {

    constructor(page) {

        super(page);

        this.usernameInput = page.getByPlaceholder("Username");

        this.passwordInput = page.getByPlaceholder("Password");

        this.loginButton = page.getByRole("button", {
            name: "Login"
        });

        this.errorMessage = page.locator(
            '[data-test="error"]'
        );
    }

    async gotoLogin() {
        await this.goto("/");
    }

    async login(username, password) {

        await this.fill(
            this.usernameInput,
            username
        );

        await this.fill(
            this.passwordInput,
            password
        );

        await this.click(
            this.loginButton
        );
    }

    async getLoginError() {

        return await this.getText(
            this.errorMessage
        );
    }
}