# fix-authcontext.ps1
Write-Host "Fixing AuthContext imports across all files..."

# Get all TypeScript and TSX files
$files = Get-ChildItem -Path . -Recurse -Include *.tsx, *.ts

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    
    # Replace useContext(AuthContext) with useAuth()
    $content = $content -replace 'useContext\(AuthContext\)', 'useAuth()'
    
    # Replace AuthContext import with useAuth import
    if ($content -match 'import.*AuthContext.*from') {
        $content = $content -replace 'import.*AuthContext.*from.*;', "import { useAuth } from '@/app/context/AuthContext';"
    }
    
    # Save the changes
    Set-Content -Path $file.FullName -Value $content -NoNewline
    Write-Host "Fixed: $($file.Name)"
}

Write-Host "All files have been updated successfully!"