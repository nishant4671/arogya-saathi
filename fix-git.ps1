# fix-git.ps1
Write-Host "Fixing Git repository structure..." -ForegroundColor Green

# Remove existing Git repositories from subdirectories
if (Test-Path "arogya-saathi-app\.git") {
    Write-Host "Removing Git from arogya-saathi-app..." -ForegroundColor Yellow
    Remove-Item -Recurse -Force "arogya-saathi-app\.git"
}

if (Test-Path "arogya-saathi-backend\.git") {
    Write-Host "Removing Git from arogya-saathi-backend..." -ForegroundColor Yellow
    Remove-Item -Recurse -Force "arogya-saathi-backend\.git"
}

# Reinitialize Git in the main directory
Write-Host "Reinitializing Git in main directory..." -ForegroundColor Yellow
Remove-Item -Recurse -Force ".git" -ErrorAction SilentlyContinue
git init

# Add all files to Git
Write-Host "Adding files to Git..." -ForegroundColor Yellow
git add .

# Commit changes
Write-Host "Committing changes..." -ForegroundColor Yellow
git commit -m "Initial commit: Arogya Saathi Healthcare Platform"

Write-Host "✅ Git structure fixed!" -ForegroundColor Green