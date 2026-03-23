import * as dotenv from 'dotenv';
import * as path from 'path';

// Read from default ".env" file.
// In CI environments where GitHub/Jenkins sets environment variables directly,
// the values from process.env take precedence over those in the file.
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
dotenv.config();

export const getEnvConfig = () => {
    // Determine the environment, fallback to 'qa' if not provided
    const environment = process.env.ENV?.toLowerCase() || 'qa';

    // Build the dynamic keys based on the environment prefix (e.g. QA_USERNAME)
    const envPrefix = environment.toUpperCase();

    // Fetch the correct set of variables
    // In local execution, this pulls from the .env file.
    // In CI (Jenkins/GitHub Actions), this pulls from the injected agent secrets.
    const config = {
        environment,
        baseURL: process.env[`${envPrefix}_URL`],
        username: process.env[`${envPrefix}_USERNAME`],
        password: process.env[`${envPrefix}_PASSWORD`],
    };

    // Ensure our config actually mapped to values (helpful for debugging configuration failures)
    if (!config.baseURL || !config.username || !config.password) {
        throw new Error(`\n⚠️ Missing credentials for environment: ${environment.toUpperCase()}!
         Please ensure ${envPrefix}_URL, ${envPrefix}_USERNAME, and ${envPrefix}_PASSWORD are set.\n`);
    }

    return config;
};
