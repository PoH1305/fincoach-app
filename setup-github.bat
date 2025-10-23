@echo off
echo Setting up GitHub repository for FinCoach...
echo.

REM Navigate to project directory
cd /d "%~dp0"

REM Initialize Git repository
echo Initializing Git repository...
git init

REM Add all files
echo Adding files to Git...
git add .

REM Create initial commit
echo Creating initial commit...
git commit -m "Initial commit: FinCoach - AI-powered financial wellness app"

REM Create GitHub repository
echo Creating GitHub repository...
gh repo create sarayu-mangapuram/fincoach --public --description "Your Money, Your Move 💸 - AI-powered financial wellness app" --clone=false

REM Add remote origin
echo Adding remote origin...
git remote add origin https://github.com/sarayu-mangapuram/fincoach.git

REM Push to GitHub
echo Pushing to GitHub...
git branch -M main
git push -u origin main

echo.
echo ✅ Repository created successfully!
echo 🌐 Repository URL: https://github.com/sarayu-mangapuram/fincoach
echo.
pause