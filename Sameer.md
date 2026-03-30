# 🛒 Playwright OpenCart Automation Framework

[![Playwright](https://img.shields.io/badge/Playwright-v1.58.2-brightgreen)](https://playwright.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-v5.0.4-blue)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-v18+-green)](https://nodejs.org/)
[![npm](https://img.shields.io/badge/npm-v9+-red)](https://www.npmjs.com/)
[![GitHub Actions](https://github.com/Sameer-Programmer/Demo_Playwright_OpenCartProject/actions/workflows/playwright.yml/badge.svg)](https://github.com/Sameer-Programmer/Demo_Playwright_OpenCartProject/actions/workflows/playwright.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> A production-grade end-to-end test automation framework for the **OpenCart e-commerce application**, built with **Playwright + TypeScript**, following industry best practices including **Page Object Model (POM)**, **Custom Fixture-Based Dependency Injection**, **Data-Driven Testing**, **Multi-Environment Support**, and full **CI/CD integration** via GitHub Actions and Jenkins.

---

## 📌 Table of Contents

- [About the Project](#-about-the-project)
- [Tech Stack](#-tech-stack)
- [Key Features](#-key-features)
- [Fixture Architecture](#-fixture-architecture)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Configuration](#-environment-configuration)
- [Running Tests](#-running-tests)
- [Test Reports](#-test-reports)
- [CI/CD Integration](#-cicd-integration)
- [What I Learned](#-what-i-learned)
- [Author](#-author)

---

## 🧾 About the Project

This framework automates end-to-end testing of the **OpenCart** e-commerce platform — covering user registration, login, product search, cart management, and checkout flows. It was built as a **portfolio project** to demonstrate real-world automation engineering skills using modern tooling.

**Application Under Test:** [OpenCart Demo](https://demo.opencart.com)

---

## 🧰 Tech Stack

| Tool | Purpose |
|------|---------|
| [Playwright](https://playwright.dev/) | Browser automation & E2E testing |
| [TypeScript](https://www.typescriptlang.org/) | Strongly-typed JavaScript for better code quality |
| [Node.js](https://nodejs.org/) | Runtime environment |
| [Faker.js](https://fakerjs.dev/) | Dynamic test data generation |
| [xlsx](https://www.npmjs.com/package/xlsx) | Excel-based test data support |
| [csv-parse](https://www.npmjs.com/package/csv-parse) | CSV-based test data support |
| [Allure Report](https://allurereport.org/) | Rich interactive test reporting |
| [GitHub Actions](https://github.com/features/actions) | Cloud CI/CD pipeline |
| [Jenkins](https://www.jenkins.io/) | On-premise CI/CD pipeline |
| [dotenv](https://www.npmjs.com/package/dotenv) | Secure environment variable management |

---

## ✨ Key Features

### ✅ Smart Test Tagging Strategy
Tests are tagged with `@master`, `@sanity`, `@regression`, and `@datadriven` — enabling targeted test execution via simple npm scripts. Run only smoke tests before a release, or full regression overnight, without changing any code.

### ✅ Custom Fixture-Based Dependency Injection
Implements Playwright's `base.extend<T>()` pattern to auto-initialize all **7 Page Objects**, `TestDataFactory`, and `TestConfig` as typed fixtures — eliminating boilerplate `beforeEach` setup in every test file. Tests simply declare what they need and receive it automatically.

### ✅ Page Object Model (POM)
All page interactions are encapsulated in dedicated TypeScript classes under `/pages`, separating test logic from UI interaction logic for better maintainability.

### ✅ Multi-Environment Support
Supports `dev`, `qa`, `preprod`, and `prod` environments via a `.env` file — no hardcoded credentials or URLs anywhere in the codebase.

### ✅ Data-Driven Testing — JSON, CSV & Excel
Tests are driven by **three external data source formats** via custom utility classes:
- **JSON** — structured user/product test data
- **CSV** — tabular data via `csv-parse`
- **Excel (XLSX)** — enterprise-grade data via `xlsx` library

This mirrors real-world enterprise projects where test data lives in spreadsheets managed by business teams.

### ✅ Dynamic Test Data with Faker.js
The `RandomDataGenerator.ts` utility generates realistic random data (names, emails, phone numbers, addresses) on every test run — eliminating stale test data issues.

### ✅ Comprehensive Reporting
Multi-reporter setup including **Allure**, **HTML**, **Dot**, and **List** reporters for both CI and local analysis.

### ✅ Cross-Browser Testing
Configured to run across **Chromium**, **Firefox**, and **WebKit** (Safari) out of the box.

### ✅ Secure Secrets Management
- Locally: uses `.env` file (git-ignored)
- GitHub Actions: uses **GitHub Repository Secrets**
- Jenkins: uses **Jenkins Credentials Vault**

No passwords ever appear in logs or source control.

### ✅ Full CI/CD Pipeline
Automated test execution on every `push` and `pull_request` via GitHub Actions, with manual environment selection. Jenkins integration via a declarative `Jenkinsfile`.

---

## 📂 Project Structure

```
Demo_Playwright_OpenCartProject/
│
├── .github/
│   └── workflows/
│       └── playwright.yml          # GitHub Actions CI pipeline
│
├── config/
│   └── env.config.ts               # Dynamic environment config loader
│
├── pages/                          # Page Object Model (POM) classes
│   ├── HomePage.ts                 # Home page locators & actions
│   └── RegistrationPage.ts         # Registration page locators & actions
│
├── tests/                          # Test spec files
│   ├── fixtures/
│   │   └── uiFixtures.ts           # Custom typed fixture — injects all page objects
│   └── example.spec.ts             # E2E test scenarios
│
├── testdata/                       # External test data files
│   ├── users.json                  # JSON test data
│   └── users.csv                   # CSV test data
│
├── types/                          # Custom TypeScript type definitions
│
├── utils/                          # Helper utilities
│   ├── RandomDataGenerator.ts      # Faker-based data generator
│   └── dataProvider.ts             # JSON & CSV data reader
│
├── allure-results/                 # Raw Allure test results
├── allure-report/                  # Generated Allure HTML report
│
├── .env.example                    # Template for environment variables
├── .gitignore                      # Git ignore rules
├── Jenkinsfile                     # Jenkins declarative pipeline
├── playwright.config.ts            # Playwright test runner config
├── test.config.ts                  # App-level test configuration
├── package.json                    # Dependencies & npm scripts
└── README.md                       # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- **Node.js** v18 or higher → check with `node -v`
- **npm** v9 or higher → check with `npm -v`
- **Git** → check with `git --version`

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/Sameer-Programmer/Demo_Playwright_OpenCartProject.git
cd Demo_Playwright_OpenCartProject
```

**2. Install dependencies**
```bash
npm install
```

**3. Install Playwright browsers**
```bash
npx playwright install
```

**4. Set up your environment file**
```bash
cp .env.example .env
# Then open .env and fill in your credentials
```

---

## ⚙️ Environment Configuration

The framework supports **multiple environments** without any code changes — just switch the `ENV` variable in your `.env` file.

**.env file structure:**
```env
ENV=qa

QA_BASE_URL=https://demo.opencart.com
QA_USERNAME=your_username
QA_PASSWORD=your_password

DEV_BASE_URL=https://dev.opencart.com
DEV_USERNAME=dev_user
DEV_PASSWORD=dev_pass
```

**How it works:**
- `config/env.config.ts` reads the `ENV` variable and loads the matching set of credentials
- `playwright.config.ts` picks up `baseURL` automatically — tests just use relative paths like `page.goto('/login')`
- In CI (GitHub Actions / Jenkins), credentials are injected as **secrets** — never hardcoded

**Using config in tests:**
```typescript
import { getEnvConfig } from '../config/env.config';

const config = getEnvConfig();
// config.username, config.password, config.baseURL
```

---

## ▶️ Running Tests

Tests are organized with **tag-based filtering** — run only what you need using npm scripts:

### By Test Suite Tag
```bash
npm run test:master        # Full test suite (@master tag)
npm run test:sanity        # Smoke/sanity tests (@sanity tag)
npm run test:regression    # Full regression suite (@regression tag)
npm run test:datadriven    # Data-driven tests only (@datadriven tag)
```

### With Debug / Headed Mode
```bash
npm run test:master:headed   # Full suite with browser visible
npm run test:sanity:debug    # Step-by-step debug for sanity tests
```

### Generate & Open Allure Report
```bash
npm run allure:report        # Generates + opens Allure report in one command
```

### Raw Playwright Commands
```bash
npx playwright test                          # Run all tests
npx playwright test --project=chromium       # Chromium only
npx playwright test --project=firefox        # Firefox only
npx playwright test --project=webkit         # WebKit (Safari) only
npx playwright test tests/example.spec.ts    # Specific test file
npx playwright test --ui                     # Interactive UI mode
```

### How Tags Work in Tests
```typescript
test('@master @regression user can login successfully', async ({ loginPage }) => {
  // Runs with: npm run test:master  OR  npm run test:regression
});

test('@sanity homepage loads correctly', async ({ homePage }) => {
  // Runs with: npm run test:sanity
});

test('@datadriven register user with csv data', async ({ registrationPage, testDataFactory }) => {
  // Runs with: npm run test:datadriven
});
```

---

## 📊 Test Reports

### HTML Report (built-in Playwright)
```bash
npx playwright show-report
```

### Allure Report
```bash
# Generate the report
npx allure generate allure-results --clean -o allure-report

# Open the report in browser
npx allure open allure-report
```

> 📸 **Sample Allure Report:**
> *(Add a screenshot of your Allure report here)*
> `![Allure Report](./allure-report/sample-screenshot.png)`

---

## 🔄 CI/CD Integration

### GitHub Actions

The pipeline is defined in `.github/workflows/playwright.yml` and triggers on:
- Every `push` to `main`
- Every `pull_request`
- Manual dispatch (with environment selection dropdown)

**Secrets used:**
```yaml
env:
  QA_USERNAME: ${{ secrets.QA_USERNAME }}
  QA_PASSWORD: ${{ secrets.QA_PASSWORD }}
```

### Jenkins Pipeline

A declarative `Jenkinsfile` is included for on-premise Jenkins integration.

**Features:**
- Manual environment selection via dropdown (`dev`, `qa`, `preprod`, `prod`)
- Credentials pulled from **Jenkins Credentials Vault** — passwords never appear in logs
- Allure report published as a post-build artifact

**Sample pipeline stages:**
```
Checkout → Install Dependencies → Run Playwright Tests → Publish Allure Report
```

---

## 🧩 Fixture Architecture

One of the most advanced features of this framework is the **custom Playwright fixture system** defined in `tests/fixtures/uiFixtures.ts`.

### What are Playwright Fixtures?
Fixtures are Playwright's built-in **dependency injection** mechanism. Instead of manually initializing page objects in every `beforeEach`, fixtures declare dependencies once and Playwright injects them automatically into every test that needs them.

### How It Works in This Framework

```typescript
// tests/fixtures/uiFixtures.ts
import { test as base } from "@playwright/test";

type MyFixtures = {
  registrationPage: RegistrationPage;
  homePage: HomePage;
  loginPage: LoginPage;
  accountPage: MyAccountPage;
  logoutPage: LogoutPage;
  searchPage: SearchPage;
  cartPage: CartPage;
  config: TestConfig;
  testDataFactory: TestDataFactory;
};

export const test = base.extend<MyFixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  // ... all other page objects
});
```

### Benefits Over Traditional `beforeEach`

| Traditional Approach | Fixture Approach |
|---------------------|-----------------|
| Manual `new HomePage(page)` in every test file | Auto-injected — just declare in test signature |
| Repeated boilerplate `beforeEach` blocks | Zero setup boilerplate |
| Risk of missing initialization | TypeScript enforces all types |
| Hard to scale across many test files | Scales effortlessly across entire suite |

### Using Fixtures in Tests

```typescript
// Import custom test (not Playwright's default)
import { test, expect } from '../fixtures/uiFixtures';

test('user can search for a product', async ({ homePage, searchPage }) => {
  await homePage.searchFor('MacBook');
  await searchPage.verifyResultsVisible();
});

test('user can add item to cart', async ({ homePage, cartPage, testDataFactory }) => {
  const product = testDataFactory.getRandomProduct();
  await homePage.addToCart(product);
  await cartPage.verifyCartCount(1);
});
```

### Page Objects Covered via Fixtures

| Fixture | Page Object | Responsibility |
|---------|-------------|---------------|
| `homePage` | `HomePage.ts` | Navigation, search, product browsing |
| `loginPage` | `LoginPage.ts` | Login form interactions |
| `registrationPage` | `RegistrationPage.ts` | New user registration flow |
| `accountPage` | `MyAccountPage.ts` | Account dashboard actions |
| `logoutPage` | `LogoutPage.ts` | Logout flow |
| `searchPage` | `SearchPage.ts` | Search results interactions |
| `cartPage` | `CartPage.ts` | Cart management |
| `config` | `TestConfig` | Centralized app configuration |
| `testDataFactory` | `TestDataFactory` | Dynamic test data generation |

---

## 💡 What I Learned

Building this project helped me develop and strengthen the following skills:

- Designing a scalable **Page Object Model** architecture in TypeScript
- Building a **custom fixture system** using `base.extend<T>()` for clean dependency injection across all tests
- Covering **7 full page flows** — Registration, Login, Home, Search, Cart, Account, Logout
- Managing **multi-environment configurations** securely without hardcoded secrets
- Implementing **data-driven testing** with JSON and CSV using custom utility classes
- Setting up **Allure reporting** with Playwright for rich test insights
- Building full **CI/CD pipelines** in both GitHub Actions and Jenkins
- Implementing **tag-based test filtering** (`@master`, `@sanity`, `@regression`, `@datadriven`) for targeted execution
- Supporting **three data source formats** — JSON, CSV, and Excel — for true enterprise-grade data-driven testing
- Integrating **cross-browser testing** across Chromium, Firefox, and WebKit

---

## 👨‍💻 Author

**Sameer**
- 🔗 GitHub: [@Sameer-Programmer](https://github.com/Sameer-Programmer)
- 💼 Skills: Manual Testing | API Testing (Postman) | Katalon Studio | Playwright | TypeScript | Jenkins CI/CD

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch: `git checkout -b feature/add-login-tests`
3. Commit your changes: `git commit -m 'Add login page tests'`
4. Push to the branch: `git push origin feature/add-login-tests`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

> ⭐ If this project helped you, please consider giving it a **star** on GitHub!
