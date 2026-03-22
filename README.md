# 🚀 Demo Playwright OpenCart Project

[![Playwright](https://img.shields.io/badge/Playwright-v1.42.1-brightgreen)](https://playwright.dev/)
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
- [📂 Project Structure](#-project-structure)
- [▶️ Running Tests](#%EF%B8%8F-running-tests)
- [📊 Reporting](#-reporting)
- [🔄 CI/CD Integration](#-cicd-integration)
- [🤝 Contributing](#-contributing)

## ✨ Features

This framework is packed with powerful features to streamline your test automation efforts:

-   **Playwright**: 🌐 A cutting-edge end-to-end testing framework for modern web applications, ensuring reliable and fast test execution.
-   **TypeScript**: ✍️ Enhances code quality, readability, and maintainability with static typing, catching errors early in the development cycle.
-   **Data-Driven Testing**: 엑셀 Supports reading test data from various sources like CSV and Excel files, powered by `csv-parse` and `xlsx` for flexible test scenarios.
-   **Test Data Generation**: 🎲 Integrates `@faker-js/faker` to generate realistic and dynamic test data on the fly, reducing manual data creation efforts.
-   **Allure Reports**: 📈 Seamless integration with `allure-playwright` for generating rich, interactive, and comprehensive test reports, making test analysis a breeze.
-   **HTML Reports**: 📄 Utilizes Playwright's built-in HTML reporter for quick and easy overviews of test results directly in your browser.
-   **Cross-Browser Testing**: 🌍 Configured to execute tests across major browsers including Chromium, Firefox, and WebKit, ensuring broad compatibility.
-   **GitHub Actions**: 🚀 Automated test execution on every push and pull request, enabling continuous integration and immediate feedback on code changes.

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

## 📂 Project Structure

This project adopts a well-organized structure to keep tests, page objects, and utilities neatly separated:

```
Demo_Playwright_OpenCartProject/
├── .github/                       # GitHub Actions workflows
│   └── workflows/
│       └── playwright.yml         # CI/CD pipeline for Playwright tests
├── node_modules/                  # Installed Node.js modules
├── tests/                         # All test files
│   ├── example.spec.ts            # Example Playwright test
│   ├── data/                      # (Optional) Test data files (CSV, Excel)
│   ├── utils/                     # (Optional) Utility functions and helpers
│   ├── fixtures/                  # (Optional) Playwright fixtures
│   └── pages/                     # (Optional) Page Object Model (POM) files
├── playwright.config.ts           # Playwright test configuration
├── package.json                   # Project metadata and dependencies
├── package-lock.json              # Exact dependency versions
└── README.md                      # This README file
```

> [!TIP]
> The `tests/data/`, `tests/utils/`, `tests/fixtures/`, and `tests/pages/` directories are placeholders for a more comprehensive framework. You can expand them as your project grows!

## ▶️ Running Tests

Tests can be executed using the Playwright Test Runner. The `playwright.config.ts` file is pre-configured to run tests across Chromium, Firefox, and WebKit.

-   **Run all tests across all configured browsers**:

    ```bash
    npx playwright test
    ```

-   **Run tests on a specific browser (e.g., Chromium)**:

    ```bash
    npx playwright test --project=chromium
    ```

-   **Run a specific test file**:

    ```bash
    npx playwright test tests/example.spec.ts
    ```

-   **Run tests in UI mode (interactive)**:

    ```bash
    npx playwright test --ui
    ```

## 📊 Reporting

This framework provides robust reporting options to visualize your test results:

-   **HTML Reports**: 📄 Generated by default. After running tests, view the interactive report with:

    ```bash
    npx playwright show-report
    ```

-   **Allure Reports**: 📊 For more detailed and interactive reports, ensure `allure-playwright` is configured in `playwright.config.ts`. Then, you can generate and serve Allure reports (commands will vary based on your Allure setup).

## 🔄 CI/CD Integration

This project is integrated with GitHub Actions to automate test execution, ensuring code quality and preventing regressions.

> [!IMPORTANT]
> The GitHub Actions workflow (`.github/workflows/playwright.yml`) automatically triggers on every `push` and `pull_request` event to the `main` and `master` branches. It sets up Node.js, installs dependencies, installs Playwright browsers, executes tests, and uploads the `playwright-report/` as an artifact, which is retained for 30 days.

## 🤝 Contributing

Contributions are welcome! If you have suggestions for improvements, new features, or bug fixes, please feel free to open an issue or submit a pull request. See `CONTRIBUTING.md` (if available) for more details.

--- 

**Happy Testing!** 🎉
