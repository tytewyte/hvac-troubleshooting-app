# PowerShell script to check if the application is ready for deployment to Render

# Define required files
$requiredFiles = @(
    "server.js",
    "package.json",
    "render.yaml",
    "Procfile"
)

# Define recommended files
$recommendedFiles = @(
    ".gitignore",
    "README.md",
    "RENDER_DEPLOYMENT.md"
)

# Define environment variables that should be set in render.yaml
$requiredEnvVars = @(
    "NODE_ENV",
    "PORT",
    "MONGODB_URI",
    "JWT_SECRET",
    "SESSION_SECRET"
)

# Check required files
Write-Host "Checking required files..." -ForegroundColor Cyan
$missingRequiredFiles = @()
foreach ($file in $requiredFiles) {
    if (Test-Path $file) {
        Write-Host "✓ $file exists" -ForegroundColor Green
    } else {
        Write-Host "✗ $file is missing" -ForegroundColor Red
        $missingRequiredFiles += $file
    }
}

# Check recommended files
Write-Host "
Checking recommended files..." -ForegroundColor Cyan
foreach ($file in $recommendedFiles) {
    if (Test-Path $file) {
        Write-Host "✓ $file exists" -ForegroundColor Green
    } else {
        Write-Host "? $file is recommended but missing" -ForegroundColor Yellow
    }
}

# Check render.yaml for environment variables
Write-Host "
Checking render.yaml configuration..." -ForegroundColor Cyan
if (Test-Path "render.yaml") {
    $renderYaml = Get-Content "render.yaml" -Raw
    $missingEnvVars = @()
    foreach ($envVar in $requiredEnvVars) {
        if ($renderYaml -match "key:\s*$envVar") {
            Write-Host "✓ Environment variable $envVar is configured" -ForegroundColor Green
        } else {
            Write-Host "✗ Environment variable $envVar is missing from render.yaml" -ForegroundColor Red
            $missingEnvVars += $envVar
        }
    }
}

# Check package.json for start script
Write-Host "
Checking package.json configuration..." -ForegroundColor Cyan
if (Test-Path "package.json") {
    $packageJson = Get-Content "package.json" -Raw | ConvertFrom-Json
    if ($packageJson.scripts -and $packageJson.scripts.start) {
        Write-Host "✓ start script is defined in package.json" -ForegroundColor Green
    } else {
        Write-Host "✗ start script is missing from package.json" -ForegroundColor Red
    }
}

# Summary
Write-Host "
Deployment Readiness Summary:" -ForegroundColor Cyan
if ($missingRequiredFiles.Count -eq 0 -and $missingEnvVars.Count -eq 0) {
    Write-Host "✓ Your application is ready for deployment to Render!" -ForegroundColor Green
} else {
    Write-Host "✗ Your application needs some adjustments before deploying to Render:" -ForegroundColor Red
    
    if ($missingRequiredFiles.Count -gt 0) {
        Write-Host "  - Missing required files: $($missingRequiredFiles -join ', ')" -ForegroundColor Red
    }
    
    if ($missingEnvVars.Count -gt 0) {
        Write-Host "  - Missing environment variables in render.yaml: $($missingEnvVars -join ', ')" -ForegroundColor Red
    }
}

Write-Host "
Next steps:" -ForegroundColor Cyan
Write-Host "1. Create a GitHub repository using the setup scripts" -ForegroundColor White
Write-Host "2. Connect your GitHub repository to Render" -ForegroundColor White
Write-Host "3. Configure environment variables in Render dashboard" -ForegroundColor White
Write-Host "4. Deploy your application" -ForegroundColor White