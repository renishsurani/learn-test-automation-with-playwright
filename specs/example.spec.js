// @ts-check
import { test, expect } from '@playwright/test';
require("dotenv").config();

const { AuthFunctions } = require("../pages/authFunctions");

test('has title', async ({ page }) => {

  const AuthFunction = new AuthFunctions(page);
  
  await AuthFunction.AdminLogin('Admin', 'admin123');
  await page.waitForTimeout(1000);
});