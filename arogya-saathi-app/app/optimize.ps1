# optimize.ps1
Write-Host "Optimizing application..." -ForegroundColor Green

# Optimize images
if (Get-Command imagemin -ErrorAction SilentlyContinue) {
    Write-Host "Optimizing images..." -ForegroundColor Yellow
    npx imagemin public/images/* --out-dir=public/optimized-images
}

# Bundle analysis
Write-Host "Analyzing bundle size..." -ForegroundColor Yellow
npm run analyze

Write-Host "Optimization completed!" -ForegroundColor Green