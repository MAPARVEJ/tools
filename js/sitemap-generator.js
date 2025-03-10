// Sitemap Generator Tool
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('sitemapForm');
    const loadingIcon = document.getElementById('loadingIcon');

    // Form submission handler
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        await generateSitemap();
    });
});

// Generate Sitemap
async function generateSitemap() {
    const websiteUrl = document.getElementById('websiteUrl').value;
    const maxPages = parseInt(document.getElementById('maxPages').value);
    const changeFrequency = document.getElementById('changeFrequency').value;
    const priority = document.getElementById('priority').value;
    const excludePatterns = document.getElementById('excludePatterns').value
        .split('\n')
        .map(pattern => pattern.trim())
        .filter(pattern => pattern);

    // Show loading state
    const submitButton = document.querySelector('#sitemapForm button[type="submit"]');
    const loadingIcon = document.getElementById('loadingIcon');
    submitButton.disabled = true;
    loadingIcon.classList.remove('d-none');

    try {
        // Simulate crawling (in a real implementation, this would be a server-side operation)
        const urls = await simulateCrawling(websiteUrl, maxPages, excludePatterns);
        
        // Generate sitemap XML
        const sitemapXml = generateSitemapXml(urls, changeFrequency, priority);
        
        // Display results
        displayResults(urls, sitemapXml);
    } catch (error) {
        alert('Error generating sitemap: ' + error.message);
    } finally {
        // Reset loading state
        submitButton.disabled = false;
        loadingIcon.classList.add('d-none');
    }
}

// Simulate Crawling (Mock implementation)
async function simulateCrawling(websiteUrl, maxPages, excludePatterns) {
    // This is a mock implementation. In a real application, this would be a server-side operation
    // that actually crawls the website and respects robots.txt and other crawling rules.
    
    return new Promise(resolve => {
        setTimeout(() => {
            const urls = [
                { url: websiteUrl, lastmod: new Date().toISOString() },
                { url: `${websiteUrl}/about`, lastmod: new Date().toISOString() },
                { url: `${websiteUrl}/contact`, lastmod: new Date().toISOString() },
                { url: `${websiteUrl}/products`, lastmod: new Date().toISOString() },
                { url: `${websiteUrl}/blog`, lastmod: new Date().toISOString() }
            ].slice(0, maxPages);
            
            resolve(urls);
        }, 2000); // Simulate network delay
    });
}

// Generate Sitemap XML
function generateSitemapXml(urls, changeFrequency, priority) {
    const xml = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        ...urls.map(url => `
    <url>
        <loc>${escapeXml(url.url)}</loc>
        <lastmod>${url.lastmod}</lastmod>
        ${changeFrequency ? `<changefreq>${changeFrequency}</changefreq>` : ''}
        ${priority ? `<priority>${priority}</priority>` : ''}
    </url>`),
        '</urlset>'
    ].join('\n');

    return xml;
}

// Display Results
function displayResults(urls, sitemapXml) {
    const resultsCard = document.getElementById('resultsCard');
    const statistics = document.getElementById('statistics');
    const urlList = document.getElementById('urlList');
    const sitemapXmlElement = document.getElementById('sitemapXml');

    // Show results card
    resultsCard.style.display = 'block';

    // Display statistics
    statistics.innerHTML = `
        <div class="col-md-4">
            <div class="card bg-light">
                <div class="card-body">
                    <h6>Total URLs</h6>
                    <p class="h3">${urls.length}</p>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="card bg-light">
                <div class="card-body">
                    <h6>Change Frequency</h6>
                    <p class="h3">${document.getElementById('changeFrequency').value}</p>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="card bg-light">
                <div class="card-body">
                    <h6>Default Priority</h6>
                    <p class="h3">${document.getElementById('priority').value}</p>
                </div>
            </div>
        </div>
    `;

    // Display URL list
    urlList.innerHTML = `
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>URL</th>
                    <th>Last Modified</th>
                </tr>
            </thead>
            <tbody>
                ${urls.map(url => `
                    <tr>
                        <td>${url.url}</td>
                        <td>${new Date(url.lastmod).toLocaleDateString()}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;

    // Store XML for download/copy
    sitemapXmlElement.textContent = sitemapXml;
}

// Download Sitemap
function downloadSitemap() {
    const sitemapXml = document.getElementById('sitemapXml').textContent;
    const blob = new Blob([sitemapXml], { type: 'application/xml' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sitemap.xml';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
}

// Copy to Clipboard
function copyToClipboard() {
    const sitemapXml = document.getElementById('sitemapXml').textContent;
    const textArea = document.createElement('textarea');
    textArea.value = sitemapXml;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);

    // Show feedback
    const button = document.querySelector('button[onclick="copyToClipboard()"]');
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-check"></i> Copied!';
    setTimeout(() => {
        button.innerHTML = originalText;
    }, 2000);
}

// Helper function to escape XML special characters
function escapeXml(text) {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
} 