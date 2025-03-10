// Domain Authority Checker Tool
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('domainAuthorityForm');
    const loadingIcon = document.getElementById('loadingIcon');

    // Form submission handler
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        await checkDomainAuthority();
    });
});

// Check Domain Authority
async function checkDomainAuthority() {
    const domain = document.getElementById('domain').value.trim();
    const checkType = document.getElementById('checkType').value;

    // Validate domain
    if (!domain) {
        alert('Please enter a domain name.');
        return;
    }

    // Show loading state
    const submitButton = document.querySelector('#domainAuthorityForm button[type="submit"]');
    const loadingIcon = document.getElementById('loadingIcon');
    submitButton.disabled = true;
    loadingIcon.classList.remove('d-none');

    try {
        // Simulate checking domain authority (in a real implementation, this would use an API)
        const results = await simulateDomainAuthorityCheck(domain, checkType);
        
        // Display results
        displayResults(results);
    } catch (error) {
        alert('Error checking domain authority: ' + error.message);
    } finally {
        // Reset loading state
        submitButton.disabled = false;
        loadingIcon.classList.add('d-none');
    }
}

// Simulate Domain Authority Check (Mock implementation)
async function simulateDomainAuthorityCheck(domain, checkType) {
    // This is a mock implementation. In a real application, this would use an API
    // to check actual domain authority metrics.
    
    return new Promise(resolve => {
        setTimeout(() => {
            const daScore = Math.floor(Math.random() * 50) + 20; // Random score between 20-70
            const paScore = Math.floor(Math.random() * 50) + 20;
            
            const results = {
                domain,
                checkType,
                scores: {
                    domainAuthority: daScore,
                    pageAuthority: paScore,
                    trend: {
                        domainAuthority: Math.random() > 0.5 ? 'up' : 'down',
                        pageAuthority: Math.random() > 0.5 ? 'up' : 'down'
                    }
                },
                metrics: {
                    backlinks: Math.floor(Math.random() * 10000),
                    referringDomains: Math.floor(Math.random() * 1000),
                    organicKeywords: Math.floor(Math.random() * 5000),
                    organicTraffic: Math.floor(Math.random() * 100000)
                },
                factors: [
                    {
                        name: 'Backlink Profile',
                        score: Math.floor(Math.random() * 100),
                        impact: 'high'
                    },
                    {
                        name: 'Content Quality',
                        score: Math.floor(Math.random() * 100),
                        impact: 'high'
                    },
                    {
                        name: 'Technical SEO',
                        score: Math.floor(Math.random() * 100),
                        impact: 'medium'
                    },
                    {
                        name: 'Social Signals',
                        score: Math.floor(Math.random() * 100),
                        impact: 'low'
                    }
                ],
                recommendations: []
            };

            // Generate recommendations based on scores
            if (daScore < 30) {
                results.recommendations.push('Focus on building quality backlinks from authoritative domains');
                results.recommendations.push('Improve your content quality and relevance');
            }
            if (paScore < 30) {
                results.recommendations.push('Optimize your page content and meta tags');
                results.recommendations.push('Create more internal links to important pages');
            }
            if (results.metrics.backlinks < 1000) {
                results.recommendations.push('Develop a comprehensive link building strategy');
            }
            if (results.metrics.referringDomains < 100) {
                results.recommendations.push('Diversify your backlink profile with more unique domains');
            }

            resolve(results);
        }, 2000); // Simulate network delay
    });
}

// Display Results
function displayResults(results) {
    const resultsCard = document.getElementById('resultsCard');
    const daScore = document.getElementById('daScore');
    const paScore = document.getElementById('paScore');
    const daTrend = document.getElementById('daTrend');
    const paTrend = document.getElementById('paTrend');
    const metrics = document.getElementById('metrics');
    const factors = document.getElementById('factors');
    const recommendations = document.getElementById('recommendations');

    // Show results card
    resultsCard.style.display = 'block';

    // Display scores and trends
    daScore.textContent = results.scores.domainAuthority;
    paScore.textContent = results.scores.pageAuthority;
    
    daTrend.innerHTML = `
        <i class="fas fa-arrow-${results.scores.trend.domainAuthority === 'up' ? 'up text-success' : 'down text-danger'}"></i>
        ${results.scores.trend.domainAuthority === 'up' ? 'Increasing' : 'Decreasing'}
    `;
    
    paTrend.innerHTML = `
        <i class="fas fa-arrow-${results.scores.trend.pageAuthority === 'up' ? 'up text-success' : 'down text-danger'}"></i>
        ${results.scores.trend.pageAuthority === 'up' ? 'Increasing' : 'Decreasing'}
    `;

    // Display metrics
    metrics.innerHTML = `
        <div class="col-md-3">
            <div class="card bg-light">
                <div class="card-body text-center">
                    <h6>Backlinks</h6>
                    <p class="h4">${results.metrics.backlinks.toLocaleString()}</p>
                </div>
            </div>
        </div>
        <div class="col-md-3">
            <div class="card bg-light">
                <div class="card-body text-center">
                    <h6>Referring Domains</h6>
                    <p class="h4">${results.metrics.referringDomains.toLocaleString()}</p>
                </div>
            </div>
        </div>
        <div class="col-md-3">
            <div class="card bg-light">
                <div class="card-body text-center">
                    <h6>Organic Keywords</h6>
                    <p class="h4">${results.metrics.organicKeywords.toLocaleString()}</p>
                </div>
            </div>
        </div>
        <div class="col-md-3">
            <div class="card bg-light">
                <div class="card-body text-center">
                    <h6>Organic Traffic</h6>
                    <p class="h4">${results.metrics.organicTraffic.toLocaleString()}</p>
                </div>
            </div>
        </div>
    `;

    // Display factors
    factors.innerHTML = `
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>Factor</th>
                    <th>Score</th>
                    <th>Impact</th>
                </tr>
            </thead>
            <tbody>
                ${results.factors.map(factor => `
                    <tr>
                        <td>${factor.name}</td>
                        <td>
                            <div class="progress">
                                <div class="progress-bar" role="progressbar" 
                                    style="width: ${factor.score}%" 
                                    aria-valuenow="${factor.score}" 
                                    aria-valuemin="0" 
                                    aria-valuemax="100">
                                    ${factor.score}%
                                </div>
                            </div>
                        </td>
                        <td>
                            <span class="badge bg-${factor.impact === 'high' ? 'danger' : factor.impact === 'medium' ? 'warning' : 'info'}">
                                ${factor.impact}
                            </span>
                        </td>
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

// Update Chart
function updateChart(results) {
    const ctx = document.getElementById('authorityChart').getContext('2d');
    
    // Destroy existing chart if it exists
    if (window.authorityChart) {
        window.authorityChart.destroy();
    }

    // Create new chart
    window.authorityChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: results.factors.map(f => f.name),
            datasets: [{
                label: 'Factor Scores',
                data: results.factors.map(f => f.score),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
}

// Export Results
function exportResults() {
    const results = {
        domain: document.getElementById('domain').value,
        domainAuthority: document.getElementById('daScore').textContent,
        pageAuthority: document.getElementById('paScore').textContent,
        metrics: {
            backlinks: document.querySelector('#metrics .col-md-3:nth-child(1) .h4').textContent,
            referringDomains: document.querySelector('#metrics .col-md-3:nth-child(2) .h4').textContent,
            organicKeywords: document.querySelector('#metrics .col-md-3:nth-child(3) .h4').textContent,
            organicTraffic: document.querySelector('#metrics .col-md-3:nth-child(4) .h4').textContent
        },
        factors: Array.from(document.querySelectorAll('#factors table tbody tr')).map(row => ({
            name: row.cells[0].textContent,
            score: row.cells[1].querySelector('.progress-bar').style.width,
            impact: row.cells[2].textContent.trim()
        })),
        recommendations: Array.from(document.querySelectorAll('#recommendations ul li')).map(li => li.textContent)
    };

    const csv = [
        ['Domain Authority Report'],
        ['Domain', results.domain],
        ['Domain Authority', results.domainAuthority],
        ['Page Authority', results.pageAuthority],
        [],
        ['Metrics'],
        ['Backlinks', results.metrics.backlinks],
        ['Referring Domains', results.metrics.referringDomains],
        ['Organic Keywords', results.metrics.organicKeywords],
        ['Organic Traffic', results.metrics.organicTraffic],
        [],
        ['Authority Factors'],
        ['Factor', 'Score', 'Impact'],
        ...results.factors.map(f => [f.name, f.score, f.impact]),
        [],
        ['Recommendations'],
        ...results.recommendations.map(r => [r])
    ].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'domain-authority-report.csv';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
} 