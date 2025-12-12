# PowerShell script to run Cypress tests
Write-Host "🚀 Starting Cypress E2E Tests..." -ForegroundColor Cyan
Write-Host "`nWaiting for development server..." -ForegroundColor Yellow

# Wait for server to be ready
Start-Sleep -Seconds 5

# Test server connectivity
Write-Host "Testing server connectivity on http://localhost:3001..." -ForegroundColor Yellow
$maxAttempts = 5
$attempt = 1
$serverReady = $false

while ($attempt -le $maxAttempts -and -not $serverReady) {
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:3001" -Method Get -TimeoutSec 2 -ErrorAction Stop
        $serverReady = $true
        Write-Host "✓ Server is responding on port 3001" -ForegroundColor Green
    } catch {
        Write-Host "  Attempt $attempt/$maxAttempts: Server not ready, retrying..." -ForegroundColor Yellow
        Start-Sleep -Seconds 2
        $attempt++
    }
}

if (-not $serverReady) {
    Write-Host "✗ Server failed to respond after $maxAttempts attempts" -ForegroundColor Red
    Write-Host "Please ensure 'npm run dev' is running in another terminal" -ForegroundColor Red
    exit 1
}

# Run Cypress tests
Write-Host "`nRunning Cypress E2E tests..." -ForegroundColor Cyan
Write-Host "Base URL: http://localhost:3001" -ForegroundColor Gray
Write-Host "Test File: cypress/e2e/portfolio.cy.js" -ForegroundColor Gray
Write-Host "`n" -ForegroundColor Gray

npx cypress run --headless 2>&1

$exitCode = $LASTEXITCODE
if ($exitCode -eq 0) {
    Write-Host "`n✓ All Cypress tests completed successfully!" -ForegroundColor Green
} else {
    Write-Host "`n✗ Cypress tests failed with exit code: $exitCode" -ForegroundColor Red
}

exit $exitCode
