import { expect } from "@playwright/test";
require("dotenv").config();

export class SearchEmployee{

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
}