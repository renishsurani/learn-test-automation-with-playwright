import { expect } from "@playwright/test";
require("dotenv").config();

export class AuthFunctions{

    // The constructor function
    constructor (page){
        this.page = page;
    }

    // The AdminLogin function to login as an admin user
    async AdminLogin(email, password){
        
        await this.page.getByRole('textbox', { name: 'Username' }).fill(email);
        await this.page.getByRole('textbox', { name: 'Password' }).fill(password);
        await this.page.getByRole('button', { name: 'Login' }).click();
    }
} 