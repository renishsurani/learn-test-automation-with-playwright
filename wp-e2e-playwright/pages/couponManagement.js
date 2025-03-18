import { expect } from "@playwright/test";
require("dotenv").config();

// Class to manage the coupon functions
export class CouponManagement {
    constructor(page) {
        this.page = page;
    }

    // Function to create a new coupon in the WooCommerce
    async createNewCoupon(name, description, amount, typeOfCoupon) {
        await this.page.getByRole('link', { name: 'WooCommerce' }).click();
        await this.page.locator('#toplevel_page_woocommerce').getByRole('link', { name: 'Coupons' }).click();
        await this.page.getByRole('link', { name: 'Add new coupon' }).click();

        await this.page.getByRole('textbox', { name: 'Coupon code' }).fill(name);
        await this.page.getByRole('textbox', { name: 'Description (optional)' }).fill(description);

        await this.page.getByLabel('Discount type').selectOption(typeOfCoupon);
        await this.page.getByRole('textbox', { name: 'Coupon amount' }).fill(amount);

        await this.page.getByRole('button', { name: 'Publish', exact: true }).click();
        await expect(this.page.getByText('Coupon updated.')).toBeVisible();
    }

    async calculateDiscountedPrice(originalPrice, offer, typeOfCoupon){

        // Calculate the final price based on the coupon type
        const price = parseFloat(originalPrice.replace(/[^0-9.]/g, ""));
        return typeOfCoupon === 'fixed_cart' ? price - offer : price - (price * offer / 100);
    }

    // 
    async verifyCouponDiscount(name, typeOfCoupon){
        await this.page.goto(process.env.WP_BASE_URL);

        // Navigate to Shop and add the first product to the cart
        await this.page.locator('#modal-1-content').getByRole('link', { name: 'Shop' }).click();
        await this.page.locator('//*[@id="wp--skip-link--target"]/div[4]/ul/li[1]/div[3]/button').click();

        // Go to cart page
        await this.page.goto('/cart/');
        await this.page.waitForTimeout(1000);

        // Get the original price
        const originalPrice = await this.page.locator('//*[@id="wp--skip-link--target"]/div[2]/div/div[4]/div/div/div[2]/table/tbody/tr/td[3]/div/span/span').innerText();
        const calculatedFinalPrice = await this.calculateDiscountedPrice(originalPrice, 20, typeOfCoupon);

        // Remove all applied coupons
        const coupons = this.page.locator('ul.wc-block-components-totals-discount__coupon-list li');
        while (await coupons.count() > 0) {
            await coupons.first().locator('button.wc-block-components-chip__remove').click();
            await this.page.waitForTimeout(500);
        }
        
        // Apply new coupon
        await this.page.getByRole('button', { name: 'Add a coupon' }).click();
        await this.page.getByRole('textbox', { name: 'Enter code' }).fill(name);
        await this.page.getByRole('button', { name: 'Apply' }).click();

        await this.page.waitForTimeout(1000);

        // Get the final price after coupon application
        const finalPrice = await this.page.locator('//*[@id="wp--skip-link--target"]/div[2]/div/div[4]/div/div/div[3]/div[1]/div[3]/div/div[1]/span').innerText();
        
        // Validate price calculation
        expect(calculatedFinalPrice).toEqual(parseFloat(finalPrice.replace(/[^0-9.]/g, "")));
    }
}