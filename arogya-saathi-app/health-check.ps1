# health-check.ps1
Write-Host "Running Health Check..." -ForegroundColor Green
Write-Host "=========================" -ForegroundColor Green

# Check if backend is running
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3001/health" -Method Get -TimeoutSec 10
    Write-Host "✅ Backend server is running" -ForegroundColor Green
} catch {
    Write-Host "❌ Backend server is not responding: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Please start the backend server with: cd ../arogya-saathi-backend && npm run dev" -ForegroundColor Yellow
}

# Check if frontend is running  
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000" -Method Get -TimeoutSec 10
    Write-Host "✅ Frontend server is running" -ForegroundColor Green
} catch {
    Write-Host "❌ Frontend server is not responding: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Please start the frontend server with: npm run dev" -ForegroundColor Yellow
}

# Try to get a token for API testing
try {
    $body = @{
        email = "patient@arogyasaathi.com"
        password = "password"
        role = "patient"
    }
    $response = Invoke-WebRequest -Uri "http://localhost:3001/api/auth/login" -Method Post -Body ($body | ConvertTo-Json) -ContentType "application/json"
    $token = ($response.Content | ConvertFrom-Json).token
    
    # Test API with the new token
    $apiResponse = Invoke-WebRequest -Uri "http://localhost:3001/api/medicines" -Method Get -Headers @{ Authorization = "Bearer $token" } -TimeoutSec 10
    Write-Host "✅ Database connection is working" -ForegroundColor Green
} catch {
    Write-Host "❌ API test failed: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "Health check completed!" -ForegroundColor Green