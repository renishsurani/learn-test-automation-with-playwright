
import { expect } from "@playwright/test";
require("dotenv").config();

// UserManagement class to handle user-related actions
export class UserManagement {
    constructor(page) {
        this.page = page;
    }

    // Function to place an order as a customer
    async customerPlaceOrder(firstName, lastName, email, address, city, pincode) {
        // Navigate to the shop page
        await this.page.locator('#modal-1-content').getByRole('link', { name: 'Shop' }).click();
        await this.page.locator('//*[@id="wp--skip-link--target"]/div[4]/ul/li[1]/div[3]/button').click();
        await this.page.waitForTimeout(1000);

        // Go to the cart page
        await this.page.getByRole('button', { name: 'item in cart' }).click();
        await this.page.getByRole('link', { name: 'Go to checkout' }).click();

        // Fill the customer details
        await this.page.getByRole('textbox', { name: 'Email address' }).fill(email);
        await this.page.getByLabel('Country/Region').selectOption('IN');
        await this.page.getByRole('textbox', { name: 'First name' }).fill(firstName);
        await this.page.getByRole('textbox', { name: 'Last name' }).fill(lastName);
        await this.page.getByRole('textbox', { name: 'Address', exact: true }).fill(address);
        await this.page.getByRole('textbox', { name: 'City' }).fill(city);
        await this.page.getByLabel('State').selectOption('GJ');
        await this.page.getByRole('textbox', { name: 'PIN Code' }).fill(pincode);
        await this.page.waitForTimeout(2000);

        // Place the order
        await this.page.getByRole('button', { name: 'Place Order' }).click();

        // Return the order ID if the order is placed successfully
        if(this.page.getByText(/Thank you. Your order has/).isVisible()){
            const orderID = await this.page.locator('//*[@id="wp--skip-link--target"]/div[2]/ul/li[1]/span[2]').innerText();
            return orderID;
        } else {
            return null;
        }
    }

    // Function to verify the order in the WooCommerce
    async verifyOrder(orderID) {
        
        // Go to Order page in WooCommerce
        await this.page.getByRole('link', { name: 'WooCommerce' }).click();
        await this.page.locator('//*[@id="toplevel_page_woocommerce"]/ul/li[3]/a').click();
        await this.page.waitForTimeout(2000);

        // Search for the order ID
        await this.page.getByRole('searchbox', { name: 'Search orders:' }).fill(orderID);
        await this.page.locator('#order-search-filter').selectOption('order_id');
        await this.page.getByRole('button', { name: 'Search orders' }).click();

        // Verify the order is visible
        await expect(this.page.locator(`//*[@data-order-id=${orderID}]`)).toBeVisible();
    }

}