// Mobile-Friendly Test Tool
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('mobileFriendlyForm');
    const loadingIcon = document.getElementById('loadingIcon');

    // Form submission handler
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        await testMobileFriendly();
    });
});

// Test Mobile-Friendly
async function testMobileFriendly() {
    const url = document.getElementById('url').value.trim();
    const deviceType = document.getElementById('deviceType').value;
    const checkType = document.getElementById('checkType').value;

    // Validate URL
    if (!url) {
        alert('Please enter a URL to test.');
        return;
    }

    try {
        new URL(url);
    } catch (error) {
        alert('Please enter a valid URL.');
        return;
    }

    // Show loading state
    const submitButton = document.querySelector('#mobileFriendlyForm button[type="submit"]');
    const loadingIcon = document.getElementById('loadingIcon');
    submitButton.disabled = true;
    loadingIcon.classList.remove('d-none');

    try {
        // Simulate mobile-friendly test (in a real implementation, this would use an API)
        const results = await simulateMobileFriendlyTest(url, deviceType, checkType);
        
        // Display results
        displayResults(results);
    } catch (error) {
        alert('Error testing mobile-friendliness: ' + error.message);
    } finally {
        // Reset loading state
        submitButton.disabled = false;
        loadingIcon.classList.add('d-none');
    }
}

// Simulate Mobile-Friendly Test (Mock implementation)
async function simulateMobileFriendlyTest(url, deviceType, checkType) {
    // This is a mock implementation. In a real application, this would use an API
    // to test actual mobile-friendliness.
    
    return new Promise(resolve => {
        setTimeout(() => {
            // Generate random scores
            const mobileScore = Math.floor(Math.random() * 30) + 70; // Random score between 70-100
            const performanceScore = Math.floor(Math.random() * 30) + 70;
            const usabilityScore = Math.floor(Math.random() * 30) + 70;
            const bestPracticesScore = Math.floor(Math.random() * 30) + 70;

            // Generate mobile issues
            const mobileIssues = [
                {
                    issue: 'Viewport not set',
                    severity: 'high',
                    description: 'The viewport meta tag is missing or incorrectly configured.',
                    impact: 'Affects mobile rendering and responsiveness'
                },
                {
                    issue: 'Text too small',
                    severity: 'medium',
                    description: 'Some text elements are too small to read on mobile devices.',
                    impact: 'Reduces readability on mobile'
                },
                {
                    issue: 'Touch targets too small',
                    severity: 'medium',
                    description: 'Some clickable elements are too small for touch interaction.',
                    impact: 'Makes navigation difficult on mobile'
                }
            ];

            // Generate performance metrics
            const performanceMetrics = [
                {
                    metric: 'First Contentful Paint',
                    value: Math.floor(Math.random() * 2000) + 1000,
                    unit: 'ms',
                    status: Math.random() > 0.5 ? 'good' : 'poor'
                },
                {
                    metric: 'Time to Interactive',
                    value: Math.floor(Math.random() * 3000) + 2000,
                    unit: 'ms',
                    status: Math.random() > 0.5 ? 'good' : 'poor'
                },
                {
                    metric: 'Speed Index',
                    value: Math.floor(Math.random() * 3000) + 2000,
                    unit: 'ms',
                    status: Math.random() > 0.5 ? 'good' : 'poor'
                }
            ];

            // Generate usability analysis
            const usabilityAnalysis = [
                {
                    aspect: 'Navigation',
                    score: Math.floor(Math.random() * 30) + 70,
                    issues: Math.floor(Math.random() * 3)
                },
                {
                    aspect: 'Content Readability',
                    score: Math.floor(Math.random() * 30) + 70,
                    issues: Math.floor(Math.random() * 3)
                },
                {
                    aspect: 'Touch Interaction',
                    score: Math.floor(Math.random() * 30) + 70,
                    issues: Math.floor(Math.random() * 3)
                }
            ];

            // Generate best practices check
            const bestPractices = [
                {
                    practice: 'Responsive Design',
                    status: Math.random() > 0.5 ? 'passed' : 'failed',
                    details: 'Check if the site adapts to different screen sizes'
                },
                {
                    practice: 'Mobile-First Approach',
                    status: Math.random() > 0.5 ? 'passed' : 'failed',
                    details: 'Verify mobile-first design principles'
                },
                {
                    practice: 'Touch-Friendly',
                    status: Math.random() > 0.5 ? 'passed' : 'failed',
                    details: 'Ensure touch targets are appropriately sized'
                }
            ];

            const results = {
                url,
                deviceType,
                checkType,
                scores: {
                    mobileScore,
                    performanceScore,
                    usabilityScore,
                    bestPracticesScore
                },
                mobileIssues,
                performanceMetrics,
                usabilityAnalysis,
                bestPractices,
                recommendations: []
            };

            // Generate recommendations based on analysis
            if (mobileScore < 80) {
                results.recommendations.push('Implement responsive design principles');
            }
            if (performanceScore < 80) {
                results.recommendations.push('Optimize images and reduce server response time');
            }
            if (usabilityScore < 80) {
                results.recommendations.push('Improve touch targets and navigation for mobile users');
            }
            if (bestPracticesScore < 80) {
                results.recommendations.push('Follow mobile-first design best practices');
            }

            resolve(results);
        }, 2000); // Simulate network delay
    });
}

// Display Results
function displayResults(results) {
    const resultsCard = document.getElementById('resultsCard');
    const mobileScore = document.getElementById('mobileScore');
    const performanceScore = document.getElementById('performanceScore');
    const usabilityScore = document.getElementById('usabilityScore');
    const bestPracticesScore = document.getElementById('bestPracticesScore');
    const mobileIssues = document.getElementById('mobileIssues');
    const performanceMetrics = document.getElementById('performanceMetrics');
    const usabilityAnalysis = document.getElementById('usabilityAnalysis');
    const bestPractices = document.getElementById('bestPractices');
    const recommendations = document.getElementById('recommendations');

    // Show results card
    resultsCard.style.display = 'block';

    // Display scores
    mobileScore.textContent = `${results.scores.mobileScore}%`;
    performanceScore.textContent = `${results.scores.performanceScore}%`;
    usabilityScore.textContent = `${results.scores.usabilityScore}%`;
    bestPracticesScore.textContent = `${results.scores.bestPracticesScore}%`;

    // Display mobile issues
    mobileIssues.innerHTML = `
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>Issue</th>
                    <th>Severity</th>
                    <th>Description</th>
                    <th>Impact</th>
                </tr>
            </thead>
            <tbody>
                ${results.mobileIssues.map(issue => `
                    <tr>
                        <td>${issue.issue}</td>
                        <td>
                            <span class="badge bg-${issue.severity === 'high' ? 'danger' : 'warning'}">
                                ${issue.severity}
                            </span>
                        </td>
                        <td>${issue.description}</td>
                        <td>${issue.impact}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;

    // Display performance metrics
    performanceMetrics.innerHTML = `
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>Metric</th>
                    <th>Value</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                ${results.performanceMetrics.map(metric => `
                    <tr>
                        <td>${metric.metric}</td>
                        <td>${metric.value} ${metric.unit}</td>
                        <td>
                            <span class="badge bg-${metric.status === 'good' ? 'success' : 'danger'}">
                                ${metric.status}
                            </span>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;

    // Display usability analysis
    usabilityAnalysis.innerHTML = `
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>Aspect</th>
                    <th>Score</th>
                    <th>Issues</th>
                </tr>
            </thead>
            <tbody>
                ${results.usabilityAnalysis.map(analysis => `
                    <tr>
                        <td>${analysis.aspect}</td>
                        <td>${analysis.score}%</td>
                        <td>${analysis.issues} issues found</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;

    // Display best practices check
    bestPractices.innerHTML = `
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>Practice</th>
                    <th>Status</th>
                    <th>Details</th>
                </tr>
            </thead>
            <tbody>
                ${results.bestPractices.map(practice => `
                    <tr>
                        <td>${practice.practice}</td>
                        <td>
                            <span class="badge bg-${practice.status === 'passed' ? 'success' : 'danger'}">
                                ${practice.status}
                            </span>
                        </td>
                        <td>${practice.details}</td>
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
}

// Export Results
function exportResults() {
    const results = {
        url: document.getElementById('url').value,
        deviceType: document.getElementById('deviceType').value,
        checkType: document.getElementById('checkType').value,
        scores: {
            mobileScore: document.getElementById('mobileScore').textContent,
            performanceScore: document.getElementById('performanceScore').textContent,
            usabilityScore: document.getElementById('usabilityScore').textContent,
            bestPracticesScore: document.getElementById('bestPracticesScore').textContent
        },
        mobileIssues: Array.from(document.querySelectorAll('#mobileIssues table tbody tr')).map(row => ({
            issue: row.cells[0].textContent,
            severity: row.cells[1].textContent.trim(),
            description: row.cells[2].textContent,
            impact: row.cells[3].textContent
        })),
        performanceMetrics: Array.from(document.querySelectorAll('#performanceMetrics table tbody tr')).map(row => ({
            metric: row.cells[0].textContent,
            value: row.cells[1].textContent,
            status: row.cells[2].textContent.trim()
        })),
        usabilityAnalysis: Array.from(document.querySelectorAll('#usabilityAnalysis table tbody tr')).map(row => ({
            aspect: row.cells[0].textContent,
            score: row.cells[1].textContent,
            issues: row.cells[2].textContent
        })),
        bestPractices: Array.from(document.querySelectorAll('#bestPractices table tbody tr')).map(row => ({
            practice: row.cells[0].textContent,
            status: row.cells[1].textContent.trim(),
            details: row.cells[2].textContent
        })),
        recommendations: Array.from(document.querySelectorAll('#recommendations ul li')).map(li => li.textContent)
    };

    const csv = [
        ['Mobile-Friendly Test Report'],
        ['URL', results.url],
        ['Device Type', results.deviceType],
        ['Check Type', results.checkType],
        [],
        ['Scores'],
        ['Mobile Score', results.scores.mobileScore],
        ['Performance Score', results.scores.performanceScore],
        ['Usability Score', results.scores.usabilityScore],
        ['Best Practices Score', results.scores.bestPracticesScore],
        [],
        ['Mobile Issues'],
        ['Issue', 'Severity', 'Description', 'Impact'],
        ...results.mobileIssues.map(i => [i.issue, i.severity, i.description, i.impact]),
        [],
        ['Performance Metrics'],
        ['Metric', 'Value', 'Status'],
        ...results.performanceMetrics.map(m => [m.metric, m.value, m.status]),
        [],
        ['Usability Analysis'],
        ['Aspect', 'Score', 'Issues'],
        ...results.usabilityAnalysis.map(u => [u.aspect, u.score, u.issues]),
        [],
        ['Best Practices'],
        ['Practice', 'Status', 'Details'],
        ...results.bestPractices.map(b => [b.practice, b.status, b.details]),
        [],
        ['Recommendations'],
        ...results.recommendations.map(r => [r])
    ].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mobile-friendly-test-report.csv';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
} 