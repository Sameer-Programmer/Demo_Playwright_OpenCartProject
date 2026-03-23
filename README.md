# 🚀 Demo Playwright OpenCart Project

[![Playwright](https://img.shields.io/badge/Playwright-v1.58.2-brightgreen)](https://playwright.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-v5.0.4-blue)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-v18+-green)](https://nodejs.org/)
[![npm](https://img.shields.io/badge/npm-v9+-red)](https://www.npmjs.com/)
[![GitHub Actions](https://github.com/Sameer-Programmer/Demo_Playwright_OpenCartProject/actions/workflows/playwright.yml/badge.svg)](https://github.com/Sameer-Programmer/Demo_Playwright_OpenCartProject/actions/workflows/playwright.yml)

This repository showcases a robust Playwright automation framework meticulously crafted for testing an OpenCart e-commerce application. It's designed with best practices in mind, leveraging **TypeScript** for enhanced code quality and the **Page Object Model (POM)** for better maintainability and scalability. 🧪

## 📚 Table of Contents

- [✨ Features](#-features)
- [🚀 Getting Started](#-getting-started)
  - [✅ Prerequisites](#-prerequisites)
  - [🛠️ Installation](#%EF%B8%8F-installation)
- [⚙️ Configuration](#%EF%B8%8F-configuration)
- [📂 Project Structure](#-project-structure)
- [▶️ Running Tests](#%EF%B8%8F-running-tests)
- [📊 Reporting](#-reporting)
- [🔄 CI/CD Integration](#-cicd-integration)
- [🤝 Contributing](#-contributing)

## ✨ Features

This framework is packed with powerful features to streamline your test automation efforts:

-   **Playwright**: 🌐 A cutting-edge end-to-end testing framework for modern web applications, ensuring reliable and fast test execution.
-   **TypeScript**: ✍️ Enhances code quality, readability, and maintainability with static typing, catching errors early in the development cycle.
-   **Page Object Model (POM)**: 🏗️ Implements POM to separate page-specific logic from test scripts, making the suite easier to maintain.
-   **Centralized Configuration**: ⚙️ Manage application URLs, credentials, and test data in a single `test.config.ts` file for easy maintenance.
-   **Data-Driven Testing**: 📊 Supports reading test data from various sources like **JSON** and **CSV** files, powered by custom utilities.
-   **Random Data Generation**: 🎲 Integrates `@faker-js/faker` via `RandomDataUtil` to generate realistic and dynamic test data (names, emails, addresses, etc.) on the fly.
-   **Comprehensive Reporting**: 📈 Multi-reporter setup including Allure, HTML, Dot, and List reporters for detailed test analysis.
-   **Cross-Browser Testing**: 🌍 Configured to execute tests across major browsers including Chromium, Firefox, and WebKit.
-   **GitHub Actions**: 🚀 Automated test execution on every push and pull request, enabling continuous integration.

## 🚀 Getting Started

Follow these simple steps to get the Playwright test suite up and running on your local machine.

### ✅ Prerequisites

Before you begin, ensure you have the following software installed:

> [!NOTE]
> -   **Node.js**: Version 18 or higher. Verify your installation with `node -v`.
> -   **npm**: Node Package Manager, which comes bundled with Node.js. Verify with `npm -v`.

### 🛠️ Installation

1.  **Clone the repository**:

    ```bash
    git clone https://github.com/Sameer-Programmer/Demo_Playwright_OpenCartProject.git
    cd Demo_Playwright_OpenCartProject
    ```

2.  **Install project dependencies**:

    ```bash
    npm install
    ```

3.  **Install Playwright browsers**:

    ```bash
    npx playwright install
    ```

## ⚙️ Environment Configuration & Credential Management

The framework uses a **Multi-Environment Credential Management System** to safely handle multiple environments (`dev`, `qa`, `preprod`, `prod`) without hardcoding any secrets.

### Local Execution (`.env`)
1. An `.env` file (ignored by Git) lives at the project root.
2. It contains credentials and URLs for all environments using prefixes (e.g., `QA_USERNAME`, `QA_PASSWORD`).
3. You select the active environment by changing the `ENV=qa` variable at the top of the `.env` file.
4. **Important**: Never commit real credentials! Use the `.env.example` file as a template.

### Playwright Integration (`env.config.ts`)
The `config/env.config.ts` file dynamically loads the appropriate variables based on the active `ENV`. 
Playwright automatically sets the `baseURL` in `playwright.config.ts` so your test scripts only need to use relative paths (e.g., `page.goto('/login')`).

If you need credentials in your tests, simply import the config manager:
```typescript
import { getEnvConfig } from './config/env.config';
const config = getEnvConfig();

// Use config.username, config.password, etc.
```
## 📂 Project Structure

This project adopts a well-organized structure to keep tests, page objects, and utilities neatly separated:

```
Demo_Playwright_OpenCartProject/
├── pages/                         # Page Object Model (POM) classes
│   ├── HomePage.ts                # Locators and actions for the Home page
│   └── RegistrationPage.ts        # Locators and actions for the Registration page
├── utils/                         # Utility classes and helper functions
│   ├── RandomDataGenerator.ts     # Faker-based random data generation
│   └── dataPovider.ts             # JSON and CSV data reading utilities
├── tests/                         # All test files
│   └── example.spec.ts            # Example Playwright test
├── playwright.config.ts           # Main Playwright test configuration
├── test.config.ts                 # Application-specific test configuration
├── package.json                   # Project metadata and dependencies
├── Basic.ts                       # Framework design notes and instructions
└── README.md                      # This README file
```

## ▶️ Running Tests

Tests can be executed using the Playwright Test Runner. The `playwright.config.ts` is configured with a 30-second timeout and runs tests sequentially (`fullyParallel: false`) for better stability.

-   **Run all tests**:

    ```bash
    npx playwright test
    ```

-   **Run tests on a specific browser (e.g., Chromium)**:

    ```bash
    npx playwright test --project=chromium
    ```

-   **Run tests in UI mode (interactive)**:

    ```bash
    npx playwright test --ui
    ```

## 📊 Reporting

This framework provides multiple reporting options:

-   **HTML Reports**: 📄 View the interactive report with `npx playwright show-report`.
-   **Allure Reports**: 📊 Rich, interactive reports generated via `allure-playwright`.
-   **Console Reporters**: 💻 `dot` and `list` reporters for real-time feedback in the terminal.

## 🔄 CI/CD Integration (GitHub Actions & Jenkins)

This project supports seamless execution across local and CI environments using the same codebase, securely injecting credentials dynamically.

### GitHub Actions
The `.github/workflows/playwright.yml` pipeline triggers on push, pull requests, and manual dispatches (where you can select the target environment).
- **Secrets Management**: It maps GitHub Repository Secrets (e.g., `${{ secrets.QA_PASSWORD }}`) directly into the runner's environment variables. 
- Playwright automatically consumes these instead of looking for the `.env` file.

### Jenkins Pipeline
The project includes a declarative `Jenkinsfile` for Jenkins CI.
- **Environment Selection**: Uses a manual UI dropdown parameter to select the target environment (`dev`, `qa`, `preprod`, `prod`).
- **Secrets Management**: It pulls credentials natively from the Jenkins Credentials Vault using the `credentials('QA_PASSWORD')` binding syntax, meaning passwords never appear in logs or source control.

--- 

**Happy Testing!** 🎉
