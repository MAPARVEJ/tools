// Google Index Checker Tool
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('indexCheckerForm');
    const loadingIcon = document.getElementById('loadingIcon');

    // Form submission handler
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        await checkIndexing();
    });
});

// Check Indexing Status
async function checkIndexing() {
    const urls = document.getElementById('urls').value
        .split('\n')
        .map(url => url.trim())
        .filter(url => url);
    
    const checkType = document.getElementById('checkType').value;

    // Validate URLs
    if (urls.length === 0) {
        alert('Please enter at least one URL to check.');
        return;
    }

    if (urls.length > 10) {
        alert('Please enter no more than 10 URLs at a time.');
        return;
    }

    // Show loading state
    const submitButton = document.querySelector('#indexCheckerForm button[type="submit"]');
    const loadingIcon = document.getElementById('loadingIcon');
    submitButton.disabled = true;
    loadingIcon.classList.remove('d-none');

    try {
        // Simulate checking indexing status (in a real implementation, this would use Google's API)
        const results = await simulateIndexCheck(urls, checkType);
        
        // Display results
        displayResults(results);
    } catch (error) {
        alert('Error checking indexing status: ' + error.message);
    } finally {
        // Reset loading state
        submitButton.disabled = false;
        loadingIcon.classList.add('d-none');
    }
}

// Simulate Index Check (Mock implementation)
async function simulateIndexCheck(urls, checkType) {
    // This is a mock implementation. In a real application, this would use Google's API
    // to check actual indexing status.
    
    return new Promise(resolve => {
        setTimeout(() => {
            const results = urls.map(url => {
                const status = Math.random() > 0.5 ? 'indexed' : 'not indexed';
                const lastCrawl = status === 'indexed' ? 
                    new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString() : 
                    null;
                const pageRank = status === 'indexed' ? 
                    Math.floor(Math.random() * 10) : 0;
                
                return {
                    url,
                    status,
                    lastCrawl,
                    pageRank,
                    issues: status === 'not indexed' ? 
                        ['Page not found in Google index', 'No backlinks detected'] : 
                        []
                };
            });
            
            resolve(results);
        }, 2000); // Simulate network delay
    });
}

// Display Results
function displayResults(results) {
    const resultsCard = document.getElementById('resultsCard');
    const summary = document.getElementById('summary');
    const resultsTable = document.getElementById('results');
    const recommendations = document.getElementById('recommendations');

    // Show results card
    resultsCard.style.display = 'block';

    // Calculate summary statistics
    const indexedCount = results.filter(r => r.status === 'indexed').length;
    const notIndexedCount = results.filter(r => r.status === 'not indexed').length;
    const averagePageRank = results.reduce((sum, r) => sum + r.pageRank, 0) / results.length;

    // Display summary
    summary.innerHTML = `
        <div class="col-md-4">
            <div class="card bg-light">
                <div class="card-body">
                    <h6>Indexed Pages</h6>
                    <p class="h3">${indexedCount}</p>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="card bg-light">
                <div class="card-body">
                    <h6>Not Indexed</h6>
                    <p class="h3">${notIndexedCount}</p>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="card bg-light">
                <div class="card-body">
                    <h6>Avg. Page Rank</h6>
                    <p class="h3">${averagePageRank.toFixed(1)}</p>
                </div>
            </div>
        </div>
    `;

    // Display detailed results
    resultsTable.innerHTML = `
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>URL</th>
                    <th>Status</th>
                    <th>Last Crawl</th>
                    <th>Page Rank</th>
                    <th>Issues</th>
                </tr>
            </thead>
            <tbody>
                ${results.map(result => `
                    <tr>
                        <td>${result.url}</td>
                        <td>
                            <span class="badge ${result.status === 'indexed' ? 'bg-success' : 'bg-danger'}">
                                ${result.status}
                            </span>
                        </td>
                        <td>${result.lastCrawl ? new Date(result.lastCrawl).toLocaleDateString() : 'N/A'}</td>
                        <td>${result.pageRank}</td>
                        <td>
                            ${result.issues.map(issue => `
                                <div class="text-danger small">${issue}</div>
                            `).join('')}
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;

    // Display recommendations
    const recommendationsList = [];
    if (notIndexedCount > 0) {
        recommendationsList.push('Submit your sitemap to Google Search Console');
        recommendationsList.push('Check for technical issues preventing indexing');
        recommendationsList.push('Ensure your pages are accessible to search engines');
    }
    if (averagePageRank < 5) {
        recommendationsList.push('Improve your content quality and relevance');
        recommendationsList.push('Build quality backlinks to your pages');
        recommendationsList.push('Optimize your meta tags and content structure');
    }

    recommendations.innerHTML = `
        <h6>Recommendations:</h6>
        <ul class="mb-0">
            ${recommendationsList.map(rec => `<li>${rec}</li>`).join('')}
        </ul>
    `;
}

// Export Results
function exportResults() {
    const results = [];
    const rows = document.querySelectorAll('#results table tbody tr');
    
    rows.forEach(row => {
        results.push({
            url: row.cells[0].textContent,
            status: row.cells[1].textContent.trim(),
            lastCrawl: row.cells[2].textContent,
            pageRank: row.cells[3].textContent,
            issues: Array.from(row.cells[4].querySelectorAll('div')).map(div => div.textContent)
        });
    });

    const csv = [
        ['URL', 'Status', 'Last Crawl', 'Page Rank', 'Issues'],
        ...results.map(r => [
            r.url,
            r.status,
            r.lastCrawl,
            r.pageRank,
            r.issues.join('; ')
        ])
    ].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'indexing-results.csv';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
} 