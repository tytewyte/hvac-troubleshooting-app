# PowerShell script to initialize and push to GitHub repository

param (
    [Parameter(Mandatory=$true)]
    [string]$GitHubUsername,
    
    [Parameter(Mandatory=$true)]
    [string]$RepositoryName,
    
    [Parameter(Mandatory=$false)]
    [string]$Branch = "main"
)

# Check if git is installed
if (!(Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Error "Git is not installed or not in PATH. Please install Git and try again."
    exit 1
}

# Check if the directory is already a git repository
if (Test-Path ".git") {
    Write-Host "This directory is already a Git repository." -ForegroundColor Yellow
} else {
    # Initialize git repository
    Write-Host "Initializing Git repository..." -ForegroundColor Cyan
    git init
}

# Add all files to git
Write-Host "Adding files to Git..." -ForegroundColor Cyan
git add .

# Commit changes if there are any staged changes
$status = git status --porcelain
if ($status) {
    Write-Host "Committing changes..." -ForegroundColor Cyan
    git commit -m "Initial commit: HVAC Troubleshooting App"
} else {
    Write-Host "No changes to commit." -ForegroundColor Yellow
}

# Check if remote origin already exists
$remotes = git remote
if ($remotes -contains "origin") {
    Write-Host "Remote 'origin' already exists. Updating URL..." -ForegroundColor Yellow
    git remote set-url origin "https://github.com/$GitHubUsername/$RepositoryName.git"
} else {
    # Add remote origin
    Write-Host "Adding remote origin..." -ForegroundColor Cyan
    git remote add origin "https://github.com/$GitHubUsername/$RepositoryName.git"
}

# Set the branch name
Write-Host "Setting branch name to $Branch..." -ForegroundColor Cyan
git branch -M $Branch

# Push to GitHub
Write-Host "Pushing to GitHub..." -ForegroundColor Cyan
Write-Host "You may be prompted to enter your GitHub credentials." -ForegroundColor Yellow

try {
    git push -u origin $Branch
    Write-Host "Successfully pushed to GitHub!" -ForegroundColor Green
    Write-Host "Repository URL: https://github.com/$GitHubUsername/$RepositoryName" -ForegroundColor Green
} catch {
    Write-Error "Failed to push to GitHub. Please check your credentials and try again."
    Write-Error $_.Exception.Message
}

Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Set up Render for deployment by following the instructions in RENDER_DEPLOYMENT.md" -ForegroundColor White
Write-Host "2. Configure GitHub repository settings as described in GITHUB_SETUP.md" -ForegroundColor White
Write-Host "3. Add GitHub Secrets for Render deployment hook if using GitHub Actions" -ForegroundColor White