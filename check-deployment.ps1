# Check GitHub Pages Deployment Status
# Run this script after enabling GitHub Pages

$url = "https://asadk0207-hub.github.io/numera-finance/"
$maxAttempts = 10
$attempt = 1

Write-Host "🚀 Checking GitHub Pages deployment..." -ForegroundColor Cyan
Write-Host "URL: $url" -ForegroundColor Yellow
Write-Host ""

while ($attempt -le $maxAttempts) {
    try {
        Write-Host "[$attempt/$maxAttempts] Checking..." -NoNewline
        
        $response = Invoke-WebRequest -Uri $url -Method Head -TimeoutSec 10
        
        if ($response.StatusCode -eq 200) {
            Write-Host " ✅ SUCCESS!" -ForegroundColor Green
            Write-Host ""
            Write-Host "🎉 Your Numera Financial Tools website is LIVE!" -ForegroundColor Green
            Write-Host "🌐 Visit: $url" -ForegroundColor Cyan
            Write-Host ""
            Write-Host "📊 Response Details:" -ForegroundColor Yellow
            Write-Host "Status Code: $($response.StatusCode)" -ForegroundColor White
            Write-Host "Server: $($response.Headers.Server)" -ForegroundColor White
            Write-Host "Content-Type: $($response.Headers.'Content-Type')" -ForegroundColor White
            break
        }
    }
    catch {
        Write-Host " ❌ Not ready yet" -ForegroundColor Red
        
        if ($attempt -eq $maxAttempts) {
            Write-Host ""
            Write-Host "⏰ Deployment is taking longer than expected." -ForegroundColor Yellow
            Write-Host "📋 Manual steps to check:" -ForegroundColor Cyan
            Write-Host "1. Go to: https://github.com/asadk0207-hub/numera-finance" -ForegroundColor White
            Write-Host "2. Click Settings → Pages" -ForegroundColor White
            Write-Host "3. Make sure it shows: 'Your site is published at...'" -ForegroundColor White
            Write-Host "4. GitHub Pages can take 5-10 minutes for first deployment" -ForegroundColor White
        } else {
            Write-Host " (Retrying in 30 seconds...)" -ForegroundColor Gray
            Start-Sleep -Seconds 30
        }
    }
    
    $attempt++
}

Write-Host ""
Write-Host "💡 If still not working, ensure you've enabled GitHub Pages:" -ForegroundColor Cyan
Write-Host "   → Settings → Pages → Source: Deploy from branch → Branch: main → Save" -ForegroundColor White