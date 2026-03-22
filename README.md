# Demo Playwright OpenCart Project

This repository contains a Playwright automation framework designed for testing an OpenCart application. It demonstrates best practices for setting up a robust and scalable test suite using Playwright with TypeScript.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Project Structure](#project-structure)
- [Running Tests](#running-tests)
- [Reporting](#reporting)
- [CI/CD Integration](#ci/cd-integration)

## Features

This framework is equipped with the following features to facilitate comprehensive test automation:

- **Playwright**: A modern end-to-end testing framework for web applications.
- **TypeScript**: Enhances code quality and maintainability with static typing.
- **Data-Driven Testing**: Support for reading test data from CSV and Excel files using `csv-parse` and `xlsx`.
- **Test Data Generation**: Utilizes `@faker-js/faker` for generating realistic test data on the fly.
- **Allure Reports**: Integration with `allure-playwright` for generating detailed and interactive test reports.
- **HTML Reports**: Built-in Playwright HTML reporter for quick test result overviews.
- **Cross-Browser Testing**: Configured to run tests across Chromium, Firefox, and WebKit browsers.
- **GitHub Actions**: Automated test execution on push and pull requests for continuous integration.

## Getting Started

Follow these instructions to set up and run the Playwright tests on your local machine.

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 18 or higher. You can check your version using `node -v`.
- **npm**: Node Package Manager, usually installed with Node.js. You can check your version using `npm -v`.

### Installation

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

## Project Structure

The project follows a structured approach to organize tests, pages, and utilities:

```
. 
├── Basic.ts
├── package.json
├── package-lock.json
├── playwright.config.ts
└── tests
    └── example.spec.ts
```

As indicated in `Basic.ts`, a more comprehensive project structure would typically include:

-   `tests/`: Contains all test specification files.
-   `tests/data/`: Stores test data files (e.g., CSV, Excel).
-   `tests/utils/`: Contains utility functions and helper scripts.
-   `tests/fixtures/`: Playwright fixtures for test setup and teardown.
-   `tests/pages/`: Page Object Model (POM) files for web elements and interactions.
-   `reports/`: Directory for generated test reports.
-   `config/`: Configuration files for different environments.

## Running Tests

Tests can be executed using the Playwright Test Runner. The `playwright.config.ts` file is configured to run tests on Chromium, Firefox, and WebKit.

To run all tests across all configured browsers:

```bash
npx playwright test
```

To run tests on a specific browser (e.g., Chromium):

```bash
npx playwright test --project=chromium
```

To run a specific test file:

```bash
npx playwright test tests/example.spec.ts
```

## Reporting

This framework generates HTML reports by default. After running tests, you can view the report using:

```bash
npx playwright show-report
```

For Allure reports, ensure `allure-playwright` is installed and configured in `playwright.config.ts`. You can then generate and serve Allure reports.

## CI/CD Integration

The project includes a GitHub Actions workflow (`.github/workflows/playwright.yml`) that automatically runs tests on every push and pull request to the `main` and `master` branches. The workflow performs the following steps:

1.  Checks out the code.
2.  Sets up Node.js.
3.  Installs npm dependencies.
4.  Installs Playwright browsers with dependencies.
5.  Executes Playwright tests.
6.  Uploads the `playwright-report/` as an artifact for 30 days.

This ensures continuous validation of the application's functionality with every code change.
