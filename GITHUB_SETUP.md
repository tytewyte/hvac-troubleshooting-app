# GitHub Repository Setup Guide

## Initial Setup

1. **Initialize Git Repository**

   If you haven't already initialized a Git repository, run the following command in your project root:

   ```bash
   git init
   ```

2. **Add Files to Git**

   Stage all files for the initial commit (the .gitignore file will prevent unwanted files from being included):

   ```bash
   git add .
   ```

3. **Make Initial Commit**

   ```bash
   git commit -m "Initial commit: HVAC Troubleshooting App"
   ```

## Connecting to GitHub

1. **Create a New Repository on GitHub**

   - Go to [GitHub](https://github.com/) and sign in
   - Click the '+' icon in the top right and select 'New repository'
   - Name your repository (e.g., "hvac-troubleshooting-app")
   - Add a description (optional)
   - Choose public or private visibility
   - Do NOT initialize with README, .gitignore, or license (we already have these)
   - Click 'Create repository'

2. **Connect Local Repository to GitHub**

   GitHub will show commands to connect your existing repository. Use the following:

   ```bash
   git remote add origin https://github.com/YOUR-USERNAME/hvac-troubleshooting-app.git
   git branch -M main
   git push -u origin main
   ```

   Replace `YOUR-USERNAME` with your actual GitHub username.

## Repository Configuration

1. **Branch Protection Rules**

   To protect your main branch:

   - Go to your repository on GitHub
   - Click 'Settings' > 'Branches'
   - Under 'Branch protection rules', click 'Add rule'
   - Enter 'main' as the branch name pattern
   - Consider enabling:
     - Require pull request reviews before merging
     - Require status checks to pass before merging
     - Include administrators
   - Click 'Create'

2. **GitHub Actions (Optional)**

   To set up automated testing and deployment, create a workflow file:

   ```bash
   mkdir -p .github/workflows
   ```

   Then create a basic workflow file (see the CI/CD section below).

## Collaboration Settings

1. **Add Collaborators**

   - Go to your repository on GitHub
   - Click 'Settings' > 'Manage access'
   - Click 'Invite a collaborator'
   - Enter the username, full name, or email address
   - Select the appropriate role
   - Click 'Add'

2. **Issue Templates (Optional)**

   Create templates for bug reports and feature requests:

   ```bash
   mkdir -p .github/ISSUE_TEMPLATE
   ```

   Then create template files for different issue types.

## CI/CD Setup (Optional)

Create a basic GitHub Actions workflow for testing:

1. Create a file at `.github/workflows/node.js.yml` with the following content:

   ```yaml
   name: Node.js CI

   on:
     push:
       branches: [ main ]
     pull_request:
       branches: [ main ]

   jobs:
     build:
       runs-on: ubuntu-latest

       strategy:
         matrix:
           node-version: [16.x, 18.x, 20.x]

       steps:
       - uses: actions/checkout@v3
       - name: Use Node.js ${{ matrix.node-version }}
         uses: actions/setup-node@v3
         with:
           node-version: ${{ matrix.node-version }}
           cache: 'npm'
       - run: npm ci
       - run: npm run build --if-present
       - run: npm test --if-present
   ```

## Deployment Integration

For automatic deployment to hosting platforms, you can set up additional GitHub Actions workflows:

1. **Render Deployment**

   Render automatically deploys when you push to your connected GitHub repository, so you don't need a GitHub Action for basic deployment. However, if you want to add custom deployment steps, create a file at `.github/workflows/render-deploy.yml` with the following content:

   ```yaml
   name: Deploy to Render

   on:
     push:
       branches: [ main ]

   jobs:
     build:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - uses: actions/setup-node@v3
           with:
             node-version: 16
             cache: 'npm'
         - run: npm ci
         - run: npm run build --if-present
         - run: npm test --if-present

     deploy:
       needs: build
       runs-on: ubuntu-latest
       steps:
         - name: Trigger Render Deploy
           run: |
             curl -X POST "${{ secrets.RENDER_DEPLOY_HOOK_URL }}"
   ```

   To use this workflow:
   1. Create a Deploy Hook in Render dashboard (Settings → Deploy Hooks)
   2. Add the Deploy Hook URL as a GitHub Secret named `RENDER_DEPLOY_HOOK_URL`

2. **Other Platforms**

   Refer to the platform-specific GitHub Actions documentation for deployment workflows.

## Best Practices

1. **Commit Messages**

   Use clear, descriptive commit messages following this format:

   ```
   type(scope): brief description

   Longer description if needed
   ```

   Common types: feat, fix, docs, style, refactor, test, chore

2. **Branching Strategy**

   Consider using a branching strategy like:
   - `main` - production-ready code
   - `develop` - integration branch for features
   - `feature/name` - for new features
   - `bugfix/name` - for bug fixes

3. **Pull Requests**

   - Create descriptive pull request titles and descriptions
   - Reference related issues using #issue-number
   - Request reviews from team members
   - Ensure all tests pass before merging

## Security Considerations

1. **Environment Variables**

   Never commit sensitive information. Use GitHub Secrets for CI/CD:

   - Go to your repository on GitHub
   - Click 'Settings' > 'Secrets and variables' > 'Actions'
   - Click 'New repository secret'
   - Add secrets like `MONGODB_URI`, `JWT_SECRET`, etc.

2. **Dependency Scanning**

   Enable Dependabot alerts in your repository settings to automatically detect vulnerable dependencies.

## Additional Resources

- [GitHub Documentation](https://docs.github.com/)
- [Git Cheat Sheet](https://education.github.com/git-cheat-sheet-education.pdf)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)