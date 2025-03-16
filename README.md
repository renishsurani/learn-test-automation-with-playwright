# Test Pilot: Your First Mission

## Overview

This assignment is a Playwright-based test suite for testing various functionalities of an application. The test cases cover authentication, employee management, leave application, and more.

## Prerequisites

- Node.js (>=14.x)
- npm (>=6.x)

## Installation

1. Clone the repository:

    ```sh
    git clone <repository-url>
    cd <repository-directory>
    ```

2. Install the dependencies:

    ```sh
    npm install
    ```

## Configuration

1. Create a `.env` file in the root directory and add the necessary environment variables.

2. Update the `playwright.config.js` file if needed to match your test environment.

## Running Tests

To run the Playwright test cases, use the following command:

```sh
npx playwright test
```

This will execute all the test cases located in the `specs` directory.

## Test Case Overview

### Scenario 1: Admin Login and Employee Search
- Log in as an Admin user.
- Search for an employee using the Employee List feature.

### Scenario 2: Add a New Employee
- Add a new employee with mandatory details.
- Verify that the employee was added successfully.
- Verify that the login credentials work by logging in with the newly created account.

### Scenario 3: Edit Employee Details
- Update the added employee’s personal information.
- Assert that the changes are saved successfully.

### Scenario 4: Leave Application and Approval
- Log in as the new employee.
- Apply for leave.
- Log in as Admin to approve the leave.

### Scenario 5: Create Two Employees and Assign Supervisor
- Create two employees using the Admin credentials
- Assign one employee as the supervisor of the other.
- Log in as the supervised employee to verify the supervisor assignment.

### Scenario 6: Logout Functionality
- Verify logout for both Admin and Employee accounts.

## Test Reports

After running the tests, you can view the test report by opening the `playwright-report/index.html` file in your browser.

## Continuous Integration

This project uses GitHub Actions for continuous integration. The workflow file is located at `.github/workflows/playwright.yml`.

## Folder Structure

```
.env
.gitignore
package.json
playwright.config.js
.github/
    workflows/
        playwright.yml
pages/
    authFunctions.js
    employeeFunctions.js
playwright-report/
    index.html
specs/
    01-admin-login-employee-search.spec.js
    02-add-new-employee.spec.js
    03-edit-employee-details.spec.js
    04-leave-application-and-approval.spec.js
    05-create-two-employees-and-assign-supervisor.spec.js
    06-logout-functionality.spec.js
test-results/
utils/
```