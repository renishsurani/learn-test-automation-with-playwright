const { test, expect } = require( '@wordpress/e2e-test-utils-playwright' );
require("dotenv").config();

import { CommonFunctions } from "../pages/commonFunctions";
import { CouponManagement } from "../pages/couponManagement";

test.describe("Coupon Management test cases", () => {

	// Generate the random number and price
	const randomNumber = Math.floor(Math.random() * 999999999).toString();
	const persantageCouponName = ("20%off-" + randomNumber);
	const fixedCouponName = ("20flat-" + randomNumber);

	// Test to create a simple coupon
	test("Create a percentage @coupon", async ({ page }) => {

		// Create the instances of the classes
		const commonFunctions = new CommonFunctions(page);
		const couponManagement = new CouponManagement(page);

		// Go to the admin page
		await commonFunctions.goToAdminPage();

		// Create the Coupon information object
		const couponInfo = {
			name: persantageCouponName,
			description: "This is for the testing",
			amount: "20",
			typeOfCoupon: "percent"
		}

		// Create a new coupon
		await couponManagement.createNewCoupon(...Object.values(couponInfo));
	});

	test("Verify the applied percentage @coupon", async ({ page }) => {

		// Create the instances of the classes
		const couponManagement = new CouponManagement(page);

		await couponManagement.verifyCouponDiscount(persantageCouponName, "percent");
	});

	// Test to create a simple coupon
	test("Create a fixed amount @coupon", async ({ page }) => {

		// Create the instances of the classes
		const commonFunctions = new CommonFunctions(page);
		const couponManagement = new CouponManagement(page);

		// Go to the admin page
		await commonFunctions.goToAdminPage();

		// Create the Coupon information object
		const couponInfo = {
			name: fixedCouponName,
			description: "This is for the testing",
			amount: "20",
			typeOfCoupon: "fixed_cart"
		}

		// Create a new coupon
		await couponManagement.createNewCoupon(...Object.values(couponInfo));
	});

	test("Verify the applied fixed amount @coupon", async ({ page }) => {

		// Create the instances of the classes
		const couponManagement = new CouponManagement(page);

		await couponManagement.verifyCouponDiscount(fixedCouponName, "fixed_cart");
	});
});
