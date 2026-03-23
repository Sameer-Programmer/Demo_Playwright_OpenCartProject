# 🚀 Demo Playwright OpenCart Project

[![Playwright](https://img.shields.io/badge/Playwright-v1.58.2-brightgreen)](https://playwright.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-v5.0.4-blue)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-v18+-green)](https://nodejs.org/)
[![npm](https://img.shields.io/badge/npm-v9+-red)](https://www.npmjs.com/)
[![GitHub Actions](https://github.com/Sameer-Programmer/Demo_Playwright_OpenCartProject/actions/workflows/playwright.yml/badge.svg)](https://github.com/Sameer-Programmer/Demo_Playwright_OpenCartProject/actions/workflows/playwright.yml)

This repository showcases a robust Playwright automation framework meticulously crafted for testing an OpenCart e-commerce application. It's designed with best practices in mind, leveraging TypeScript for enhanced code quality and maintainability, ensuring a scalable and efficient test suite. 🧪

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
-   **Centralized Configuration**: ⚙️ Manage application URLs, credentials, and test data in a single `test.config.ts` file for easy maintenance.
-   **Data-Driven Testing**: 📊 Supports reading test data from various sources like CSV and Excel files, powered by `csv-parse` and `xlsx`.
-   **Test Data Generation**: 🎲 Integrates `@faker-js/faker` to generate realistic and dynamic test data on the fly.
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

## ⚙️ Configuration

The project uses a centralized configuration file `test.config.ts` to manage environment-specific settings and test data:

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

> [!TIP]
> You can easily switch between local and production environments by commenting/uncommenting the `appUrl` in `test.config.ts`.

## 📂 Project Structure

This project adopts a well-organized structure to keep tests, page objects, and utilities neatly separated:

```
Demo_Playwright_OpenCartProject/
├── .github/                       # GitHub Actions workflows
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

## 🔄 CI/CD Integration

This project is integrated with GitHub Actions to automate test execution.

> [!IMPORTANT]
> The GitHub Actions workflow (`.github/workflows/playwright.yml`) automatically triggers on every `push` and `pull_request` event. It handles the entire setup and execution process, uploading test results as artifacts for 30 days.

--- 

**Happy Testing!** 🎉
