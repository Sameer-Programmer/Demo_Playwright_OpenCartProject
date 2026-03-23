# 💻 Local Machine Setup Guide: Running Tests with `.env` Configuration

This guide provides step-by-step instructions on how to set up and run the `Demo_Playwright_OpenCartProject` on your local machine, specifically focusing on how to utilize the multi-environment `.env` configuration. By following these instructions, you will learn how to configure your local environment to run Playwright tests against different application environments (e.g., Development, QA, Production) using environment variables.

## 1. Prerequisites

Before you begin, ensure you have the following software installed on your local machine:

*   **Node.js**: Version 18 or higher. You can download it from [nodejs.org](https://nodejs.org/). Verify your installation by running `node -v` in your terminal.
*   **npm**: Node Package Manager, which is bundled with Node.js. Verify your installation by running `npm -v` in your terminal.
*   **Git**: For cloning the repository. Download from [git-scm.com](https://git-scm.com/).
*   **A Code Editor**: Such as Visual Studio Code, for editing files.

## 2. Getting Started: Clone the Repository

First, you need to clone the `Demo_Playwright_OpenCartProject` repository to your local machine. Open your terminal or command prompt and execute the following commands:

```bash
git clone https://github.com/Sameer-Programmer/Demo_Playwright_OpenCartProject.git
cd Demo_Playwright_OpenCartProject
```

This will create a new directory named `Demo_Playwright_OpenCartProject` and navigate you into it.

## 3. Install Project Dependencies

Once inside the project directory, install all the necessary Node.js packages and Playwright browsers. This includes `dotenv`, Playwright itself, and other utilities.

```bash
npm install
npx playwright install --with-deps
```

*   `npm install`: Installs all dependencies listed in `package.json`.
*   `npx playwright install --with-deps`: Installs the Playwright browsers (Chromium, Firefox, WebKit) and their operating system dependencies.

## 4. Configure Your Local `.env` File

The framework uses a `.env` file to manage environment-specific variables, such as application URLs and login credentials. This file is crucial for running tests against different environments without modifying the code.

### Step 4.1: Create the `.env` file

In the root directory of your `Demo_Playwright_OpenCartProject` (the same directory where `package.json` is located), create a new file named `.env`. You can use the `.env.example` file as a template.

```bash
cp .env.example .env
```

### Step 4.2: Populate `.env` with Your Credentials

Open the newly created `.env` file in your code editor. You will see placeholder variables for different environments (DEV, QA, PREPROD, PROD). Populate these variables with the actual URLs, usernames, and passwords for the environments you intend to test.

**Example `.env` content (fill in your actual values):**

```ini
# Development Environment
DEV_URL=http://localhost/opencart/upload/
DEV_USERNAME=your_dev_email@example.com
DEV_PASSWORD=your_dev_password

# QA Environment
QA_URL=https://qa.opencart.com/
QA_USERNAME=your_qa_email@example.com
QA_PASSWORD=your_qa_password

# Pre-Production Environment
PREPROD_URL=https://preprod.opencart.com/
PREPROD_USERNAME=your_preprod_email@example.com
PREPROD_PASSWORD=your_preprod_password

# Production Environment
PROD_URL=https://www.opencart.com/
PROD_USERNAME=your_prod_email@example.com
PROD_PASSWORD=your_prod_password
```

> [!IMPORTANT]
> The `.env` file contains sensitive information. Ensure it is never committed to your version control system. The `.gitignore` file in this project is already configured to ignore `.env`.

## 5. Understanding `config/env.config.ts`

This file is the brain behind the multi-environment setup. It reads the `ENV` environment variable (which you will set when running tests) and then dynamically fetches the corresponding `baseURL`, `username`, and `password` from your `.env` file. This means your tests will automatically use the correct credentials for the selected environment.

You don't need to modify this file, but it's good to understand its role:

```typescript
// config/env.config.ts (simplified view)
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const getEnvConfig = () => {
  const environment = process.env.ENV?.toLowerCase() || 'qa'; // Defaults to 'qa'
  const envPrefix = environment.toUpperCase();
  const config = {
    environment,
    baseURL: process.env[`${envPrefix}_URL`] || '',
    username: process.env[`${envPrefix}_USERNAME`] || '',
    password: process.env[`${envPrefix}_PASSWORD`] || '',
  };
  // ... validation and return config
  return config;
};
```

## 6. Running Tests with Environment Variables

Now that your `.env` file is configured, you can run your Playwright tests against different environments by setting the `ENV` environment variable in your terminal command.

### 6.1. Run Tests Against the QA Environment (Default)

If you don't specify the `ENV` variable, the framework defaults to the `qa` environment. This will use `QA_URL`, `QA_USERNAME`, and `QA_PASSWORD` from your `.env` file.

```bash
npx playwright test
```

### 6.2. Run Tests Against the Development Environment

To run tests against your development environment, set `ENV=dev` before the `npx playwright test` command. This will use `DEV_URL`, `DEV_USERNAME`, and `DEV_PASSWORD`.

```bash
ENV=dev npx playwright test
```

### 6.3. Run Tests Against the Production Environment

Similarly, to run tests against the production environment, set `ENV=prod`. This will use `PROD_URL`, `PROD_USERNAME`, and `PROD_PASSWORD`.

```bash
ENV=prod npx playwright test
```

### 6.4. Running Specific Test Suites (using `package.json` scripts)

The `package.json` file includes predefined scripts for running specific test suites (e.g., `@master`, `@sanity`). You can combine these with the `ENV` variable.

*   **Run master tests on dev environment:**
    ```bash
    ENV=dev npm run test:master
    ```

*   **Run sanity tests on preprod environment in headed mode:**
    ```bash
    ENV=preprod npm run test:sanity:headed
    ```

## 7. Verification

After running your tests, you can verify that the correct environment was used by checking the test reports (e.g., HTML report) or by adding `console.log` statements in your test files to print the `baseURL` or other environment variables being used.

## 8. Troubleshooting

*   **"Missing credentials" error**: Ensure all required variables (`_URL`, `_USERNAME`, `_PASSWORD`) are present and correctly spelled in your `.env` file for the environment you are trying to run.
*   **`.env` file not loading**: Double-check that your `.env` file is in the root directory of your project and that `dotenv` is correctly installed.
*   **Incorrect URL/credentials**: Verify the values you entered in your `.env` file are accurate for the target environment.

By following this guide, you should be able to successfully set up your local machine to leverage the multi-environment `.env` configuration for your Playwright tests, allowing for flexible and secure test execution.

## References

[1] `dotenv` npm package. *npm*. Available at: [https://www.npmjs.com/package/dotenv](https://www.npmjs.com/package/dotenv)
[2] Playwright Documentation. *Playwright*. Available at: [https://playwright.dev/](https://playwright.dev/)
[3] Node.js Documentation. *Node.js*. Available at: [https://nodejs.org/](https://nodejs.org/)
