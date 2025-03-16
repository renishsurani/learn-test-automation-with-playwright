// @ts-check
import { test, expect } from "@playwright/test";
require("dotenv").config();

const { AuthFunctions } = require("../pages/authFunctions");
const { EmployeeFunctions } = require("../pages/employeeFunctions");

test.describe("Scenarios: 7 Logout Functionality", () => {
  const randomNumber = Math.floor(Math.random() * 999999999).toString();
  const Username = "playwright" + randomNumber;
  const EmployeeInfo = {
    FirstName: Username,
    LastName: Username,
    EmployeeID: randomNumber,
    Username: Username,
    Password: Username,
  };

  test("Login and logout with Admin and add new employee", async ({ page }) => {
    // Create an instance of the AuthFunctions and SearchEmployee classes
    const AuthFunction = new AuthFunctions(page);
    const EmployeeFunction = new EmployeeFunctions(page);

    // Navigate to the base URL
    EmployeeFunction.GoToBaseURL();

    // Call the LogIn function from the AuthFunctions class to login as an admin
    await AuthFunction.LogIn(process.env.WP_USERNAME, process.env.WP_PASSWORD);

    // Call the AddNewEmployee function from the EmployeeFunctions class to add a new employee
    await EmployeeFunction.AddNewEmployee(...Object.values(EmployeeInfo));

    // Verify that the employee was successfully saved
    await page.getByText("Successfully Saved").click();

    // Call the LogOut function from the AuthFunctions class to logout from the application
    await AuthFunction.LogOut();
  });

  test("Login with Admin and logout", async ({ page }) => {
    // Create an instance of the AuthFunctions and SearchEmployee classes
    const AuthFunction = new AuthFunctions(page);
    const EmployeeFunction = new EmployeeFunctions(page);

    // Navigate to the base URL
    EmployeeFunction.GoToBaseURL();

    // Call the LogIn function from the AuthFunctions class to login as a new employee user
    await AuthFunction.LogIn(EmployeeInfo.Username, EmployeeInfo.Password);
 
    // Call the LogOut function from the AuthFunctions class to logout from the application
    await AuthFunction.LogOut();
  });
});
