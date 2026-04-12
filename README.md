# 🚀 Demo Playwright OpenCart Project

[![Playwright](https://img.shields.io/badge/Playwright-v1.58.2-brightgreen)](https://playwright.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-v5.0.4-blue)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-v18+-green)](https://nodejs.org/)
[![npm](https://img.shields.io/badge/npm-v9+-red)](https://www.npmjs.com/)
[![GitHub Actions](https://github.com/Sameer-Programmer/Demo_Playwright_OpenCartProject/actions/workflows/playwright.yml/badge.svg)](https://github.com/Sameer-Programmer/Demo_Playwright_OpenCartProject/actions/workflows/playwright.yml)

This repository showcases a robust Playwright automation framework meticulously crafted for testing an OpenCart e-commerce application. It is designed with industry best practices, leveraging **TypeScript** for type safety and the **Page Object Model (POM)** for enhanced maintainability and scalability.

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

## ✨ Features

- **Playwright Test Runner**: High-performance end-to-end testing with built-in support for parallel execution, retries, and multi-browser testing.
- **TypeScript Integration**: Full type safety and modern JavaScript features for a more reliable codebase.
- **Page Object Model (POM)**: Clean separation of page-specific logic and locators from test scripts.
- **Custom Fixtures**: Advanced use of Playwright fixtures to automate page object instantiation and environment setup.
- **Multi-Environment Support**: Dynamic configuration loading for `dev`, `qa`, `preprod`, and `prod` environments.
- **Data-Driven Testing**: Built-in utilities to drive tests using **JSON** and **CSV** data sources.
- **Dynamic Data Generation**: Integration with `@faker-js/faker` for generating realistic test data on the fly.
- **Comprehensive Reporting**: Integrated with **Allure Reports** and standard Playwright HTML reports for detailed execution analysis.
- **CI/CD Ready**: Pre-configured workflows for **GitHub Actions** and **Jenkins** pipelines.

## 🚀 Getting Started

### ✅ Prerequisites

Ensure you have the following installed:
- **Node.js**: Version 18 or higher.
- **npm**: Version 9 or higher.

### 🛠️ Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Sameer-Programmer/Demo_Playwright_OpenCartProject.git
   cd Demo_Playwright_OpenCartProject
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Install Playwright browsers**:
   ```bash
   npx playwright install chromium
   ```

## ⚙️ Configuration

The framework supports two layers of configuration:

### 1. Static Configuration (`test.config.ts`)
Contains application-specific constants such as the base URL, default credentials, and product details used in functional tests.

### 2. Environment-Based Configuration (`config/env.config.ts`)
Uses `dotenv` to load environment variables. This is ideal for CI/CD pipelines where credentials are injected as secrets.
- **Local**: Create a `.env` file at the root.
- **CI**: Set environment variables like `QA_URL`, `QA_USERNAME`, and `QA_PASSWORD`.

## 📂 Project Structure

```text
Demo_Playwright_OpenCartProject/
├── .github/workflows/     # GitHub Actions CI/CD pipelines
├── allure-results/        # Raw Allure execution data
├── config/                # Environment configuration logic
├── pages/                 # Page Object Model classes
├── testdata/              # JSON and CSV data files
├── tests/                 # Test specifications
│   └── Fixtures/          # Custom Playwright fixtures
├── types/                 # TypeScript type definitions
├── utils/                 # Data factories and utility classes
├── playwright.config.ts   # Playwright runner configuration
├── test.config.ts         # Application-specific constants
└── Jenkinsfile            # Jenkins pipeline definition
```

## ▶️ Running Tests

The project includes several npm scripts for common test execution scenarios:

| Command | Description |
|---------|-------------|
| `npm run test:master` | Run all tests tagged with `@master` |
| `npm run test:sanity` | Run sanity test suite |
| `npm run test:regression` | Run full regression suite |
| `npm run test:datadriven` | Run data-driven tests |
| `npx playwright test` | Run all tests in the `tests/` directory |

### Execution Options
- **Headed Mode**: `npm run test:master:headed`
- **Debug Mode**: `npm run test:sanity:debug`
- **UI Mode**: `npx playwright test --ui`

## 📊 Reporting

### Allure Reports
1. **Generate Report**:
   ```bash
   npm run allure:report
   ```
2. **View Report**: The command above will automatically open the report in your default browser.

### Playwright HTML Report
```bash
npx playwright show-report
```

## 🔄 CI/CD Integration

### GitHub Actions
The workflow in `.github/workflows/playwright.yml` automatically runs tests on every push and pull request to the `main` or `master` branches. It supports manual triggers with environment selection.

### Jenkins
A `Jenkinsfile` is provided to support Jenkins pipelines, including credential binding and environment-specific execution.

---
**Maintained by [Sameer-Programmer](https://github.com/Sameer-Programmer)**
