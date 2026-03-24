 of each credential matches the name used in the `Jenkinsfile`.
3.  **Configure Pipeline**: When configuring your Jenkins pipeline, ensure it uses the `Jenkinsfile` from your repository and that the necessary permissions are granted to access the defined credentials.

### 3. `playwright.config.ts` Integration

The `playwright.config.ts` file is the central configuration for Playwright tests. It integrates with `config/env.config.ts` to dynamically set the `baseURL` for tests.

**Key Integration Point:**

```typescript
import { defineConfig, devices } from '@playwright/test';
import { getEnvConfig } from './config/env.config';

// Load our environment configuration dynamically
const envState = getEnvConfig();

export default defineConfig({
  // ... other configurations
  use: {
    // Setting baseURL from the dynamically loaded configuration
    baseURL: envState.baseURL,
    // ... other 'use' options
  },
  // ... other configurations
});
```

This setup ensures that Playwright always uses the correct base URL for the selected environment without any manual changes to `playwright.config.ts`.

## ▶️ Further Steps and Best Practices

*   **Never Commit `.env`**: Always ensure your `.env` file is in `.gitignore` to prevent sensitive data from being exposed in your version control system.
*   **Environment Variable Precedence**: Understand that environment variables set directly in the shell or CI/CD pipeline will override values in the `.env` file.
*   **Consistent Naming**: Maintain a consistent naming convention for your environment variables across `.env` files, GitHub Secrets, and Jenkins Credentials to avoid confusion and errors.
*   **Review `README-env-cicd-ide-prompt.md`**: For a deeper understanding of the design philosophy and how to replicate this setup, refer to the `README-env-cicd-ide-prompt.md` file in the repository.

By following this guide, you can effectively manage multi-environment configurations and secure your credentials, making your Playwright test automation framework robust and enterprise-ready.
