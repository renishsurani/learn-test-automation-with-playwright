import { expect } from "@playwright/test";
require("dotenv").config();

export class AuthFunctions{

    // The constructor function
    constructor (page){
        this.page = page;
    }

    // The LogIn function to login as an admin user
    async LogIn(email, password){
        
        await this.page.getByRole('textbox', { name: 'Username' }).fill(email);
        await this.page.getByRole('textbox', { name: 'Password' }).fill(password);
        await this.page.getByRole('button', { name: 'Login' }).click();
    }

    // The LogOut function to logout from the application
    async LogOut() {
        await this.page.getByRole('banner').getByRole('img', { name: 'profile picture' }).click();
        await this.page.getByRole('menuitem', { name: 'Logout' }).click();
        await expect(this.page.getByRole('heading', { name: 'Login' })).toBeVisible();
    }
} 