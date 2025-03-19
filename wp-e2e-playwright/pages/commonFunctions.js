import { expect } from "@playwright/test";
require("dotenv").config();

export class CommonFunctions {
    constructor(page) {
        this.page = page;
    }

    // Function to navigate to the admin page
    async goToAdminPage() {
        await this.page.goto("/wp-admin");
    }

    // Function to log out from the WordPress
    async logOut(){
        await this.page.goto("wp-login.php?action=logout");
        if (await this.page.getByRole('link', { name: 'log out' }).isVisible()) {
            await this.page.getByRole('link', { name: 'log out' }).click();
        }
    }

    // Function to log in to the WordPress
    async logIn(username, password){
        await this.page.goto("/wp-login.php");
        await this.page.getByRole('textbox', { name: 'Username or Email Address' }).fill(username);
        await this.page.getByRole('textbox', { name: 'Password' }).fill(password);
        await this.page.getByRole('button', { name: 'Log In' }).click();
        await this.page.waitForTimeout(1000);
    }
}
