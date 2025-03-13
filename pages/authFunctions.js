import { expect } from "@playwright/test";
require("dotenv").config();

export class AuthFunctions{
    constructor (page){
        this.page = page;
    }

    async AdminLogin(email, password){
        await this.page.goto(process.env.BASE_URL);
        await this.page.getByRole('textbox', { name: 'Username' }).fill(email);
        await this.page.getByRole('textbox', { name: 'Password' }).fill(password);
        await this.page.getByRole('button', { name: 'Login' }).click();
    }
} 