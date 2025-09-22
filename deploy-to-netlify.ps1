# Netlify Deployment Helper Script
# Run this script to prepare and deploy your Numera Calculator Suite

Write-Host "🚀 Netlify Deployment Helper - Numera Calculator Suite" -ForegroundColor Cyan
Write-Host "=======================================================" -ForegroundColor Cyan
Write-Host ""

# Check current directory
$currentPath = Get-Location
Write-Host "📁 Current directory: $currentPath" -ForegroundColor Yellow

# List all files to be deployed
Write-Host ""
Write-Host "📋 Files ready for deployment:" -ForegroundColor Green
Get-ChildItem -File | Where-Object { $_.Name -notlike "*.ps1" -and $_.Name -notlike "*.md" -and $_.Name -ne "check-deployment.ps1" } | ForEach-Object {
    Write-Host "   ✓ $($_.Name)" -ForegroundColor White
}

Write-Host ""
Write-Host "🔧 Key fixes applied:" -ForegroundColor Cyan
Write-Host "   ✓ Updated all URLs to numera-calculators.netlify.app" -ForegroundColor Green
Write-Host "   ✓ Enhanced Google Analytics configuration" -ForegroundColor Green
Write-Host "   ✓ Fixed Content Security Policy" -ForegroundColor Green
Write-Host "   ✓ Updated Netlify headers for analytics" -ForegroundColor Green
Write-Host "   ✓ Added analytics test page" -ForegroundColor Green

Write-Host ""
Write-Host "🌐 Manual Deployment Steps:" -ForegroundColor Cyan
Write-Host "1. Open your browser and go to: https://app.netlify.com" -ForegroundColor White
Write-Host "2. Log in to your Netlify account" -ForegroundColor White
Write-Host "3. Find your 'numera-calculators' site" -ForegroundColor White
Write-Host "4. Go to the 'Deploys' tab" -ForegroundColor White
Write-Host "5. Drag and drop this entire folder to the deploy area" -ForegroundColor White
Write-Host "   OR click 'Deploy manually' and select this folder" -ForegroundColor White

Write-Host ""
Write-Host "📂 Folder to deploy: $currentPath" -ForegroundColor Yellow
Write-Host ""

# Check if the site is currently accessible
Write-Host "🔍 Checking current site status..." -ForegroundColor Cyan
try {
    $response = Invoke-WebRequest -Uri "https://numera-calculators.netlify.app" -Method Head -TimeoutSec 10
    Write-Host "✅ Site is currently accessible (Status: $($response.StatusCode))" -ForegroundColor Green
}
catch {
    Write-Host "⚠️  Site may not be accessible yet or needs deployment" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "⚡ After deployment:" -ForegroundColor Cyan
Write-Host "1. Wait 2-3 minutes for changes to propagate" -ForegroundColor White
Write-Host "2. Visit: https://numera-calculators.netlify.app" -ForegroundColor White
Write-Host "3. Test Google Analytics with: https://numera-calculators.netlify.app/test-analytics.html" -ForegroundColor White
Write-Host "4. Open browser console (F12) to verify analytics loading" -ForegroundColor White

Write-Host ""
Write-Host "💡 Pro tip: Use Ctrl+Shift+R to hard refresh and bypass cache" -ForegroundColor Cyan

# Offer to open Netlify dashboard
Write-Host ""
$openBrowser = Read-Host "Would you like me to open Netlify dashboard in your browser? (y/n)"
if ($openBrowser -eq 'y' -or $openBrowser -eq 'Y') {
    Start-Process "https://app.netlify.com/sites"
    Write-Host "✅ Opening Netlify dashboard..." -ForegroundColor Green
}

Write-Host ""
Write-Host "🎯 Press any key when deployment is complete to continue with verification..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")