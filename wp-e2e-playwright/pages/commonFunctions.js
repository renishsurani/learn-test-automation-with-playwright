import { expect } from "@playwright/test";
require("dotenv").config();

export class CommonFunctions {
    constructor(page) {
        this.page = page;
    }
    async goToAdminPage() {
        await this.page.goto("/wp-admin");
    }
}
