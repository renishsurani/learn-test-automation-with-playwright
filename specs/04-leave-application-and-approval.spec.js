// @ts-check
import { test, expect } from "@playwright/test";
import { config } from "dotenv";
require("dotenv").config();

const { AuthFunctions } = require("../pages/authFunctions");
const { EmployeeFunctions } = require("../pages/employeeFunctions");

test.describe("Scenarios: 5 Leave Application and Approval", () => {
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

  test("Assign leave to employee", async ({ page }) => {
    // Create an instance of the AuthFunctions and SearchEmployee classes
    const AuthFunction = new AuthFunctions(page);
    const EmployeeFunction = new EmployeeFunctions(page);

    // Navigate to the base URL
    EmployeeFunction.GoToBaseURL();

    // Call the LogIn function from the AuthFunctions class to login as an admin
    await AuthFunction.LogIn(process.env.WP_USERNAME, process.env.WP_PASSWORD);

    // Call the AssignLeaveToEmployee function from the EmployeeFunctions class to assign leave to the employee
    await EmployeeFunction.AssignLeaveToEmployee(
      EmployeeInfo.FirstName + " " + EmployeeInfo.LastName
    );

    // Verify that the leave was successfully assigned
    await expect(page.getByText("SuccessSuccessfully Saved×")).toBeVisible();
  });

  test("Login With Employee and Apply for a leave", async ({ page }) => {
    // Create an instance of the AuthFunctions and SearchEmployee classes
    const AuthFunction = new AuthFunctions(page);
    const EmployeeFunction = new EmployeeFunctions(page);

    // Navigate to the base URL
    EmployeeFunction.GoToBaseURL();

    // Call the LogIn function from the AuthFunctions class to login as an employee
    await AuthFunction.LogIn(EmployeeInfo.Username, EmployeeInfo.Password);

    // Call the ApplyForLeave function from the EmployeeFunctions class to apply for leave
    await EmployeeFunction.ApplyForLeave();

    // Verify that the leave was successfully applied
    await expect(page.getByText("SuccessSuccessfully Saved×")).toBeVisible();
  });

  test("Approve Employee Leave", async ({ page }) => {
    const AuthFunction = new AuthFunctions(page);
    const EmployeeFunction = new EmployeeFunctions(page);

    // Navigate to the base URL
    EmployeeFunction.GoToBaseURL();

    // Call the LogIn function from the AuthFunctions class to login as an admin
    await AuthFunction.LogIn(process.env.WP_USERNAME, process.env.WP_PASSWORD);

    // Call the ApproveEmployeeLeave function from the EmployeeFunctions class to approve the employee leave
    await EmployeeFunction.ApproveEmployeeLeave(EmployeeInfo.FirstName+" "+EmployeeInfo.LastName);

    // Verify that the leave was successfully approved
    await expect(page.getByText('SuccessSuccessfully Updated×')).toBeVisible();
  });
});
