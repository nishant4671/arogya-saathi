# setup-env.ps1
Write-Host "Setting up Arogya Saathi development environment..." -ForegroundColor Green

# Check if Node.js is installed
if (!(Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Node.js is not installed. Please install Node.js first." -ForegroundColor Red
    exit 1
}

Write-Host "✅ Node.js is installed" -ForegroundColor Green

# Install dependencies
Write-Host "Installing dependencies..." -ForegroundColor Yellow
npm install

# Setup environment variables
if (!(Test-Path .\.env.local)) {
    Write-Host "Creating environment file..." -ForegroundColor Yellow
    @"
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_APP_ENV=development
"@ | Out-File -FilePath .\.env.local -Encoding UTF8
    Write-Host "✅ Created .env.local file" -ForegroundColor Green
} else {
    Write-Host "✅ .env.local already exists" -ForegroundColor Green
}

Write-Host "Environment setup complete!" -ForegroundColor Green
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Ensure your backend is running on port 3001" -ForegroundColor Yellow
Write-Host "2. Run: npm run dev" -ForegroundColor Yellow