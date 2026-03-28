@echo off
echo Installing dependencies...

call npm install

echo Installing Playwright browsers...
call npx playwright install

echo Setup completed ✅