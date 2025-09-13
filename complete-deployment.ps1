# complete-deployment.ps1
Write-Host "Arogya Saathi - Complete Deployment Process" -ForegroundColor Green
Write-Host "===========================================" -ForegroundColor Green

# Step 1: Build the frontend
Write-Host "Step 1: Building frontend application..." -ForegroundColor Yellow
cd "arogya-saathi-app"
.\build.ps1

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Frontend build failed. Deployment aborted." -ForegroundColor Red
    exit 1
}

# Step 2: Prepare for GitHub
Write-Host "Step 2: Preparing for GitHub..." -ForegroundColor Yellow
cd ..
.\deploy-to-github.ps1

Write-Host "✅ Deployment preparation completed!" -ForegroundColor Green
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Create a repository on GitHub" -ForegroundColor Yellow
Write-Host "2. Run: git remote add origin https://nishant4671/arogya-saathi.git" -ForegroundColor Yellow
Write-Host "3. Run: git push -u origin main" -ForegroundColor Yellow