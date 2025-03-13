// @ts-check
import { test, expect } from "@playwright/test";
require("dotenv").config();

const { AuthFunctions } = require("../pages/authFunctions");
const { EmployeeFunctions } = require("../pages/employeeFunctions");

test.describe("Scenarios: 2 Admin Login and Employee Search", () => {
  test("Admin login and Search Employee from name", async ({ page }) => {
    // Create an instance of the AuthFunctions and SearchEmployee classes
    const AuthFunction = new AuthFunctions(page);
    const EmployeeFunction = new EmployeeFunctions(page);

    const Name = "Orange";

    // Navigate to the base URL
    await EmployeeFunction.GoToBaseURL();

    // Call the AdminLogin function from the AuthFunctions class to login as an admin
    await AuthFunction.LogIn(process.env.WP_USERNAME, process.env.WP_PASSWORD);

    // Call the SearchEmployeeFromList function from the SearchEmployee class to search for an employee
    await EmployeeFunction.SearchEmployeeFromList(Name);
    
    // Verify that the employee name is displayed in the search results
    await expect(page.getByRole("cell", { name: Name })).toHaveText(Name);
  });
});
