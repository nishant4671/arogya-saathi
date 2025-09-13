# deploy-to-github.ps1
Write-Host "Preparing Arogya Saathi for GitHub Deployment..." -ForegroundColor Green
Write-Host "=================================================" -ForegroundColor Green

# Check if Git is installed
if (!(Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Git is not installed. Please install Git first." -ForegroundColor Red
    exit 1
}

# Initialize Git in the main directory (if not already initialized)
if (!(Test-Path .\.git)) {
    Write-Host "Initializing Git repository..." -ForegroundColor Yellow
    git init
}

# Create .gitignore file if it doesn't exist
if (!(Test-Path .\.gitignore)) {
    Write-Host "Creating .gitignore file..." -ForegroundColor Yellow
    @"
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Production builds
.next/
build/
dist/

# Environment variables
.env*
!.env.example

# IDE files
.vscode/
.idea/
*.swp
*.swo

# OS files
.DS_Store
Thumbs.db

# Logs
logs/
*.log

# Runtime data
pids/
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/

# Runtime data
pids/
*.pid
*.seed
*.pid.lock

# Optional npm cache directory
.npm

# Optional eslint cache
.eslintcache

# Microbundle cache
.rpt2_cache/
.rts2_cache_cjs/
.rts2_cache_es/
.rts2_cache_umd/

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# dotenv environment variables file
.env

# parcel-bundler cache (https://parceljs.org/)
.cache
.parcel-cache

# next.js build output
.next

# nuxt.js build output
.nuxt

# vuepress build output
.vuepress/dist

# Serverless directories
.serverless

# FuseBox cache
.fusebox/

# DynamoDB Local files
.dynamodb/

# TernJS port file
.tern-port
"@ | Out-File -FilePath .\.gitignore -Encoding UTF8
}

# Add all files to Git
Write-Host "Adding files to Git..." -ForegroundColor Yellow
git add .

# Commit changes
Write-Host "Committing changes..." -ForegroundColor Yellow
git commit -m "Initial commit: Arogya Saathi Healthcare Platform"

Write-Host "✅ Project is ready for GitHub!" -ForegroundColor Green
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Create a new repository on GitHub" -ForegroundColor Yellow
Write-Host "2. Run: git remote add origin https://github.com/nishant4671/arogya-saathi.git" -ForegroundColor Yellow
Write-Host "3. Run: git push -u origin main" -ForegroundColor Yellow