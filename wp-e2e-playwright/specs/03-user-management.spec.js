const { test, expect } = require("@wordpress/e2e-test-utils-playwright");
require("dotenv").config();

import { CommonFunctions } from "../pages/commonFunctions";
import { UserManagement } from "../pages/userManagement";

// Test suite for the user management
test.describe("User Management test cases", () => {

    // Variables to store the user details and order ID
    let orderId;
    const randomNumber = Math.floor(Math.random() * 999999999).toString();
    const userName = "user-" + randomNumber;
    const userEmail = userName + "@test.com";
    const userPassword = userName;

    // Before all test cases, create a customer user
    test.beforeAll("Create a customer user", async ({ requestUtils }) => {
        await requestUtils.createUser({
            username: userName,
            password: userPassword,
            email: userEmail,
            role: ["Customer"],
        });
    });

    // Customer places order test case
    test("Customer places order", async ({ page }) => {

        // Object to store the customer information
        const customerInfo = {
            firstName: "FirstName" + randomNumber,
            lastName: "LastName" + randomNumber,
            email: userEmail,
            Address: "Address" + randomNumber,
            city: "rajkot",
            pincode: "360001",
        };

        // Create the instances of the classes
        const commonFunctions = new CommonFunctions(page);
        const userManagement = new UserManagement(page);

        // Go to the admin page
        await commonFunctions.goToAdminPage();

        // Log in as the Admin user
        await commonFunctions.logOut();

        // Log in as the customer user
        await commonFunctions.logIn(userName, userPassword);

        // Place the order as the customer user
        orderId = await userManagement.customerPlaceOrder(...Object.values(customerInfo));
    });

    // Review customer order test case
    test("Review customer @user placed order", async ({ page }) => {

        // Create the instances of the classes
        const commonFunctions = new CommonFunctions(page);
        const userManagement = new UserManagement(page);

        // Login as the Admin user
        await commonFunctions.logIn(process.env.WP_USERNAME, process.env.WP_PASSWORD);

        // Verify the Order ID placed by the customer
        if(orderId){
            await userManagement.verifyOrder(orderId);
        } else {
            throw new Error("Order ID is undefined or null");
        }
    });
});