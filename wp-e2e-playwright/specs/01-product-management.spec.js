const { test, expect } = require( '@wordpress/e2e-test-utils-playwright' );
require("dotenv").config();

import { CommonFunctions } from "../pages/commonFunctions";
import { ProductManagement } from "../pages/productManagement";

test.describe("Product Management test cases", () => {

	// Variable to store the image information
	let imageInfo = {};

	// Delete the image after all the tests are completed
	test.afterAll(async ({ requestUtils }) => {
		await requestUtils.deleteMedia(imageInfo.id);
	});

	// Test to create a simple product
	test("Create a simple @product", async ({ requestUtils, page }) => {

		// Create the instances of the classes
		const commonFunctions = new CommonFunctions(page);
		const productManagement = new ProductManagement(page);

		// Go to the admin page
		commonFunctions.goToAdminPage();

		// Generate the random number and price
		const randomNumber = Math.floor(Math.random() * 999999999).toString();
		const randomPrise = Math.floor(50 + Math.random() * 999);

		// Upload the image
		imageInfo = await requestUtils.uploadMedia("uploads/woocommerce-placeholder.png");

		// Create the product information object
		const productInfo = {
			name: ("Playwright-" + randomNumber),
			description: "This is for the testing",
			regularPrice: randomPrise.toString(),
			salePrice: (randomPrise - 20).toString(),
			sku: "50",
			tag: "E2E",
			featureImageId: imageInfo.id,
		}

		// call the createNewProduct function to create the product
		await productManagement.createNewProduct(...Object.values(productInfo));
	});
});
