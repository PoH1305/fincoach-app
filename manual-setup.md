# Manual GitHub Setup Instructions

If you prefer to set up manually or the batch script doesn't work, follow these steps:

## 1. Install Prerequisites
- **Git**: Download from https://git-scm.com/download/win
- **GitHub CLI** (optional): Download from https://cli.github.com/

## 2. Initialize Git Repository
```bash
cd c:\Users\Sarayu\Downloads\nidhi_1\nidhi_1
git init
git add .
git commit -m "Initial commit: FinCoach - AI-powered financial wellness app"
```

## 3. Create GitHub Repository

### Option A: Using GitHub CLI (Recommended)
```bash
gh auth login
gh repo create sarayu-mangapuram/fincoach --public --description "Your Money, Your Move 💸 - AI-powered financial wellness app"
```

### Option B: Manual Creation
1. Go to https://github.com/new
2. Repository name: `fincoach`
3. Description: `Your Money, Your Move 💸 - AI-powered financial wellness app`
4. Set to Public
5. Don't initialize with README (we already have one)
6. Click "Create repository"

## 4. Connect and Push
```bash
git remote add origin https://github.com/sarayu-mangapuram/fincoach.git
git branch -M main
git push -u origin main
```

## 5. Verify
Visit: https://github.com/sarayu-mangapuram/fincoach

Your repository should now be live! 🎉