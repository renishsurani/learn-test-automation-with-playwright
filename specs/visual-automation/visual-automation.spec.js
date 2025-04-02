import { test, expect, Page } from "@playwright/test";
require("dotenv").config();

const { AuthFunctions } = require("../../pages/authFunctions");
const { EmployeeFunctions } = require("../../pages/employeeFunctions");

// This test suite contains visual automation tests for the OrangeHRM application
test.describe("Visual Automation Tests", () => {

    // Define variables for the page, AuthFunctions, and EmployeeFunctions
    let page;
    let AuthFunction;
    let EmployeeFunction;

    // Generate random employees information for testing
    const randomNumber = Math.floor(Math.random() * 999999999).toString();
    const Username = "playwright" + randomNumber;
    const EmployeeInfo = {
        FirstName: Username,
        LastName: Username,
        EmployeeID: randomNumber,
        Username: Username,
        Password: Username,
    };

    const randomNumber1 = Math.floor(Math.random() * 999999999).toString();
    const Username1 = "playwright" + randomNumber1;
    const EmployeeInfo1 = {
        FirstName: Username1,
        LastName: Username1,
        EmployeeID: randomNumber1,
        Username: Username1,
        Password: Username1,
    };
    
    const randomNumber2 = Math.floor(Math.random() * 999999999).toString();
    const Username2 = "playwright" + randomNumber2;
    const EmployeeInfo2 = {
        FirstName: Username2,
        LastName: Username2,
        EmployeeID: randomNumber2,
        Username: Username2,
        Password: Username2,
    };

    // It creates a new browser page, initializes the AuthFunctions, EmployeeFunctions classes and Logs in to the application before all tests
    test.beforeAll(async ({ browser }) => {
        // Launch a new browser page
        page = await browser.newPage();

        // Create an instance of the AuthFunctions class
        AuthFunction = new AuthFunctions(page);
        EmployeeFunction = new EmployeeFunctions(page);

        // Navigate to the base URL
        await EmployeeFunction.GoToBaseURL();

        // Log in using the AuthFunctions class
        await AuthFunction.LogIn(process.env.WP_USERNAME, process.env.WP_PASSWORD);
    });

    test("Verify admin dashboard @visual", async () => {

        // Wait for a specific element on the dashboard to ensure it has loaded
        await page.waitForTimeout(5000);

        // Take a screenshot of the dashboard and compare it with the baseline image
        expect(await page.screenshot()).toMatchSnapshot(
            "admin-dashboard-verification.png"
        );
    });

    test("Employee Search Results @visual", async () => {

        // Search for employees using the SearchEmployeeFromList function
        await EmployeeFunction.SearchEmployeeFromList("user");

        // Wait for the loading spinner to disappear
        await page.waitForSelector('.oxd-loading-spinner', { state: 'detached', timeout: 10000 });

        // Take a screenshot of the employee search results and compare it with the baseline image
        expect(await page.screenshot()).toMatchSnapshot(
            "employee-search-results.png"
        );

        // create a locator for the search block
        const searchBlock = await page.locator('.oxd-table-filter');

        // Take a screenshot of the search block and compare it with the baseline image
        expect(await searchBlock.screenshot()).toMatchSnapshot("employee-search-results-block.png");
    });

    test("Employee Addition and Details Page @visual", async () => {

        // Navigate to the employee addition page
        await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/pim/addEmployee');

        // Wait for the loading spinner to disappear
        await page.waitForSelector('.oxd-loading-spinner', { state: 'detached', timeout: 10000 });

        // create a locator for the add employee section
        const addEmployeeSection = page.locator(".oxd-layout-context");

        // Take a screenshot with masked dynamic elements and compare it with the baseline image
        await expect(addEmployeeSection).toHaveScreenshot({
            mask: [
                addEmployeeSection.locator('form').getByRole('textbox').nth(4),
            ],
        });

        // Call the AddNewEmployee function from the EmployeeFunctions class to add a new employee
        await EmployeeFunction.AddNewEmployee(...Object.values(EmployeeInfo));

        // Wait for the loading spinner to disappear
        await page.waitForSelector('.oxd-loading-spinner', { state: 'detached', timeout: 10000 });

        // create a locator for the employee details section
        const userInfoSection = page.locator(".oxd-layout-context");

        // Take a screenshot with masked dynamic elements and compare it with the baseline image
        await expect(userInfoSection).toHaveScreenshot({
            mask: [
                userInfoSection.locator(
                    '//div[contains(@class,"edit-employee-name")]//h6'
                ),
                userInfoSection.locator('.--name-grouped-field'),
                userInfoSection.locator('div').filter({ hasText: /^Employee IdOther Id$/ }).getByRole('textbox').first(),
            ],
        });
    });

    test("Add two new employees and Assign one employee as the supervisor of the other", async () => {

        // Call the AddNewEmployee function from the EmployeeFunction class to add a new employee
        await EmployeeFunction.AddNewEmployee(...Object.values(EmployeeInfo2));

        await EmployeeFunction.AddNewEmployee(...Object.values(EmployeeInfo1));

        // Call the AssignSupervisor function from the EmployeeFunctions class to assign a supervisor to the employee
        await EmployeeFunction.AssignSupervisor(
            EmployeeInfo2.FirstName + " " + EmployeeInfo2.LastName
        );

        // Wait for the loading spinner to disappear
        await page.waitForSelector('.oxd-loading-spinner', { state: 'detached', timeout: 10000 });

        // create a locator for the success message
        const userInfoSection = page.locator(".oxd-layout-context");

        // Take a screenshot with masked dynamic elements and compare it with the baseline image
        await expect(userInfoSection).toHaveScreenshot({
            mask: [
                userInfoSection.locator(
                    '//div[contains(@class,"edit-employee-name")]//h6'
                ),
                userInfoSection.locator(
                    'div.oxd-table-body > div > div > div:nth-child(2)'
                ),
            ],
        });
    });
});
