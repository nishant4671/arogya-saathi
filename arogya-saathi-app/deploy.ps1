# deploy.ps1
Write-Host "Deploying Arogya Saathi Application..." -ForegroundColor Green
Write-Host "======================================" -ForegroundColor Green

# First, build the application
Write-Host "Building application..." -ForegroundColor Yellow
.\build.ps1

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Deployment aborted due to build failure." -ForegroundColor Red
    exit 1
}

# Deploy to Vercel (or your preferred platform)
Write-Host "Deploying to production..." -ForegroundColor Yellow
npx vercel --prod

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Deployment failed!" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Deployment completed successfully!" -ForegroundColor Green
Write-Host "Your application is now live in production." -ForegroundColor Green