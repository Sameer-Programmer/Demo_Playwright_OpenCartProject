# 🔐 Multi-Environment .env + CI/CD Setup — IDE Prompt Guide

> **Purpose:** Use this prompt in any AI-powered IDE (Cursor, Windsurf, Claude Code, Copilot Chat)
> to implement the MNC-grade credential management + CI/CD pipeline ideology into any
> Playwright + TypeScript POM framework.

---

## 📌 What This Ideology Covers

| Layer | What It Does |
|---|---|
| `.env` file | Stores all credentials locally — never committed to Git |
| `config/env.config.ts` | Reads `ENV` variable and returns the right credentials at runtime |
| `playwright.config.ts` | Gets `baseURL` from config — no hardcoding |
| GitHub Actions YAML | Injects secrets from GitHub Secrets vault into env variables |
| Jenkinsfile | Injects secrets from Jenkins Credential Store using `credentials()` |

### Core Rules
- ❌ No passwords in source code — ever
- ✅ One `.env` file → all 4 environments (dev, qa, preprod, prod)
- ✅ `ENV` variable at runtime selects the active environment
- ✅ Same code runs locally, on GitHub Actions, and on Jenkins — zero changes

---

## 🧠 IDE Prompt — Copy & Paste This

```
I have a Playwright + TypeScript POM framework. I want to implement a multi-environment 
credential management system with CI/CD pipeline support using the following ideology:

=== CORE IDEOLOGY ===
1. NO passwords or credentials hardcoded in source code — ever.
2. A single .env file handles all 4 environments: dev, qa, preprod, prod.
3. The active environment is selected at runtime via an ENV variable (not by switching files).
4. The same code runs unchanged locally (via .env + dotenv), on GitHub Actions 
   (via GitHub Secrets), and on Jenkins (via Jenkins Credentials store).

=== PROJECT CONTEXT ===
- Framework: Playwright + TypeScript
- Pattern: Page Object Model (POM)
- Target app: [YOUR APP NAME — e.g., OpenEMR / your EHR app]
- Environments: dev, qa, preprod, prod
- Each environment needs: USERNAME, PASSWORD, BASE_URL, [TENANT if applicable]

=== WHAT I NEED YOU TO CREATE ===

1. .env file (at project root)
   - Flat structure with environment prefixes:
     DEV_USERNAME=, DEV_PASSWORD=, DEV_URL=
     QA_USERNAME=, QA_PASSWORD=, QA_URL=
     PREPROD_USERNAME=, PREPROD_PASSWORD=, PREPROD_URL=
     PROD_USERNAME=, PROD_PASSWORD=, PROD_URL=
     ENV=qa  (default environment)

2. .env.example file (safe to commit to Git — placeholder values only)

3. .gitignore entry — ensure .env is listed and never committed

4. config/env.config.ts
   - Reads process.env.ENV to determine active environment
   - Returns a typed config object: { username, password, baseURL } 
     based on the selected environment
   - Export a single getEnvConfig() function

5. Update playwright.config.ts
   - Import getEnvConfig()
   - Set baseURL from config
   - Keep existing settings intact

6. Update any existing Page Object or fixture file to use credentials 
   from getEnvConfig() instead of hardcoded values

7. .github/workflows/playwright.yml (GitHub Actions CI)
   - Triggers: push to main, pull_request, workflow_dispatch (manual, env dropdown)
   - Steps: checkout → setup-node → npm ci → install browsers → run tests → upload report
   - All secrets injected via: env: block using ${{ secrets.DEV_USERNAME }} etc.

8. Jenkinsfile (Declarative Pipeline)
   - parameters { choice } block for environment selection
   - environment { } block using credentials('EHR_QA_PASSWORD') pattern
   - Stages: Checkout → Install → Install Browsers → Run Tests → Publish HTML Report
   - post { always { archiveArtifacts } }

Show me each file completely. Add clear comments explaining the "why" — not just the "what".
```

---

## 🔧 Customize Before Pasting

| Placeholder | What to Replace With |
|---|---|
| `[YOUR APP NAME]` | e.g., `OpenEMR`, `your company's EHR app` |
| `TENANT` fields | Remove if your app doesn't use tenant/subdomain |
| Environment names | Change `preprod` to `staging` if your team uses that |

---

## 💡 Pro Tip — For Existing Frameworks

If your project is already open in the IDE, add this line **at the top** of the prompt:

```
My current project structure is already open. Preserve existing files — 
only modify what's needed and create the new files listed below.
```

> This makes the IDE surgical — it won't rewrite your whole framework, only touches
> what is needed.

---

## 🗂️ Files This Prompt Will Generate

```
your-project/
├── .env                          ← Local secrets (gitignored)
├── .env.example                  ← Safe template (committed)
├── .gitignore                    ← .env entry added
├── config/
│   └── env.config.ts             ← Runtime env resolver
├── playwright.config.ts          ← Updated with baseURL from config
├── tests/
│   └── login.spec.ts             ← Updated to use getEnvConfig()
├── pages/
│   └── LoginPage.ts              ← Updated — no hardcoded credentials
├── .github/
│   └── workflows/
│       └── playwright.yml        ← GitHub Actions CI pipeline
└── Jenkinsfile                   ← Jenkins Declarative Pipeline
```

---

## ⚡ How to Run Locally After Setup

```bash
# Run against QA (default)
npx playwright test

# Run against DEV
$env:ENV="dev"   npx playwright test        # PowerShell
ENV=dev          npx playwright test        # Mac/Linux/CMD (set ENV=dev)

# Run against PREPROD
$env:ENV="preprod"  npx playwright test
```

---

## 🔁 How Secrets Flow — All 3 Methods

| Method | Where Secrets Live | How They Reach Code |
|---|---|---|
| Local (CMD/PowerShell) | `.env` file on your machine | `dotenv.config()` |
| GitHub Actions | GitHub Secrets vault | `env:` block in YAML |
| Jenkins | Jenkins Credential Store | `credentials()` in environment block |

> **MNC Standard:** Jenkins for release pipelines → GitHub Actions for PR checks
> → Local `.env` only for dev/debug runs. Your code handles all three with zero changes.

---

## 📚 Related Files

- `ehr-env-cicd-guide.html` — Full visual reference guide with code for all 3 methods
- `ehr-playwright-framework/` — The POM project this was designed for

---

*Built for Sameer · EHR Playwright Security + CI/CD · MNC Enterprise Pattern*
