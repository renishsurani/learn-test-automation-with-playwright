import { expect } from "@playwright/test";
require("dotenv").config();

// Class to manage the product functions
export class ProductManagement {
    constructor(page) {
        this.page = page;
    }

    // Function to create a new product in the WooCommerce
    async createNewProduct( name, description, regularPrice, salePrice, sku, tag, featureImageId ) {
        
        // Click on the Products menu and then click on the Add new product
        await this.page.locator('#menu-posts-product').getByRole('link', { name: 'Products', exact: true }).click();
        await this.page.getByRole('link', { name: 'Add new product' }).first().click();

        // Fill the product details
        await this.page.getByRole('textbox', { name: 'Product name' }).fill(name);
        await this.page.locator('#content_ifr').contentFrame().locator('#tinymce').fill(description);
        await this.page.getByRole('textbox', { name: 'Regular price (₹)' }).fill(regularPrice);
        await this.page.getByRole('textbox', { name: 'Sale price (₹)' }).fill(salePrice);
        await this.page.getByRole('link', { name: 'Inventory' }).click();
        await this.page.getByRole('textbox', { name: 'SKU' }).fill(sku);

        // Add the feature image to the product if the featureImageId is provided
        if( featureImageId ) {
            await this.page.getByRole('link', { name: 'Set product image' }).click();
            await this.page.getByRole('tab', { name: 'Media Library' }).click();
            await this.page.locator(`//li[@data-id="${featureImageId}"]`).click();
            await this.page.getByRole('button', { name: 'Set product image' }).click();
        }

        await this.page.getByRole('checkbox', { name: 'E2E test Utils' }).check();
        await this.page.getByRole('combobox', { name: 'Add new tag' }).fill(tag);

        // Publish the product and check if the product is published
        await this.page.getByRole('button', { name: 'Publish', exact: true }).click();
        await expect(this.page.getByText(/Product published. View/)).toBeVisible();
    }
}