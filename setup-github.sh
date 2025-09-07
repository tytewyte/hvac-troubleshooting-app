#!/bin/bash

# Bash script to initialize and push to GitHub repository

# Check if arguments are provided
if [ $# -lt 2 ]; then
    echo "Usage: $0 <github_username> <repository_name> [branch_name]"
    echo "Example: $0 johndoe hvac-troubleshooting-app main"
    exit 1
fi

GITHUB_USERNAME=$1
REPOSITORY_NAME=$2
BRANCH=${3:-main}  # Default to 'main' if not provided

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "Error: Git is not installed or not in PATH. Please install Git and try again."
    exit 1
fi

# Check if the directory is already a git repository
if [ -d ".git" ]; then
    echo "This directory is already a Git repository."
else
    # Initialize git repository
    echo "Initializing Git repository..."
    git init
fi

# Add all files to git
echo "Adding files to Git..."
git add .

# Commit changes if there are any staged changes
if [ -n "$(git status --porcelain)" ]; then
    echo "Committing changes..."
    git commit -m "Initial commit: HVAC Troubleshooting App"
else
    echo "No changes to commit."
fi

# Check if remote origin already exists
if git remote | grep -q "^origin$"; then
    echo "Remote 'origin' already exists. Updating URL..."
    git remote set-url origin "https://github.com/$GITHUB_USERNAME/$REPOSITORY_NAME.git"
else
    # Add remote origin
    echo "Adding remote origin..."
    git remote add origin "https://github.com/$GITHUB_USERNAME/$REPOSITORY_NAME.git"
fi

# Set the branch name
echo "Setting branch name to $BRANCH..."
git branch -M $BRANCH

# Push to GitHub
echo "Pushing to GitHub..."
echo "You may be prompted to enter your GitHub credentials."

if git push -u origin $BRANCH; then
    echo "Successfully pushed to GitHub!"
    echo "Repository URL: https://github.com/$GITHUB_USERNAME/$REPOSITORY_NAME"
else
    echo "Error: Failed to push to GitHub. Please check your credentials and try again."
    exit 1
fi

echo ""
echo "Next steps:"
echo "1. Set up Render for deployment by following the instructions in RENDER_DEPLOYMENT.md"
echo "2. Configure GitHub repository settings as described in GITHUB_SETUP.md"
echo "3. Add GitHub Secrets for Render deployment hook if using GitHub Actions"