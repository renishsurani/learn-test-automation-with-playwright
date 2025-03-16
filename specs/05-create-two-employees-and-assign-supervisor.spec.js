// @ts-check
import { test, expect } from "@playwright/test";
import { config } from "dotenv";
require("dotenv").config();

const { AuthFunctions } = require("../pages/authFunctions");
const { EmployeeFunctions } = require("../pages/employeeFunctions");

test.describe("Scenarios: 6 Create Two Employees and Assign Supervisor", () => {
  const randomNumber1 = Math.floor(Math.random() * 999999999).toString();
  const randomNumber2 = Math.floor(Math.random() * 999999999).toString();
  const Username1 = "playwright" + randomNumber1;
  const Username2 = "playwright" + randomNumber2;

  const EmployeeInfo1 = {
    FirstName: Username1,
    LastName: Username1,
    EmployeeID: randomNumber1,
    Username: Username1,
    Password: Username1,
  };

  const EmployeeInfo2 = {
    FirstName: Username2,
    LastName: Username2,
    EmployeeID: randomNumber2,
    Username: Username2,
    Password: Username2,
  };

  test("Add two new employees and Assign one employee as the supervisor of the other", async ({ page }) => {
    // Create an instance of the AuthFunctions and SearchEmployee classes
    const AuthFunction = new AuthFunctions(page);
    const EmployeeFunction = new EmployeeFunctions(page);

    // Navigate to the base URL
    EmployeeFunction.GoToBaseURL();

    // Call the LogIn function from the AuthFunctions class to login as an admin
    await AuthFunction.LogIn(process.env.WP_USERNAME, process.env.WP_PASSWORD);

    // Call the AddNewEmployee function from the EmployeeFunctions class to add a new employee
    await EmployeeFunction.AddNewEmployee(...Object.values(EmployeeInfo2));

    await EmployeeFunction.AddNewEmployee(...Object.values(EmployeeInfo1));

    // Call the AssignSupervisor function from the EmployeeFunctions class to assign a supervisor to the employee
    await EmployeeFunction.AssignSupervisor(
      EmployeeInfo2.FirstName + " " + EmployeeInfo2.LastName
    );

    // Verify that the employees was successfully saved
    await expect(page.getByText('SuccessSuccessfully Saved×')).toBeVisible();
  });

  test("Log in as the supervised employee to verify the supervisor assignment", async ({
    page,
  }) => {
    // Create an instance of the AuthFunctions and SearchEmployee classes
    const AuthFunction = new AuthFunctions(page);
    const EmployeeFunction = new EmployeeFunctions(page);

    // Navigate to the base URL
    EmployeeFunction.GoToBaseURL();

    // Call the LogIn function from the AuthFunctions class to login as an employee
    await AuthFunction.LogIn(EmployeeInfo1.Username, EmployeeInfo1.Password);

    // Call the VerifySupervisorAssignment function from the EmployeeFunctions class to verify the supervisor assignment
    await EmployeeFunction.VerifySupervisorAssignment(EmployeeInfo2.Username);
  });
});
