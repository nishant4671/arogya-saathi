# seed-database.ps1
Write-Host "Seeding database with sample data..." -ForegroundColor Green

# Run backend seed script
cd ../arogya-saathi-backend
npm run seed

if ($LASTEXITCODE -ne 0) {
    Write-Host "Database seeding failed!" -ForegroundColor Red
    exit 1
}

Write-Host "Database seeded successfully!" -ForegroundColor Green