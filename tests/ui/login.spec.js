import { test, expect } from "../../fixtures/baseTest";
import { ENV } from "../../utils/env";
import { logger } from "../../utils/logger";
test.use({
    storageState: {
        cookies: [],
        origins: []
    }
});
test("@smokeTC-LOGIN-001 - Standard user can login", async ({
    loginPage,
    page
}) => {

    logger.info("Opening SauceDemo login page");

    await loginPage.gotoLogin();

    logger.info("Logging in with standard user");

    await loginPage.login(
        ENV.standardUser,
        ENV.standardPassword
    );

    await expect(page).toHaveURL(
        /inventory\.html/
    );

    await expect(
        page.getByText("Products")
    ).toBeVisible();

    logger.success("Standard user login successful");

});

// TC-LOGIN-002
test("@regression TC-LOGIN-002 - Invalid password", async ({
    loginPage
}) => {

    logger.info("Opening SauceDemo");

    await loginPage.gotoLogin();

    await loginPage.login(
        ENV.standardUser,
        "wrong_password"
    );

    await expect(
        loginPage.errorMessage
    ).toBeVisible();

    await expect(
        loginPage.errorMessage
    ).toContainText(
        "Username and password do not match"
    );

    logger.success("Invalid password correctly rejected");
});


// TC-LOGIN-003
test("TC-LOGIN-003 - Invalid username", async ({
    loginPage
}) => {

    logger.info("Opening SauceDemo");

    await loginPage.gotoLogin();

    await loginPage.login(
        "invalid_user",
        ENV.standardPassword
    );

    await expect(
        loginPage.errorMessage
    ).toBeVisible();

    await expect(
        loginPage.errorMessage
    ).toContainText(
        "Username and password do not match"
    );

    logger.success("Invalid username correctly rejected");
});


// TC-LOGIN-007
test("TC-LOGIN-007 - Locked user cannot login", async ({
    loginPage
}) => {

    logger.info("Opening SauceDemo");

    await loginPage.gotoLogin();

    await loginPage.login(
        "locked_out_user",
        ENV.standardPassword
    );

    await expect(
        loginPage.errorMessage
    ).toBeVisible();

    await expect(
        loginPage.errorMessage
    ).toContainText(
        "Sorry, this user has been locked out"
    );

    logger.success("Locked user correctly rejected");
});