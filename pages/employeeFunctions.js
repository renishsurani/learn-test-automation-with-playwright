import { expect } from "@playwright/test";
require("dotenv").config();

export class EmployeeFunctions{

    // The constructor function
    constructor (page){
        this.page = page;
    }

    // The SearchEmployeeFromList function
    async SearchEmployeeFromList(name){
        
        // Navigate to the PIM page and search for an employee by name
        await this.page.getByRole('link', { name: 'PIM' }).click();
        await this.page.getByRole('textbox', { name: 'Type for hints...' }).first().fill(name);
        await this.page.getByRole('button', { name: 'Search' }).click();

        // Verify that the employee name is displayed in the search results
        await expect(this.page.getByRole('cell', { name: name })).toHaveText(name);
    }

    // The AddNewEmployee function to add a new employee
    async AddNewEmployee(firstName, lastName, employeeID, username, password){

        // Navigate to the Add Employee page and add a new employee with the given details
        await this.page.getByRole('link', { name: 'PIM' }).click();
        await this.page.getByRole('link', { name: 'Add Employee' }).click();
        await this.page.getByRole('textbox', { name: 'First Name' }).fill(firstName);
        await this.page.getByRole('textbox', { name: 'Last Name' }).fill(lastName);
        await this.page.locator('form').getByRole('textbox').nth(4).fill(employeeID);
        await this.page.locator('form span').click();
        await this.page.locator('div:nth-child(4) > .oxd-grid-2 > div > .oxd-input-group > div:nth-child(2) > .oxd-input').fill(username);
        await this.page.locator('input[type="password"]').first().fill(password);
        await this.page.locator('input[type="password"]').nth(1).fill(password);
        await this.page.getByRole('button', { name: 'Save' }).click();

        // Verify that the employee was successfully saved
        await expect(this.page.getByText("Successfully Saved")).toBeVisible();
    }
}