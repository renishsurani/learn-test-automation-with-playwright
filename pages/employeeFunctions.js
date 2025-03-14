import { expect } from "@playwright/test";
require("dotenv").config();

export class EmployeeFunctions {
  // The constructor function
  constructor(page) {
    this.page = page;
  }

  // The GoToBaseURL function to navigate to the base URL
  async GoToBaseURL() {
    // Check if the BASE_URL is defined in the environment variables
    if (!process.env.BASE_URL) {
      throw new Error("BASE_URL is not defined in the environment variables");
    }

    // Navigate to the base URL
    await this.page.goto(process.env.BASE_URL);
  }

  // The SearchEmployeeFromList function
  async SearchEmployeeFromList(name) {
    // Navigate to the PIM page and search for an employee by name
    await this.page.getByRole("link", { name: "PIM" }).click();
    await this.page.getByRole("textbox", { name: "Type for hints..." }).first().fill(name);
    await this.page.getByRole("button", { name: "Search" }).click();
    await this.page.waitForTimeout(1000);
  }

  async UpdateEmployeeInformation(name) {

    const updatedName = name + "Updated";

    await this.SearchEmployeeFromList(name);

    // click on the edit button of the employee
    await this.page.locator('//*[@id="app"]/div[1]/div[2]/div[2]/div/div[2]/div[3]/div/div[2]/div[1]/div/div[9]/div/button[1]').click();

    // Update the employee information
    await this.page.getByRole("textbox", { name: "First Name" }).click();
    await this.page.getByRole("textbox", { name: "First Name" }).fill(updatedName);
    await this.page.getByRole("textbox", { name: "Last Name" }).click();
    await this.page.getByRole("textbox", { name: "Last Name" }).fill(updatedName);

    await this.page.getByText("Female").click();

    await this.page.waitForTimeout(10000);
    // Click on the save button to save the updated information
    await this.page.locator('form').filter({ hasText: 'Employee Full NameEmployee' }).getByRole('button').click();


    await expect(this.page.getByText("SuccessSuccessfully Updated×")).toBeVisible();
  }

  // The AddNewEmployee function to add a new employee
  async AddNewEmployee(firstName, lastName, employeeID, username, password) {
    // Navigate to the Add Employee page and add a new employee with the given details
    await this.page.getByRole("link", { name: "PIM" }).click();
    await this.page.getByRole("link", { name: "Add Employee" }).click();
    await this.page.getByRole("textbox", { name: "First Name" }).fill(firstName);
    await this.page.getByRole("textbox", { name: "Last Name" }).fill(lastName);
    await this.page.locator("form").getByRole("textbox").nth(4).fill(employeeID);
    await this.page.locator("form span").click();
    await this.page.locator("div:nth-child(4) > .oxd-grid-2 > div > .oxd-input-group > div:nth-child(2) > .oxd-input").fill(username);
    await this.page.locator('input[type="password"]').first().fill(password);
    await this.page.locator('input[type="password"]').nth(1).fill(password);
    await this.page.getByRole("button", { name: "Save" }).click();
    await this.page.waitForTimeout(1000);
  }

  // The AssignLeaveToEmployee function
  async AssignLeaveToEmployee(firstname) {

    // Navigate to the Leave page and assign leave to the employee
    await this.page.getByRole('link', { name: 'Leave' }).click();
    await this.page.getByText('Entitlements').click();

    // Assign leave to the employee
    await this.page.getByRole('menuitem', { name: 'Add Entitlements' }).click();
    await this.page.getByRole('textbox', { name: 'Type for hints...' }).click();
    await this.page.getByRole('textbox', { name: 'Type for hints...' }).fill(firstname);
    await this.page.getByRole('option', { name: firstname }).click();
    await this.page.locator('form i').first().click();
    await this.page.getByRole('option', { name: 'CAN - Personal' }).click();
    await this.page.getByRole('textbox').nth(2).click();
    await this.page.getByRole('textbox').nth(2).fill('12');
    await this.page.getByRole('button', { name: 'Save' }).click();

    // Click on the confirm button to confirm the leave assignment
    await this.page.getByRole('button', { name: 'Confirm' }).click();
    await this.page.waitForTimeout(1000);
  }

  // The ApplyForLeave function
  async ApplyForLeave() {

    await this.page.waitForTimeout(1000);

    // Navigate to the Leave page and apply for leave
    await this.page.getByRole('link', { name: 'Leave', exact: true }).click();
    await this.page.getByRole('listitem').filter({ hasText: 'Apply' }).click();

    // Apply for leave
    await this.page.getByText('-- Select --').click();
    await this.page.getByText('CAN - Personal').click();
    await this.page.locator('form i').nth(2).click();
    await this.page.waitForTimeout(1000);
    await this.page.getByText('13').click();
    await this.page.locator('textarea').click();
    await this.page.locator('textarea').fill('Demo Leave');

    // Click on the apply button to apply for leave
    await this.page.getByRole('button', { name: 'Apply' }).click();
    await this.page.waitForTimeout(2000);
  }

  async ApproveEmployeeLeave(username) {

    // Navigate to the Leave page and approve the employee leave
    await this.page.getByRole('link', { name: 'Leave', exact: true }).click();
    await this.page.getByRole('listitem').filter({ hasText: 'Leave List' }).click();

    // Search for the employee leave and approve it
    await this.page.getByRole('textbox', { name: 'Type for hints...' }).click();
    await this.page.getByRole('textbox', { name: 'Type for hints...' }).fill(username);
    await this.page.getByRole('option', { name: username }).locator('span').click();
    await this.page.getByRole('button', { name: 'Search' }).click();
    await this.page.getByRole('button', { name: 'Approve' }).click();
    await this.page.waitForTimeout(1000);
  }
}
