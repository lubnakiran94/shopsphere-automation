import { test as setup } from "@playwright/test";
import { ENV } from "../utils/env";

const authFile = "playwright/.auth/user.json";

setup("Authenticate standard user", async ({ page }) => {

    await page.goto("/");

    await page.getByPlaceholder("Username")
        .fill(ENV.standardUser);

    await page.getByPlaceholder("Password")
        .fill(ENV.standardPassword);

    await page.getByRole("button", {
        name: "Login"
    }).click();

    await page.waitForURL(/inventory\.html/);

    await page.context().storageState({
        path: authFile
    });
});