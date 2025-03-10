// Content Analyzer Tool
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contentAnalyzerForm');
    const loadingIcon = document.getElementById('loadingIcon');

    // Form submission handler
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        await analyzeContent();
    });
});

// Analyze Content
async function analyzeContent() {
    const content = document.getElementById('content').value.trim();
    const targetKeyword = document.getElementById('targetKeyword').value.trim();
    const contentType = document.getElementById('contentType').value;

    // Validate inputs
    if (!content) {
        alert('Please enter some content to analyze.');
        return;
    }

    if (!targetKeyword) {
        alert('Please enter a target keyword.');
        return;
    }

    // Show loading state
    const submitButton = document.querySelector('#contentAnalyzerForm button[type="submit"]');
    const loadingIcon = document.getElementById('loadingIcon');
    submitButton.disabled = true;
    loadingIcon.classList.remove('d-none');

    try {
        // Simulate content analysis (in a real implementation, this would use an API)
        const results = await simulateContentAnalysis(content, targetKeyword, contentType);
        
        // Display results
        displayResults(results);
    } catch (error) {
        alert('Error analyzing content: ' + error.message);
    } finally {
        // Reset loading state
        submitButton.disabled = false;
        loadingIcon.classList.add('d-none');
    }
}

// Simulate Content Analysis (Mock implementation)
async function simulateContentAnalysis(content, targetKeyword, contentType) {
    // This is a mock implementation. In a real application, this would use an API
    // to analyze actual content.
    
    return new Promise(resolve => {
        setTimeout(() => {
            // Calculate basic metrics
            const wordCount = content.split(/\s+/).length;
            const keywordCount = (content.toLowerCase().match(new RegExp(targetKeyword.toLowerCase(), 'g')) || []).length;
            const keywordDensity = ((keywordCount / wordCount) * 100).toFixed(2);
            const readabilityScore = Math.floor(Math.random() * 30) + 70; // Random score between 70-100
            const seoScore = Math.floor(Math.random() * 30) + 70; // Random score between 70-100

            // Generate content structure analysis
            const contentStructure = {
                headings: {
                    h1: Math.floor(Math.random() * 2),
                    h2: Math.floor(Math.random() * 5),
                    h3: Math.floor(Math.random() * 8)
                },
                paragraphs: Math.floor(wordCount / 100),
                lists: Math.floor(Math.random() * 5),
                images: Math.floor(Math.random() * 3)
            };

            // Generate SEO elements analysis
            const seoElements = {
                title: {
                    present: true,
                    length: Math.floor(Math.random() * 20) + 30,
                    keyword: Math.random() > 0.5
                },
                metaDescription: {
                    present: true,
                    length: Math.floor(Math.random() * 50) + 100,
                    keyword: Math.random() > 0.5
                },
                images: {
                    total: contentStructure.images,
                    withAlt: Math.floor(contentStructure.images * 0.8)
                },
                links: {
                    internal: Math.floor(Math.random() * 5),
                    external: Math.floor(Math.random() * 3)
                }
            };

            // Generate readability metrics
            const readabilityMetrics = {
                sentenceLength: Math.floor(Math.random() * 5) + 15,
                syllableCount: Math.floor(Math.random() * 1000) + 500,
                complexWords: Math.floor(Math.random() * 20),
                passiveVoice: Math.floor(Math.random() * 10)
            };

            const results = {
                content,
                targetKeyword,
                contentType,
                metrics: {
                    readabilityScore,
                    seoScore,
                    wordCount,
                    keywordDensity
                },
                contentStructure,
                seoElements,
                readabilityMetrics,
                recommendations: []
            };

            // Generate recommendations based on analysis
            if (readabilityScore < 80) {
                results.recommendations.push('Simplify your language and break down complex sentences');
            }
            if (keywordDensity < 1) {
                results.recommendations.push('Increase the use of your target keyword naturally');
            }
            if (seoElements.images.withAlt < seoElements.images.total) {
                results.recommendations.push('Add alt text to all images for better accessibility and SEO');
            }
            if (readabilityMetrics.passiveVoice > 5) {
                results.recommendations.push('Reduce the use of passive voice for better readability');
            }

            resolve(results);
        }, 2000); // Simulate network delay
    });
}

// Display Results
function displayResults(results) {
    const resultsCard = document.getElementById('resultsCard');
    const readabilityScore = document.getElementById('readabilityScore');
    const seoScore = document.getElementById('seoScore');
    const wordCount = document.getElementById('wordCount');
    const keywordDensity = document.getElementById('keywordDensity');
    const contentStructure = document.getElementById('contentStructure');
    const seoElements = document.getElementById('seoElements');
    const recommendations = document.getElementById('recommendations');

    // Show results card
    resultsCard.style.display = 'block';

    // Display metrics
    readabilityScore.textContent = `${results.metrics.readabilityScore}%`;
    seoScore.textContent = `${results.metrics.seoScore}%`;
    wordCount.textContent = results.metrics.wordCount.toLocaleString();
    keywordDensity.textContent = `${results.metrics.keywordDensity}%`;

    // Display content structure
    contentStructure.innerHTML = `
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>Element</th>
                    <th>Count</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                ${Object.entries(results.contentStructure.headings).map(([tag, count]) => `
                    <tr>
                        <td>${tag.toUpperCase()} Tags</td>
                        <td>${count}</td>
                        <td>
                            <span class="badge bg-${count > 0 ? 'success' : 'warning'}">
                                ${count > 0 ? 'Good' : 'Missing'}
                            </span>
                        </td>
                    </tr>
                `).join('')}
                <tr>
                    <td>Paragraphs</td>
                    <td>${results.contentStructure.paragraphs}</td>
                    <td>
                        <span class="badge bg-success">Good</span>
                    </td>
                </tr>
                <tr>
                    <td>Lists</td>
                    <td>${results.contentStructure.lists}</td>
                    <td>
                        <span class="badge bg-${results.contentStructure.lists > 0 ? 'success' : 'warning'}">
                            ${results.contentStructure.lists > 0 ? 'Good' : 'Missing'}
                        </span>
                    </td>
                </tr>
                <tr>
                    <td>Images</td>
                    <td>${results.contentStructure.images}</td>
                    <td>
                        <span class="badge bg-${results.contentStructure.images > 0 ? 'success' : 'warning'}">
                            ${results.contentStructure.images > 0 ? 'Good' : 'Missing'}
                        </span>
                    </td>
                </tr>
            </tbody>
        </table>
    `;

    // Display SEO elements
    seoElements.innerHTML = `
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>Element</th>
                    <th>Status</th>
                    <th>Details</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Title Tag</td>
                    <td>
                        <span class="badge bg-${results.seoElements.title.present ? 'success' : 'danger'}">
                            ${results.seoElements.title.present ? 'Present' : 'Missing'}
                        </span>
                    </td>
                    <td>${results.seoElements.title.length} characters</td>
                </tr>
                <tr>
                    <td>Meta Description</td>
                    <td>
                        <span class="badge bg-${results.seoElements.metaDescription.present ? 'success' : 'danger'}">
                            ${results.seoElements.metaDescription.present ? 'Present' : 'Missing'}
                        </span>
                    </td>
                    <td>${results.seoElements.metaDescription.length} characters</td>
                </tr>
                <tr>
                    <td>Image Alt Tags</td>
                    <td>
                        <span class="badge bg-${results.seoElements.images.withAlt === results.seoElements.images.total ? 'success' : 'warning'}">
                            ${results.seoElements.images.withAlt}/${results.seoElements.images.total}
                        </span>
                    </td>
                    <td>${results.seoElements.images.withAlt === results.seoElements.images.total ? 'Complete' : 'Incomplete'}</td>
                </tr>
                <tr>
                    <td>Internal Links</td>
                    <td>
                        <span class="badge bg-${results.seoElements.links.internal > 0 ? 'success' : 'warning'}">
                            ${results.seoElements.links.internal} links
                        </span>
                    </td>
                    <td>${results.seoElements.links.internal > 0 ? 'Good' : 'Missing'}</td>
                </tr>
                <tr>
                    <td>External Links</td>
                    <td>
                        <span class="badge bg-${results.seoElements.links.external > 0 ? 'success' : 'warning'}">
                            ${results.seoElements.links.external} links
                        </span>
                    </td>
                    <td>${results.seoElements.links.external > 0 ? 'Good' : 'Missing'}</td>
                </tr>
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
    const ctx = document.getElementById('readabilityChart').getContext('2d');
    
    // Destroy existing chart if it exists
    if (window.readabilityChart) {
        window.readabilityChart.destroy();
    }

    // Create new chart
    window.readabilityChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Sentence Length', 'Syllable Count', 'Complex Words', 'Passive Voice'],
            datasets: [{
                label: 'Readability Metrics',
                data: [
                    results.readabilityMetrics.sentenceLength,
                    results.readabilityMetrics.syllableCount,
                    results.readabilityMetrics.complexWords,
                    results.readabilityMetrics.passiveVoice
                ],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(255, 99, 132, 0.5)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Export Results
function exportResults() {
    const results = {
        content: document.getElementById('content').value,
        targetKeyword: document.getElementById('targetKeyword').value,
        contentType: document.getElementById('contentType').value,
        metrics: {
            readabilityScore: document.getElementById('readabilityScore').textContent,
            seoScore: document.getElementById('seoScore').textContent,
            wordCount: document.getElementById('wordCount').textContent,
            keywordDensity: document.getElementById('keywordDensity').textContent
        },
        contentStructure: Array.from(document.querySelectorAll('#contentStructure table tbody tr')).map(row => ({
            element: row.cells[0].textContent,
            count: row.cells[1].textContent,
            status: row.cells[2].textContent.trim()
        })),
        seoElements: Array.from(document.querySelectorAll('#seoElements table tbody tr')).map(row => ({
            element: row.cells[0].textContent,
            status: row.cells[1].textContent.trim(),
            details: row.cells[2].textContent
        })),
        recommendations: Array.from(document.querySelectorAll('#recommendations ul li')).map(li => li.textContent)
    };

    const csv = [
        ['Content Analysis Report'],
        ['Target Keyword', results.targetKeyword],
        ['Content Type', results.contentType],
        [],
        ['Metrics'],
        ['Readability Score', results.metrics.readabilityScore],
        ['SEO Score', results.metrics.seoScore],
        ['Word Count', results.metrics.wordCount],
        ['Keyword Density', results.metrics.keywordDensity],
        [],
        ['Content Structure'],
        ['Element', 'Count', 'Status'],
        ...results.contentStructure.map(s => [s.element, s.count, s.status]),
        [],
        ['SEO Elements'],
        ['Element', 'Status', 'Details'],
        ...results.seoElements.map(e => [e.element, e.status, e.details]),
        [],
        ['Recommendations'],
        ...results.recommendations.map(r => [r])
    ].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'content-analysis-report.csv';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
} 