# GitHub Setup Scripts Guide

This project includes two scripts to help you quickly set up your GitHub repository:

- `setup-github.ps1` - PowerShell script for Windows users
- `setup-github.sh` - Bash script for Linux/macOS users

## Prerequisites

1. Git installed on your system
2. A GitHub account
3. A new repository created on GitHub (empty, without README, .gitignore, or license)

## Using the PowerShell Script (Windows)

1. Open PowerShell in your project directory

2. Run the script with your GitHub username and repository name:

   ```powershell
   .\setup-github.ps1 -GitHubUsername "your-username" -RepositoryName "hvac-troubleshooting-app"
   ```

   You can also specify a different branch name (default is "main"):

   ```powershell
   .\setup-github.ps1 -GitHubUsername "your-username" -RepositoryName "hvac-troubleshooting-app" -Branch "master"
   ```

3. Follow the prompts to enter your GitHub credentials when requested

## Using the Bash Script (Linux/macOS)

1. Open Terminal in your project directory

2. Make the script executable:

   ```bash
   chmod +x setup-github.sh
   ```

3. Run the script with your GitHub username and repository name:

   ```bash
   ./setup-github.sh your-username hvac-troubleshooting-app
   ```

   You can also specify a different branch name (default is "main"):

   ```bash
   ./setup-github.sh your-username hvac-troubleshooting-app master
   ```

4. Follow the prompts to enter your GitHub credentials when requested

## What the Scripts Do

These scripts automate the following steps:

1. Initialize a Git repository (if not already initialized)
2. Add all files to Git
3. Make an initial commit
4. Add the GitHub remote repository as "origin"
5. Set the branch name (default: "main")
6. Push to GitHub

## Troubleshooting

### Authentication Issues

If you encounter authentication issues:

1. Ensure you're using the correct GitHub credentials
2. Consider setting up SSH keys or using a personal access token
3. For personal access tokens, use the token as your password when prompted

### Repository Already Exists

If your repository already exists on GitHub with files (README, etc.):

1. Pull the remote repository first:
   ```
   git pull origin main --allow-unrelated-histories
   ```
2. Resolve any merge conflicts
3. Then push your changes

## Render Deployment Readiness Check

Before deploying to Render, you can use the included scripts to check if your application is properly configured:

- For Windows: `check-render-readiness.ps1`
- For Linux/macOS: `check-render-readiness.sh`

### Using the PowerShell Script (Windows)

```powershell
.\check-render-readiness.ps1
```

### Using the Bash Script (Linux/macOS)

```bash
chmod +x check-render-readiness.sh
./check-render-readiness.sh
```

These scripts will check for:
- Required files (server.js, package.json, render.yaml, Procfile)
- Recommended files (.gitignore, README.md, RENDER_DEPLOYMENT.md)
- Environment variables configuration in render.yaml
- Start script in package.json

## Next Steps

After successfully pushing to GitHub:

1. Run the Render readiness check script to ensure your application is properly configured
2. Set up Render for deployment by following the instructions in [RENDER_DEPLOYMENT.md](RENDER_DEPLOYMENT.md)
3. Configure GitHub repository settings as described in [GITHUB_SETUP.md](GITHUB_SETUP.md)
4. Add GitHub Secrets for Render deployment hook if using GitHub Actions