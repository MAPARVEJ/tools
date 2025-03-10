// Backlink Checker Tool
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('backlinkCheckerForm');
    const loadingIcon = document.getElementById('loadingIcon');

    // Form submission handler
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        await checkBacklinks();
    });
});

// Check Backlinks
async function checkBacklinks() {
    const domain = document.getElementById('domain').value.trim();
    const checkType = document.getElementById('checkType').value;
    const maxResults = parseInt(document.getElementById('maxResults').value);

    // Validate domain
    if (!domain) {
        alert('Please enter a domain name.');
        return;
    }

    // Show loading state
    const submitButton = document.querySelector('#backlinkCheckerForm button[type="submit"]');
    const loadingIcon = document.getElementById('loadingIcon');
    submitButton.disabled = true;
    loadingIcon.classList.remove('d-none');

    try {
        // Simulate checking backlinks (in a real implementation, this would use an API)
        const results = await simulateBacklinkCheck(domain, checkType, maxResults);
        
        // Display results
        displayResults(results);
    } catch (error) {
        alert('Error checking backlinks: ' + error.message);
    } finally {
        // Reset loading state
        submitButton.disabled = false;
        loadingIcon.classList.add('d-none');
    }
}

// Simulate Backlink Check (Mock implementation)
async function simulateBacklinkCheck(domain, checkType, maxResults) {
    // This is a mock implementation. In a real application, this would use an API
    // to check actual backlink data.
    
    return new Promise(resolve => {
        setTimeout(() => {
            const totalBacklinks = Math.floor(Math.random() * 10000);
            const referringDomains = Math.floor(Math.random() * 1000);
            const averageDA = Math.floor(Math.random() * 50) + 20;
            const followRatio = Math.floor(Math.random() * 30) + 70; // 70-100% follow ratio

            const backlinkTypes = {
                text: Math.floor(totalBacklinks * 0.6),
                image: Math.floor(totalBacklinks * 0.2),
                redirect: Math.floor(totalBacklinks * 0.1),
                other: totalBacklinks - Math.floor(totalBacklinks * 0.9)
            };

            const topDomains = Array.from({ length: 5 }, (_, i) => ({
                domain: `example${i + 1}.com`,
                backlinks: Math.floor(Math.random() * 1000),
                da: Math.floor(Math.random() * 50) + 20,
                follow: Math.random() > 0.3
            }));

            const backlinks = Array.from({ length: Math.min(10, maxResults) }, (_, i) => ({
                sourceUrl: `https://example${i + 1}.com/page${i + 1}`,
                targetUrl: `https://${domain}/page${i + 1}`,
                anchorText: `Link ${i + 1}`,
                type: Object.keys(backlinkTypes)[Math.floor(Math.random() * 4)],
                follow: Math.random() > 0.3,
                da: Math.floor(Math.random() * 50) + 20,
                firstSeen: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString()
            }));

            const results = {
                domain,
                checkType,
                maxResults,
                summary: {
                    totalBacklinks,
                    referringDomains,
                    averageDA,
                    followRatio
                },
                backlinkTypes,
                topDomains,
                backlinks,
                recommendations: []
            };

            // Generate recommendations based on analysis
            if (followRatio < 80) {
                results.recommendations.push('Focus on acquiring more dofollow backlinks');
            }
            if (averageDA < 30) {
                results.recommendations.push('Seek backlinks from higher authority domains');
            }
            if (referringDomains < 100) {
                results.recommendations.push('Diversify your backlink profile with more unique domains');
            }
            if (backlinkTypes.text < totalBacklinks * 0.5) {
                results.recommendations.push('Increase the number of text-based backlinks');
            }

            resolve(results);
        }, 2000); // Simulate network delay
    });
}

// Display Results
function displayResults(results) {
    const resultsCard = document.getElementById('resultsCard');
    const totalBacklinks = document.getElementById('totalBacklinks');
    const referringDomains = document.getElementById('referringDomains');
    const averageDA = document.getElementById('averageDA');
    const followRatio = document.getElementById('followRatio');
    const topDomains = document.getElementById('topDomains');
    const backlinkDetails = document.getElementById('backlinkDetails');
    const recommendations = document.getElementById('recommendations');

    // Show results card
    resultsCard.style.display = 'block';

    // Display summary metrics
    totalBacklinks.textContent = results.summary.totalBacklinks.toLocaleString();
    referringDomains.textContent = results.summary.referringDomains.toLocaleString();
    averageDA.textContent = results.summary.averageDA;
    followRatio.textContent = `${results.summary.followRatio}%`;

    // Display top domains
    topDomains.innerHTML = `
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>Domain</th>
                    <th>Backlinks</th>
                    <th>DA</th>
                    <th>Follow</th>
                </tr>
            </thead>
            <tbody>
                ${results.topDomains.map(domain => `
                    <tr>
                        <td>${domain.domain}</td>
                        <td>${domain.backlinks.toLocaleString()}</td>
                        <td>${domain.da}</td>
                        <td>
                            <span class="badge bg-${domain.follow ? 'success' : 'warning'}">
                                ${domain.follow ? 'Follow' : 'Nofollow'}
                            </span>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;

    // Display backlink details
    backlinkDetails.innerHTML = `
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>Source URL</th>
                    <th>Target URL</th>
                    <th>Anchor Text</th>
                    <th>Type</th>
                    <th>Follow</th>
                    <th>DA</th>
                    <th>First Seen</th>
                </tr>
            </thead>
            <tbody>
                ${results.backlinks.map(backlink => `
                    <tr>
                        <td><a href="${backlink.sourceUrl}" target="_blank">${backlink.sourceUrl}</a></td>
                        <td><a href="${backlink.targetUrl}" target="_blank">${backlink.targetUrl}</a></td>
                        <td>${backlink.anchorText}</td>
                        <td>
                            <span class="badge bg-${getBadgeColor(backlink.type)}">
                                ${backlink.type}
                            </span>
                        </td>
                        <td>
                            <span class="badge bg-${backlink.follow ? 'success' : 'warning'}">
                                ${backlink.follow ? 'Follow' : 'Nofollow'}
                            </span>
                        </td>
                        <td>${backlink.da}</td>
                        <td>${new Date(backlink.firstSeen).toLocaleDateString()}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;

    // Display recommendations
    recommendations.innerHTML = `
        <h6>Recommendations:</h6>
        <ul class="mb-0">
            ${results.recommendations.map(rec => `<li>${rec}</li>`).join('')}
        </ul>
    `;

    // Update chart
    updateChart(results);
}

// Get Badge Color
function getBadgeColor(type) {
    const colors = {
        text: 'primary',
        image: 'info',
        redirect: 'warning',
        other: 'secondary'
    };
    return colors[type] || 'secondary';
}

// Update Chart
function updateChart(results) {
    const ctx = document.getElementById('backlinkChart').getContext('2d');
    
    // Destroy existing chart if it exists
    if (window.backlinkChart) {
        window.backlinkChart.destroy();
    }

    // Create new chart
    window.backlinkChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: Object.keys(results.backlinkTypes),
            datasets: [{
                data: Object.values(results.backlinkTypes),
                backgroundColor: [
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

// Export Results
function exportResults() {
    const results = {
        domain: document.getElementById('domain').value,
        summary: {
            totalBacklinks: document.getElementById('totalBacklinks').textContent,
            referringDomains: document.getElementById('referringDomains').textContent,
            averageDA: document.getElementById('averageDA').textContent,
            followRatio: document.getElementById('followRatio').textContent
        },
        topDomains: Array.from(document.querySelectorAll('#topDomains table tbody tr')).map(row => ({
            domain: row.cells[0].textContent,
            backlinks: row.cells[1].textContent,
            da: row.cells[2].textContent,
            follow: row.cells[3].textContent.trim()
        })),
        backlinks: Array.from(document.querySelectorAll('#backlinkDetails table tbody tr')).map(row => ({
            sourceUrl: row.cells[0].textContent,
            targetUrl: row.cells[1].textContent,
            anchorText: row.cells[2].textContent,
            type: row.cells[3].textContent.trim(),
            follow: row.cells[4].textContent.trim(),
            da: row.cells[5].textContent,
            firstSeen: row.cells[6].textContent
        })),
        recommendations: Array.from(document.querySelectorAll('#recommendations ul li')).map(li => li.textContent)
    };

    const csv = [
        ['Backlink Analysis Report'],
        ['Domain', results.domain],
        [],
        ['Summary'],
        ['Total Backlinks', results.summary.totalBacklinks],
        ['Referring Domains', results.summary.referringDomains],
        ['Average DA', results.summary.averageDA],
        ['Follow Ratio', results.summary.followRatio],
        [],
        ['Top Referring Domains'],
        ['Domain', 'Backlinks', 'DA', 'Follow'],
        ...results.topDomains.map(d => [d.domain, d.backlinks, d.da, d.follow]),
        [],
        ['Backlink Details'],
        ['Source URL', 'Target URL', 'Anchor Text', 'Type', 'Follow', 'DA', 'First Seen'],
        ...results.backlinks.map(b => [
            b.sourceUrl,
            b.targetUrl,
            b.anchorText,
            b.type,
            b.follow,
            b.da,
            b.firstSeen
        ]),
        [],
        ['Recommendations'],
        ...results.recommendations.map(r => [r])
    ].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'backlink-analysis-report.csv';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
} 