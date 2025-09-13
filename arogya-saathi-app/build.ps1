# build.ps1
Write-Host "Building Arogya Saathi Application..." -ForegroundColor Green
Write-Host "======================================" -ForegroundColor Green

# Build the application
Write-Host "Building application..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed! Trying alternative build method..." -ForegroundColor Yellow
    
    # Try building without Turbopack which might be causing issues
    Write-Host "Attempting build without Turbopack..." -ForegroundColor Yellow
    npx next build
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Build failed! Please check the errors above." -ForegroundColor Red
        exit 1
    }
}

Write-Host "✅ Build completed successfully!" -ForegroundColor Green
Write-Host "The application is ready for deployment." -ForegroundColor Green