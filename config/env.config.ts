import dotenv from "dotenv";
import type { EnvConfig } from "../types/env.types";

dotenv.config(); //Hey dotenv, open the .env file and load all values into my app”



export function getEnvConfig(): EnvConfig {
  const env = process.env.ENV?.toLowerCase() 

    switch (env) {
        case "dev":
            return {
                baseURL: process.env.DEV_URL!,
                username: process.env.DEV_USERNAME!,
                password: process.env.DEV_PASSWORD!,
            };

        case "qa":
            return {
                baseURL: process.env.QA_URL!,
                username: process.env.QA_USERNAME!,
                password: process.env.QA_PASSWORD!,
            };

        case "preprod":
            return {
                baseURL: process.env.PREPROD_URL!,
                username: process.env.PREPROD_USERNAME!,
                password: process.env.PREPROD_PASSWORD!,
            };

        case "prod":
            return {
                baseURL: process.env.PROD_URL!,
                username: process.env.PROD_USERNAME!,
                password: process.env.PROD_PASSWORD!,
            };

        default:
            throw new Error(`Invalid ENV value: ${env}`);
    }
}


/* 
| Real Life           | Code                |
| ------------------- | ------------------- |
| Closed lunch box 🍱 | `.env` file         |
| Opening lunch box   | `dotenv.config()`   |
| Eating food 😋      | `process.env.VALUE` |

dotenv.config() =
“Load all environment variables from .env file so I can use them in code”
FileName - config\env.config.ts
*/