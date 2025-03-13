// @ts-check
import { test, expect } from "@playwright/test";
require("dotenv").config();

const { AuthFunctions } = require("../pages/authFunctions");
const { EmployeeFunctions } = require("../pages/employeeFunctions");

test.describe("Scenarios: 4 Edit Employee Details", () => {
  // generate random number and create all the necessary information for the employee
  const randomNumber = Math.floor(Math.random() * 999999999).toString();
  const Username = "playwright" + randomNumber;
  const EmployeeInfo = {
    FirstName: Username,
    LastName: Username,
    EmployeeID: randomNumber,
    Username: Username,
    Password: Username,
  };

  test("Add new employee", async ({ page }) => {
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
    await expect(page.getByText("Successfully Saved")).toBeVisible();
  });

  test("Update the personal information of added employee", async ({
    page,
  }) => {
    // Create an instance of the AuthFunctions and SearchEmployee classes
    const AuthFunction = new AuthFunctions(page);
    const EmployeeFunction = new EmployeeFunctions(page);

    // Navigate to the base URL
    EmployeeFunction.GoToBaseURL();

    // Call the AdminLogin function from the AuthFunctions class to login as an admin
    await AuthFunction.LogIn(process.env.WP_USERNAME, process.env.WP_PASSWORD);

    console.log(EmployeeInfo.FirstName);

    // Call the SearchEmployeeFromList function from the SearchEmployee class to search for an employee
    await EmployeeFunction.UpdateEmployeeInformation(EmployeeInfo.FirstName);
  });
});