// @ts-check
import { test, expect } from '@playwright/test';
require("dotenv").config();

const { AuthFunctions } = require("../pages/authFunctions");
const { SearchEmployee } = require("../pages/searchEmployee");

test.describe('Scenarios: 2 Admin Login and Employee Search', () => {
  test('Admin login', async ({ page }) => {

    // Create an instance of the AuthFunctions and SearchEmployee classes
    const AuthFunction = new AuthFunctions(page);
    const SearchEmployeeFunction = new SearchEmployee(page);

    // Navigate to the base URL
    await page.goto(process.env.BASE_URL);

    // Call the AdminLogin function from the AuthFunctions class to login as an admin
    await AuthFunction.AdminLogin(process.env.WP_USERNAME, process.env.WP_PASSWORD);

    // Call the SearchEmployeeFromList function from the SearchEmployee class to search for an employee
    await SearchEmployeeFunction.SearchEmployeeFromList('Orange');

  });
});