# 🛠️ Building a Multi-Environment `.env` Setup from Scratch

This tutorial will guide you through the process of setting up a robust multi-environment configuration using `.env` files and the `dotenv` library in a Playwright TypeScript project. This approach ensures secure credential management and flexible testing across different environments (e.g., development, QA, production).

## 1. Understanding the Need for Multi-Environment Configuration

In test automation, it's common to run tests against different environments, each with its own unique URLs, login credentials, and other configurations. Hardcoding these values directly into your test scripts is a bad practice because:

*   **Security Risk**: Sensitive information like passwords can be exposed in your codebase.
*   **Maintainability Issues**: Changes to environment details require modifying code, leading to frequent updates and potential errors.
*   **Flexibility**: It's difficult to switch between environments without code changes.

The solution is to externalize these configurations using environment variables, managed efficiently with `.env` files and the `dotenv` library.

## 2. Prerequisites

Before you begin, ensure you have:

*   **Node.js**: Version 18 or higher installed.
*   **npm**: Node Package Manager (comes with Node.js).
*   A Playwright TypeScript project (like the `Demo_Playwright_OpenCartProject`).

## 3. Core Concepts: `.env` and `dotenv`

*   **Environment Variables**: Dynamic named values that can affect the way running processes behave on a computer. They are external to the application code.
*   **`.env` File**: A plain text file that contains key-value pairs of environment variables specific to a project. It's typically located at the root of your project and is **never committed to version control** (e.g., Git).
*   **`dotenv` Library**: A zero-dependency module that loads environment variables from a `.env` file into `process.env`. This allows your application to access these variables as if they were set directly in the shell.

## 4. Step-by-Step Implementation

Let's build the multi-environment setup from scratch.

### Step 4.1: Install `dotenv`

First, navigate to your project's root directory in the terminal and install the `dotenv` package:

```bash
npm install dotenv
```

### Step 4.2: Create the `.env` File

At the root of your project, create a file named `.env`. This file will hold your environment-specific credentials. For a multi-environment setup, we'll use a naming convention that includes the environment name as a prefix.

**`.env` content (example):**

```ini
# Development Environment
DEV_URL=http://localhost:8080/opencart/upload/
DEV_USERNAME=dev_user@example.com
DEV_PASSWORD=dev_password

# QA Environment
QA_URL=https://qa.opencart.com/
QA_USERNAME=qa_user@example.com
QA_PASSWORD=qa_password

# Pre-Production Environment
PREPROD_URL=https://preprod.opencart.com/
PREPROD_USERNAME=preprod_user@example.com
PREPROD_PASSWORD=preprod_password

# Production Environment
PROD_URL=https://www.opencart.com/
PROD_USERNAME=prod_user@example.com
PROD_PASSWORD=prod_password
```

**Important**: Add `.env` to your `.gitignore` file immediately to prevent it from being committed to your repository:

**`.gitignore` content (add this line):**

```
.env
```

### Step 4.3: Create `.env.example`

To provide a template for other developers and to document the required environment variables without exposing sensitive data, create a `.env.example` file. This file should contain the same keys as `.env` but with placeholder values.

**`.env.example` content:**

```ini
# Development Environment
DEV_URL=
DEV_USERNAME=
DEV_PASSWORD=

# QA Environment
QA_URL=
QA_USERNAME=
QA_PASSWORD=

# Pre-Production Environment
PREPROD_URL=
PREPROD_USERNAME=
PREPROD_PASSWORD=

# Production Environment
PROD_URL=
PROD_USERNAME=
PROD_PASSWORD=
```

### Step 4.4: Create `config/env.config.ts`

This file will be responsible for loading the environment variables from the `.env` file (if running locally) and providing a structured configuration object to your Playwright tests. Create a new directory `config` at the root of your project, and inside it, create `env.config.ts`.

**`config/env.config.ts` content:**

```typescript
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables from .env file
// This ensures that process.env is populated with values from .env
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

interface EnvConfig {
  environment: string;
  baseURL: string;
  username: string;
  password: string;
}

export const getEnvConfig = (): EnvConfig => {
  // Determine the environment, fallback to 'qa' if not provided
  // The ENV variable can be set in the shell or CI/CD pipeline
  const environment = process.env.ENV?.toLowerCase() || 'qa';

  // Build the dynamic keys based on the environment prefix (e.g., QA_URL, DEV_USERNAME)
  const envPrefix = environment.toUpperCase();

  // Fetch the correct set of variables from process.env
  const config = {
    environment,
    baseURL: process.env[`${envPrefix}_URL`] || '',
    username: process.env[`${envPrefix}_USERNAME`] || '',
    password: process.env[`${envPrefix}_PASSWORD`] || '',
  };

  // Basic validation to ensure credentials are not empty
  if (!config.baseURL || !config.username || !config.password) {
    throw new Error(`\n⚠️ Missing credentials for environment: ${environment.toUpperCase()}!
         Please ensure ${envPrefix}_URL, ${envPrefix}_USERNAME, and ${envPrefix}_PASSWORD are set in your .env file or CI/CD secrets.\n`);
  }

  return config;
};
```

**Explanation:**

*   `dotenv.config()`: This line loads the variables from your `.env` file into `process.env`. The `path.resolve` ensures it finds the `.env` file correctly from any execution context.
*   `getEnvConfig()`: This function is the core of the dynamic configuration.
    *   It reads `process.env.ENV` to determine the active environment. If `ENV` is not set, it defaults to `qa`.
    *   It then constructs the appropriate environment variable names (e.g., `QA_URL`, `DEV_USERNAME`) using the `envPrefix`.
    *   It retrieves the values for `baseURL`, `username`, and `password` from `process.env`.
    *   It includes a validation step to ensure that the required credentials are not missing, providing a clear error message if they are.

### Step 4.5: Integrate with `playwright.config.ts`

Now, modify your `playwright.config.ts` file to use the `getEnvConfig` function to dynamically set the `baseURL` for your tests.

**`playwright.config.ts` content (relevant sections):**

```typescript
import { defineConfig, devices } from '@playwright/test';
import { getEnvConfig } from './config/env.config'; // Import our env config utility

// Load our environment configuration dynamically at the start
const envState = getEnvConfig();

export default defineConfig({
  // ... other configurations

  use: {
    // Set the baseURL dynamically from the loaded environment configuration
    baseURL: envState.baseURL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    headless: false,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    permissions: ['geolocation'],
  },

  // ... other configurations
});
```

**Explanation:**

*   `import { getEnvConfig } from './config/env.config';`: Imports the function we just created.
*   `const envState = getEnvConfig();`: Calls the function to get the environment-specific configuration object.
*   `baseURL: envState.baseURL,`: Uses the `baseURL` from `envState` to configure Playwright. This means Playwright will automatically navigate to the correct base URL for the chosen environment.

### Step 4.6: Using Credentials in Your Tests

You can now access the environment-specific credentials (username, password) directly in your test files by importing `getEnvConfig`.

**Example (`tests/Login.spec.ts` - relevant sections):**

```typescript
import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { HomePage } from "../pages/HomePage";
import { MyAccountPage } from "../pages/MyAccountPage";
import { getEnvConfig } from "../config/env.config"; // Import env config

let homePage: HomePage;
let loginpage: LoginPage;
let accountPage: MyAccountPage;
let envConfig: ReturnType<typeof getEnvConfig>; // Type for our env config

test.beforeEach("BeforeEachHook", async ({ page }) => {
    envConfig = getEnvConfig(); // Load env config
    await page.goto(envConfig.baseURL); // Navigate using dynamic baseURL
    loginpage = new LoginPage(page);
    homePage = new HomePage(page);
    accountPage = new MyAccountPage(page);
});

test("Login with valid credentials @master @sanity @regression @smoke", async ({ page }) => {
    await homePage.clickMyAccount();
    await homePage.clickLogin();
    // Use dynamic username and password
    await loginpage.loginOperation(envConfig.username, envConfig.password);
    await expect(accountPage.myAccountHeading).toBeVisible();
});
```

**Explanation:**

*   `import { getEnvConfig } from "../config/env.config";`: Imports the configuration function.
*   `envConfig = getEnvConfig();`: Retrieves the environment configuration.
*   `await page.goto(envConfig.baseURL);`: Uses the dynamic `baseURL` for navigation.
*   `await loginpage.loginOperation(envConfig.username, envConfig.password);`: Passes the dynamic username and password to the login operation.

### Step 4.7: Running Tests with Different Environments

To run your tests against a specific environment, you simply need to set the `ENV` environment variable before executing your Playwright tests.

**Example commands:**

*   **Run against QA environment (default if `ENV` is not set):**
    ```bash
    npx playwright test
    ```

*   **Run against Development environment:**
    ```bash
    ENV=dev npx playwright test
    ```

*   **Run against Production environment:**
    ```bash
    ENV=prod npx playwright test
    ```

## 5. CI/CD Integration (Brief Overview)

This `.env` setup seamlessly integrates with CI/CD pipelines like GitHub Actions and Jenkins. Instead of using a `.env` file, CI/CD systems provide mechanisms to securely inject environment variables.

*   **GitHub Actions**: You define repository secrets (e.g., `QA_URL`, `DEV_USERNAME`) in your GitHub repository settings. In your workflow YAML file (`.github/workflows/playwright.yml`), you map these secrets to environment variables that `env.config.ts` can read.

    ```yaml
    jobs:
      test:
        env:
          ENV: ${{ github.event.inputs.env || 'qa' }}
          QA_URL: ${{ secrets.QA_URL }}
          QA_USERNAME: ${{ secrets.QA_USERNAME }}
          QA_PASSWORD: ${{ secrets.QA_PASSWORD }}
          # ... other environment secrets
        steps:
          # ... test steps
    ```

*   **Jenkins**: Similar to GitHub Actions, Jenkins uses its Credentials Store to manage sensitive information. In your `Jenkinsfile`, you can retrieve these credentials and expose them as environment variables for your pipeline.

    ```groovy
    pipeline {
        agent any
        parameters {
            choice(name: 'ENVIRONMENT', choices: ['qa', 'dev', 'preprod', 'prod'], description: 'Select the target environment')
        }
        environment {
            ENV = "${params.ENVIRONMENT}"
            QA_URL = credentials('QA_URL')
            QA_USERNAME = credentials('QA_USERNAME')
            QA_PASSWORD = credentials('QA_PASSWORD')
            // ... other environment credentials
        }
        // ... stages
    }
    ```

In both CI/CD scenarios, the `env.config.ts` file remains unchanged, as it simply reads from `process.env`, whether those variables come from a local `.env` file or from the CI/CD pipeline's injected secrets.

## 6. Best Practices

*   **Security First**: Never commit your `.env` file to version control. Always use `.gitignore`.
*   **Consistent Naming**: Use a clear and consistent naming convention for your environment variables (e.g., `ENV_NAME_VARIABLE_NAME`).
*   **Validation**: Implement validation in `getEnvConfig` to ensure all necessary variables are present for the selected environment.
*   **Documentation**: Keep your `.env.example` and other documentation up-to-date.
*   **Avoid Redundancy**: If `test.config.ts` has similar variables, consider if they can be fully managed by the `.env` system for better consistency.

By following these steps, you can effectively build and manage a secure and flexible multi-environment configuration for your Playwright automation framework, making it adaptable to various testing needs.

## References

[1] `dotenv` npm package. *npm*. Available at: [https://www.npmjs.com/package/dotenv](https://www.npmjs.com/package/dotenv)
[2] Playwright Documentation. *Playwright*. Available at: [https://playwright.dev/](https://playwright.dev/)
[3] TypeScript Documentation. *TypeScript*. Available at: [https://www.typescriptlang.org/](https://www.typescriptlang.org/)
