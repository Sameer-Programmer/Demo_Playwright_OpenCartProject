/* 

section1 -1
While designing the Framework of Playwright we have to decide the following things:
1. First Node js is installed or not. If not installed then install it.
Command to check node version : node -v
Command to check npm version : npm -v
2. npm init -y

Once Node and npm  is Present then install Playwright. with command below:
3. npm init playwright@latest


Section 2
Install Additional Packages

1. npm install csv-parse why this - to read csv files
2. npm install xlsx why this - to read excel files
3. npm install -D allure-playwright why this - to generate allure reports
4. npm install @faker-js/faker why this - to generate test data


Section 3
Create Folder Structure

1. Create a folder named 'tests' in the root directory.
2. Create a folder named 'data' inside 'tests'.
3. Create a folder named 'utils' inside 'tests'.
4. Create a folder named 'reports' in the root directory.
5. Create a folder named 'config' in the root directory.
6. Create a folder named 'fixtures' inside 'tests'.
7. Create a folder named 'pages' inside 'tests'.
8. Create a folder named 'tests' in the root directory.



Step 4 

Tags in this App 
@master @sanity @regression @smoke
command to run the tests with tags  
npx playwright test --grep "@master"


step 5 
How to Generate and Open the AllureReports 
Command 
To Generate the reports : allure generate ./allure-results -o ./allure-report --clean
To Open the reports : allure open


 * Complete Command Flow
 * --------------------------------
 * npm install -D @playwright/test -why this - to install playwright
 * npm install -D allure-playwright -why this - to generate allure reports
 * npm install -g allure-commandline -why this - to generate allure reports
 *
 * npx playwright test -why this - to run the tests
 *
 * allure generate ./allure-results -o ./allure-report --clean -why this - to generate allure reports
 *
 * allure open ./allure-report -why this - to open the allure reports
 
//Step 6 

in package.json 
under scripts
"scripts": {
"test:master": "playwright test --grep @master",
"test:sanity": "playwright test --grep @sanity",
"test:regression": "playwright test --grep @regression",
"test:datadriven": "playwright test --grep @datadriven",
"test:master:headed": "playwright test --grep @master --headed",
"test:sanity:debug": "playwright test --grep @sanity --debug"
}


Now to run from the package.json 
example : npm run test:master --it will execute this command : npx playwright test --grep @master
*/