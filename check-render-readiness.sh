#!/bin/bash

# Bash script to check if the application is ready for deployment to Render

# Define required files
required_files=("server.js" "package.json" "render.yaml" "Procfile")

# Define recommended files
recommended_files=(".gitignore" "README.md" "RENDER_DEPLOYMENT.md")

# Define environment variables that should be set in render.yaml
required_env_vars=("NODE_ENV" "PORT" "MONGODB_URI" "JWT_SECRET" "SESSION_SECRET")

# Colors for output
GREEN="\033[0;32m"
YELLOW="\033[0;33m"
RED="\033[0;31m"
CYAN="\033[0;36m"
NC="\033[0m" # No Color

# Check required files
echo -e "${CYAN}Checking required files...${NC}"
missing_required_files=()
for file in "${required_files[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✓ $file exists${NC}"
    else
        echo -e "${RED}✗ $file is missing${NC}"
        missing_required_files+=("$file")
    fi
done

# Check recommended files
echo -e "\n${CYAN}Checking recommended files...${NC}"
for file in "${recommended_files[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✓ $file exists${NC}"
    else
        echo -e "${YELLOW}? $file is recommended but missing${NC}"
    fi
done

# Check render.yaml for environment variables
echo -e "\n${CYAN}Checking render.yaml configuration...${NC}"
if [ -f "render.yaml" ]; then
    missing_env_vars=()
    for env_var in "${required_env_vars[@]}"; do
        if grep -q "key:\s*$env_var" render.yaml; then
            echo -e "${GREEN}✓ Environment variable $env_var is configured${NC}"
        else
            echo -e "${RED}✗ Environment variable $env_var is missing from render.yaml${NC}"
            missing_env_vars+=("$env_var")
        fi
    done
fi

# Check package.json for start script
echo -e "\n${CYAN}Checking package.json configuration...${NC}"
if [ -f "package.json" ]; then
    if grep -q '"start"' package.json; then
        echo -e "${GREEN}✓ start script is defined in package.json${NC}"
    else
        echo -e "${RED}✗ start script is missing from package.json${NC}"
    fi
fi

# Summary
echo -e "\n${CYAN}Deployment Readiness Summary:${NC}"
if [ ${#missing_required_files[@]} -eq 0 ] && [ ${#missing_env_vars[@]} -eq 0 ]; then
    echo -e "${GREEN}✓ Your application is ready for deployment to Render!${NC}"
else
    echo -e "${RED}✗ Your application needs some adjustments before deploying to Render:${NC}"
    
    if [ ${#missing_required_files[@]} -gt 0 ]; then
        echo -e "${RED}  - Missing required files: ${missing_required_files[*]}${NC}"
    fi
    
    if [ ${#missing_env_vars[@]} -gt 0 ]; then
        echo -e "${RED}  - Missing environment variables in render.yaml: ${missing_env_vars[*]}${NC}"
    fi
fi

echo -e "\n${CYAN}Next steps:${NC}"
echo -e "1. Create a GitHub repository using the setup scripts"
echo -e "2. Connect your GitHub repository to Render"
echo -e "3. Configure environment variables in Render dashboard"
echo -e "4. Deploy your application"