# 🚀 Test Pilot: Your First Mission

## 📖 Overview

This project is a Playwright-based test suite designed to automate the testing of various functionalities of an application. The test cases cover authentication, employee management, leave application, visual automation, and more.

## ✅ Prerequisites

Before running the tests, ensure the following requirements are installed:

- Node.js
- npm

## ⚙️ Installation

1. Clone the repository:

    ```sh
    git clone <repository-url>
    cd <repository-directory>
    ```

2. Install the dependencies:

    ```sh
    npm install
    ```

3. Install Playwright and its required browsers:

    ```sh
    npx playwright install
    ```

    This will download the necessary browser binaries (Chromium, Firefox, and WebKit) for Playwright.

## 🔧 Configuration

1. Create a `.env` file in the root directory and add the necessary environment variables:

    ```env
    WP_USERNAME=
    WP_PASSWORD=
    BASE_URL=
    ```

2. Update the `playwright.config.js` file if needed to match your test environment.

## ▶️ Running Tests

To run the Playwright test cases, use the following commands:

1. **Run all tests**:

    ```sh
    npx playwright test
    ```

    This will execute all the test cases located in the `specs` directory.

2. **Run a specific test**:

    ```sh
    npx playwright test specs/<test-file-name>.spec.js
    ```

    Replace `<test-file-name>` with the name of the test file you want to run. For example:

    ```sh
    npx playwright test specs/01-admin-login-employee-search.spec.js
    ```

3. **Run tests with a specific tag** (if tags are configured in your `playwright.config.js`):

    ```sh
    npx playwright test --grep @tagName
    ```

4. **Generate a report**:

    After running the tests, you can view the test report by opening the following file in your browser:

    ```sh
    playwright-report/index.html
    ```

## 📝 Test Case Overview

### 🔍 Scenario 1: Admin Login and Employee Search
- **File**: `01-admin-login-employee-search.spec.js`
- **Description**: Logs in as an Admin user and searches for an employee using the Employee List feature. Verifies that the employee name is displayed in the search results.

### ➕ Scenario 2: Add a New Employee
- **File**: `02-add-new-employee.spec.js`
- **Description**: Adds a new employee with mandatory details. Verifies that the employee was added successfully and that the login credentials work by logging in with the newly created account.

### ✏️ Scenario 3: Edit Employee Details
- **File**: `03-edit-employee-details.spec.js`
- **Description**: Updates the added employee’s personal information. Asserts that the changes are saved successfully.

### 🗓️ Scenario 4: Leave Application and Approval
- **File**: `04-leave-application-and-approval.spec.js`
- **Description**: Logs in as a new employee to apply for leave. Logs in as Admin to approve the leave. Verifies that the leave application and approval process works as expected.

### 👥 Scenario 5: Create Two Employees and Assign Supervisor
- **File**: `05-create-two-employees-and-assign-supervisor.spec.js`
- **Description**: Creates two employees using Admin credentials and assigns one employee as the supervisor of the other. Logs in as the supervised employee to verify the supervisor assignment.

### 🚪 Scenario 6: Logout Functionality
- **File**: `06-logout-functionality.spec.js`
- **Description**: Verifies the logout functionality for both Admin and Employee accounts.

### 📸 Scenario 7: Visual Automation Tests
- **File**: `visual-automation/visual-automation.spec.js`
- **Description**: Contains visual regression tests for the OrangeHRM application. Verifies the admin dashboard, employee search results, and employee addition details using screenshots and baseline image comparisons.

### 🛒 Scenario 8: Product Management
- **File**: `wp-e2e-playwright/specs/01-product-management.spec.js`
- **Description**: Automates the creation of a simple product in WooCommerce. Verifies that the product is published successfully.

### 🎟️ Scenario 9: Coupon Management
- **File**: `wp-e2e-playwright/specs/02-coupon-management.spec.js`
- **Description**: Automates the creation of percentage-based and fixed-amount coupons in WooCommerce. Verifies the applied discounts on products.

### 👤 Scenario 10: User Management
- **File**: `wp-e2e-playwright/specs/03-user-management.spec.js`
- **Description**: Automates the creation of a customer user, placing an order, and verifying the order as an Admin user.

## 📊 Test Reports

After running the tests, you can view the test report by opening the `playwright-report/index.html` file in your browser.

## 🔄 Continuous Integration

This project uses GitHub Actions for continuous integration. The workflow file is located at `.github/workflows/playwright.yml`.

## 📂 Folder Structure

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
    visual-automation/
        visual-automation.spec.js
        visual-automation.spec.js-snapshots/
wp-e2e-playwright/
    artifacts/
        storage-states/
            admin.json
    config/
        global-setup.js
    pages/
        commonFunctions.js
        productManagement.js
        couponManagement.js
        userManagement.js
    specs/
        01-product-management.spec.js
        02-coupon-management.spec.js
        03-user-management.spec.js
    playwright.config.js
    .env
    .gitignore
    package.json
```

## 📝 Notes

- Ensure that the `.env` file is correctly configured before running the tests.
- Visual automation tests require baseline images to compare screenshots. Ensure the baseline images are present in the `visual-automation.spec.js-snapshots` folder.