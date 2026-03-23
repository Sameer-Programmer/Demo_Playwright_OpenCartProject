# 📚 Playwright OpenCart Framework: Architecture & Implementation Guide

This document provides a comprehensive guide to understanding the architecture, design patterns, and implementation details of the `Demo_Playwright_OpenCartProject` automation framework. It is designed to help users grasp how the framework was built from scratch, enabling them to extend, maintain, and troubleshoot it effectively.

## 1. Introduction

The `Demo_Playwright_OpenCartProject` is a robust, end-to-end test automation framework built using Playwright and TypeScript. Its primary goal is to provide a scalable, maintainable, and efficient solution for testing the OpenCart e-commerce application. The framework incorporates industry best practices, including the Page Object Model (POM), data-driven testing, and multi-environment configuration, alongside seamless CI/CD integration.

## 2. Core Technologies

The framework leverages the following key technologies:

*   **Playwright**: A modern automation library for end-to-end testing of web applications. It supports Chromium, Firefox, and WebKit with a single API, offering fast, reliable, and capable automation [1].
*   **TypeScript**: A superset of JavaScript that adds static typing. This enhances code quality, readability, and maintainability by catching errors during development rather than at runtime [2].
*   **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine. It allows for server-side execution of JavaScript, which is essential for running Playwright tests and managing project dependencies [3].
*   **npm (Node Package Manager)**: The default package manager for Node.js, used to install, manage, and share project dependencies [4].

## 3. Design Patterns: Page Object Model (POM)

The **Page Object Model (POM)** is a design pattern in test automation that creates an object repository for UI elements within an application. Each web page in the application is represented as a class, and the elements on that page are defined as variables within the class. User interactions with these elements are implemented as methods within the class.

**Benefits of POM in this framework:**

*   **Code Reusability**: Page objects can be reused across multiple test cases.
*   **Maintainability**: If the UI changes, only the page object needs to be updated, not every test case that uses that element.
*   **Readability**: Test scripts become cleaner and easier to understand, as they interact with page objects rather than directly with UI elements.
*   **Reduced Duplication**: Common interactions are encapsulated within page object methods, avoiding repetitive code.

**Implementation in this framework:**

The `pages/` directory contains classes for each significant page of the OpenCart application. For example:

*   `HomePage.ts`: Manages interactions on the OpenCart home page.
*   `RegistrationPage.ts`: Handles elements and actions related to user registration.
*   `LoginPage.ts`: Encapsulates login-related elements and methods.
*   `MyAccountPage.ts`: Defines elements and actions for the user's account dashboard.

Each page class typically includes:

*   `readonly page: Page;`: An instance of Playwright's `Page` object.
*   `readonly <elementName>: Locator;`: Locators for UI elements on the page.
*   `constructor(page: Page)`: Initializes the page object with the Playwright `Page` instance.
*   `async <actionName>(): Promise<void>`: Methods that perform actions on the page (e.g., `clickLogin()`, `enterEmail(email: string)`).

## 4. Project Structure

The framework follows a well-organized directory structure to ensure clarity and maintainability:

```
Demo_Playwright_OpenCartProject/
├── .github/                       # GitHub Actions workflows for CI/CD
├── config/                        # Environment configuration files
│   └── env.config.ts              # Dynamic environment variable loader
├── pages/                         # Page Object Model (POM) classes
│   ├── HomePage.ts                # Locators and actions for the Home page
│   ├── LoginPage.ts               # Locators and actions for the Login page
│   ├── MyAccountPage.ts           # Locators and actions for the My Account page
│   └── RegistrationPage.ts        # Locators and actions for the Registration page
├── tests/                         # All test files
│   ├── Login.spec.ts              # Test cases for user login functionality
│   └── accountRegistration.spec.ts# Test cases for user registration
├── utils/                         # Utility classes and helper functions
│   ├── RandomDataGenerator.ts     # Faker-based random data generation
│   └── dataPovider.ts             # JSON and CSV data reading utilities
├── .env.example                   # Template for local environment variables
├── Basic.ts                       # Initial framework design notes
├── Jenkinsfile                    # Jenkins pipeline definition for CI/CD
├── MULTI_ENVIRONMENT_GUIDE.md     # Guide for multi-environment setup
├── package.json                   # Project metadata and dependencies
├── package-lock.json              # Exact dependency versions
├── playwright.config.ts           # Main Playwright test configuration
├── README-env-cicd-ide-prompt.md  # IDE prompt for credential management
├── README.md                      # Main project README
└── test.config.ts                 # Application-specific test configuration
```

## 5. Key Components & Implementation Details

### 5.1. `playwright.config.ts`

This is the main configuration file for Playwright. It defines global settings for the test runner, such as `timeout`, `testDir`, `retries`, `workers`, `reporter`, and `use` options for browser context. Crucially, it integrates with `config/env.config.ts` to dynamically set the `baseURL` based on the active environment.

**Key configurations:**

*   `timeout`: Sets the default timeout for each test.
*   `testDir`: Specifies the directory where test files are located.
*   `fullyParallel`: Enables or disables parallel test execution.
*   `retries`: Number of times to retry failed tests.
*   `workers`: Number of parallel workers to use for running tests.
*   `reporter`: Configures various test reporters (HTML, Allure, Dot, List).
*   `use.baseURL`: Dynamically set from `env.config.ts` to point to the correct application URL for the chosen environment.
*   `use.trace`, `use.screenshot`, `use.video`: Options for debugging and capturing test artifacts.
*   `projects`: Defines different browser configurations (e.g., Chromium, Firefox, WebKit).

### 5.2. `test.config.ts`

This file serves as an application-specific configuration hub. It centralizes common test data and credentials that are not environment-sensitive or are used as default values. This approach simplifies test data management and makes it easy to update application-specific parameters.

**Example content:**

```typescript
export class TestConfig {
    appUrl = "http://localhost/opencart/upload/"
    // Valid login credentials
    email = "pavanol@abc.com"
    password = "test@123"
    // Product details for testing
    productName = "MacBook"
    productQuantity = "2"
    totalPrice = "$1,204.00"
}
```

> **Note**: While `test.config.ts` can hold credentials, the framework's multi-environment setup (using `.env` and `env.config.ts`) is the recommended and more secure way to manage sensitive information, especially for CI/CD.

### 5.3. Multi-Environment Configuration (`config/env.config.ts` and `.env`)

This is a critical aspect of the framework, enabling secure and flexible credential management across different environments (development, QA, pre-production, production).

*   **`.env`**: A file (ignored by Git) that stores environment variables locally. It uses a flat structure with environment prefixes (e.g., `QA_URL`, `DEV_USERNAME`). A `.env.example` is provided as a template.
*   **`config/env.config.ts`**: This TypeScript file uses the `dotenv` library to load environment variables. It reads the `ENV` variable (which can be set locally or by CI/CD pipelines) and constructs a configuration object containing the `baseURL`, `username`, and `password` specific to that environment.

**How it works:**

1.  The `getEnvConfig()` function in `env.config.ts` determines the active environment (e.g., `qa`, `dev`) from `process.env.ENV`.
2.  It then dynamically retrieves the corresponding environment variables (e.g., `QA_URL`, `QA_USERNAME`, `QA_PASSWORD`).
3.  These values are then used by `playwright.config.ts` to configure the test run.

This ensures that sensitive data is never hardcoded and that the same test code can run against different environments by simply changing the `ENV` variable.

### 5.4. Page Object Model (POM) Classes (`pages/`)

As discussed in Section 3, the `pages/` directory contains classes that represent different web pages or components of the OpenCart application. Each class defines locators for UI elements and methods for interacting with them.

**Example (`LoginPage.ts`):**

```typescript
import { Page, Locator } from '@playwright/test';

export class LoginPage {
    private readonly page: Page;
    private readonly emailAddressInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;
    // ... other locators

    constructor(page: Page) {
        this.page = page;
        this.emailAddressInput = page.locator('#input-email');
        this.passwordInput = page.locator('#input-password');
        this.loginButton = page.locator('input[value="Login"]');
        // ... initialize other locators
    }

    async enterEmail(email: string): Promise<void> {
        await this.emailAddressInput.fill(email);
    }

    async enterPassword(password: string): Promise<void> {
        await this.passwordInput.fill(password);
    }

    async clickLoginButton(): Promise<void> {
        await this.loginButton.click();
    }

    async loginOperation(email: string, password: string): Promise<void> {
        await this.enterEmail(email);
        await this.enterPassword(password);
        await this.clickLoginButton();
    }
    // ... other methods
}
```

### 5.5. Utility Classes (`utils/`)

The `utils/` directory houses helper classes that provide common functionalities used across the test suite.

*   **`RandomDataGenerator.ts`**: Utilizes the `@faker-js/faker` library to generate realistic and dynamic test data (e.g., names, emails, phone numbers). This is crucial for creating unique test data for registration or other forms, preventing data conflicts and making tests more robust.

    ```typescript
    import { faker } from "@faker-js/faker"
    export class RandomDataUtil {
        static getRandomFirstname() {
            return faker.person.firstName();
        }
        static getRandomEmail() {
            return faker.internet.email();
        }
        // ... other random data generation methods
    }
    ```

*   **`dataPovider.ts`**: Provides methods to read test data from external sources like JSON and CSV files. This enables data-driven testing, where a single test script can be executed with multiple sets of input data.

    ```typescript
    import fs from 'fs';
    import { parse } from 'csv-parse/sync';

    export class DataProvider {
      static getTestDatafromJson(filePath: string) {
        let data = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
        return data
      }
      static getTestDatafromCSV(filePath: string) {
        let data = parse(fs.readFileSync(filePath),
        {
          columns:true,
          skip_empty_lines:true
        })
        return data
      }
    }
    ```

### 5.6. Test Files (`tests/`)

The `tests/` directory contains the actual Playwright test files (`.spec.ts`). These files import page objects and utilities to construct test scenarios.

**Example (`Login.spec.ts`):**

```typescript
import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { HomePage } from "../pages/HomePage";
import { TestConfig } from "../test.config";
import { MyAccountPage } from "../pages/MyAccountPage";

let homePage: HomePage;
let loginpage: LoginPage;
let config: TestConfig;
let accountPage: MyAccountPage;

test.beforeEach("BeforeEachHook", async ({ page }) => {
    config = new TestConfig();
    await page.goto(config.appUrl);
    loginpage = new LoginPage(page);
    homePage = new HomePage(page);
    accountPage = new MyAccountPage(page);
});

test('Login with valid credentials @master @sanity @regression @smoke', async ({ page }) => {
    await homePage.clickMyAccount();
    await homePage.clickLogin();
    await loginpage.loginOperation(config.email, config.password);
    await expect(accountPage.myAccountHeading).toBeVisible();
});
```

Tests are organized using Playwright's `test` and `expect` functions, and can include hooks like `test.beforeEach` for setup. Tags (e.g., `@master`, `@sanity`) are used for selective test execution.

## 6. CI/CD Integration

The framework is designed for seamless integration with Continuous Integration/Continuous Deployment (CI/CD) pipelines, ensuring automated test execution on every code change.

*   **GitHub Actions (`.github/workflows/playwright.yml`)**: This workflow automates test runs on `push` and `pull_request` events. It sets up Node.js, installs dependencies, installs Playwright browsers, and executes tests. Crucially, it securely injects environment-specific credentials from GitHub Secrets, making them available to `env.config.ts`.
*   **Jenkinsfile**: A declarative Jenkins pipeline script is provided to integrate the framework with Jenkins. It allows for parameterized builds (selecting the environment via UI), checks out the code, installs dependencies, runs tests, and archives reports. Jenkins credentials are used to securely manage environment variables.

## 7. Running Tests

Tests can be executed using the Playwright Test Runner. The `package.json` includes several npm scripts for convenience:

*   `npm run test:master`: Runs tests tagged with `@master`.
*   `npm run test:sanity`: Runs tests tagged with `@sanity`.
*   `npm run test:regression`: Runs tests tagged with `@regression`.
*   `npm run test:datadriven`: Runs tests tagged with `@datadriven`.
*   `npm run test:master:headed`: Runs `@master` tests in headed mode (browser UI visible).
*   `npm run test:sanity:debug`: Runs `@sanity` tests in debug mode.

**General commands:**

*   `npx playwright test`: Run all tests.
*   `npx playwright test --project=chromium`: Run tests on a specific browser.
*   `npx playwright test --ui`: Run tests in Playwright UI mode for interactive debugging.

## 8. Reporting

The framework is configured with multiple reporters to provide comprehensive test results:

*   **HTML Reports**: Interactive reports viewable with `npx playwright show-report`.
*   **Allure Reports**: Rich, interactive reports generated via `allure-playwright`, offering detailed test execution insights.
*   **Console Reporters**: `dot` and `list` reporters provide real-time feedback in the terminal during test execution.

## 9. Conclusion

This Playwright OpenCart framework is a testament to building a robust, scalable, and maintainable test automation solution. By adhering to design patterns like POM, implementing secure multi-environment configurations, and integrating with modern CI/CD pipelines, it provides a solid foundation for ensuring the quality of the OpenCart application. Understanding these core components and their interactions is key to effectively utilizing and extending the framework.

## References

[1] Playwright Documentation. *Playwright*. Available at: [https://playwright.dev/](https://playwright.dev/)
[2] TypeScript Documentation. *TypeScript*. Available at: [https://www.typescriptlang.org/](https://www.typescriptlang.org/)
[3] Node.js Documentation. *Node.js*. Available at: [https://nodejs.org/](https://nodejs.org/)
[4] npm Documentation. *npm*. Available at: [https://www.npmjs.com/](https://www.npmjs.com/)
