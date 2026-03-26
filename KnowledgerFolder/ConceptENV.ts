/* 

Step 1 
Basics 

Step 1: What is .env file
- Plain text file
- Format: KEY=VALUE

Rules:
- Keys must be unique
- Values can be duplicate
- No spaces around =
- No semicolon (;)
- Quotes not required

Syntax:
KEY=VALUE

Example --data inside the ENV file 

ENV=qa


DEV_URL=https://dev.yourapp.com
Dev_userName=shaik@nalashaa.com;
Dev_passWord=Sameera105@


QA_URL=https://qa.yourapp.com
QA_userName=shaik@nalashaa1.com;
QA_passWord=Ameera105@

======================
There is a Small step Step1.1 That Is we can declare the datatypes of an ENV file keys 
Create a Folder Called Types inside type Create a File called 
types.env.types.ts
type EnvConfig = {
    baseURL: string;
    username: string;
    password: string;
};

Step 2
To use the ENV FILE in  the framework in our project, we have to install 
Dot env in the machine 
command 
1-npm install dotenv
2- Now we ahve to create Folder called config and create the file env.config.ts inside the config folder 
3- inside this File - we have to import dot env and we ahve to read this dot env file with the help of one method calle dotenv.config()

Then Inorer to process these keys we have to use one method called getEnvConfig() and we have to use switch case to get the values based on the environment
function getConfig():EnvConfig{

const env = process.env.ENV?.toLowerCase()

switch (env) {
    case "dev":
        return {
            baseURL: process.env.DEV_URL,
            username: process.env.DEV_USERNAME,
            password: process.env.DEV_PASSWORD,
        };
    case "qa":
        return {
            baseURL: process.env.QA_URL,
            username: process.env.QA_USERNAME,
            password: process.env.QA_PASSWORD,
        };
    case "preprod":
        return {
            baseURL: process.env.PREPROD_URL,
            username: process.env.PREPROD_USERNAME,
            password: process.env.PREPROD_PASSWORD,
        };
    case "prod":
        return {
            baseURL: process.env.PROD_URL,
            username: process.env.PROD_USERNAME,
            password: process.env.PROD_PASSWORD,
        };
    default:
        throw new Error("Invalid environment");
}
}




*/