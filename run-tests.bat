@echo off
echo Using secure .env file from Jenkins

copy "%ENV_FILE%" .env

echo ENV=%ENV%>> .env
echo HEADLESS=%HEADLESS%>> .env

echo Running setup...
call setup.bat

echo Running Playwright tests for suite: %SUITE%
call npm run test:%SUITE%

echo Generating Allure Report...
call npx allure generate ./allure-results --clean -o ./allure-report

echo Execution completed ✅