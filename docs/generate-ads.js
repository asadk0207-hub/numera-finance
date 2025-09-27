// Generate ads.txt content dynamically
function generateAdsFile() {
    const content = 'google.com, pub-4629347255241535, DIRECT, f08c47fec0942fa0';
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    
    // Create download link
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ads.txt';
    a.style.display = 'none';
    document.body.appendChild(a);
    
    return content;
}

// For AdSense crawlers
if (window.location.pathname === '/ads.txt') {
    document.write('google.com, pub-4629347255241535, DIRECT, f08c47fec0942fa0');
}