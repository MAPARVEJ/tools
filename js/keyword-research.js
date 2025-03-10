// Keyword Research Tool
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('keywordResearchForm');
    const loadingIcon = document.getElementById('loadingIcon');

    // Form submission handler
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        await researchKeywords();
    });
});

// Research Keywords
async function researchKeywords() {
    const seedKeyword = document.getElementById('seedKeyword').value.trim();
    const language = document.getElementById('language').value;
    const location = document.getElementById('location').value;
    const searchType = document.getElementById('searchType').value;

    // Validate seed keyword
    if (!seedKeyword) {
        alert('Please enter a seed keyword.');
        return;
    }

    // Show loading state
    const submitButton = document.querySelector('#keywordResearchForm button[type="submit"]');
    const loadingIcon = document.getElementById('loadingIcon');
    submitButton.disabled = true;
    loadingIcon.classList.remove('d-none');

    try {
        // Simulate keyword research (in a real implementation, this would use an API)
        const results = await simulateKeywordResearch(seedKeyword, language, location, searchType);
        
        // Display results
        displayResults(results);
    } catch (error) {
        alert('Error researching keywords: ' + error.message);
    } finally {
        // Reset loading state
        submitButton.disabled = false;
        loadingIcon.classList.add('d-none');
    }
}

// Simulate Keyword Research (Mock implementation)
async function simulateKeywordResearch(seedKeyword, language, location, searchType) {
    // This is a mock implementation. In a real application, this would use an API
    // to get actual keyword research data.
    
    return new Promise(resolve => {
        setTimeout(() => {
            const searchVolume = Math.floor(Math.random() * 100000);
            const keywordDifficulty = Math.floor(Math.random() * 100);
            const cpc = (Math.random() * 10).toFixed(2);
            const competition = Math.random() > 0.5 ? 'High' : 'Low';

            const keywordIdeas = Array.from({ length: 10 }, (_, i) => ({
                keyword: `${seedKeyword} ${['best', 'top', 'how to', 'guide', 'tutorial', 'review', 'vs', 'alternatives', 'examples', 'tips'][i]}`,
                searchVolume: Math.floor(Math.random() * 50000),
                difficulty: Math.floor(Math.random() * 100),
                cpc: (Math.random() * 5).toFixed(2),
                competition: Math.random() > 0.5 ? 'High' : 'Low',
                intent: ['Informational', 'Transactional', 'Navigational'][Math.floor(Math.random() * 3)]
            }));

            const relatedTopics = Array.from({ length: 5 }, (_, i) => ({
                topic: `Related Topic ${i + 1}`,
                searchVolume: Math.floor(Math.random() * 30000),
                difficulty: Math.floor(Math.random() * 100),
                relevance: Math.floor(Math.random() * 100)
            }));

            const searchIntent = {
                informational: Math.floor(Math.random() * 50) + 20,
                transactional: Math.floor(Math.random() * 30) + 10,
                navigational: Math.floor(Math.random() * 20) + 5
            };

            const results = {
                seedKeyword,
                language,
                location,
                searchType,
                metrics: {
                    searchVolume,
                    keywordDifficulty,
                    cpc,
                    competition
                },
                keywordIdeas,
                relatedTopics,
                searchIntent,
                recommendations: []
            };

            // Generate recommendations based on analysis
            if (keywordDifficulty > 70) {
                results.recommendations.push('Consider targeting long-tail variations of this keyword');
            }
            if (searchVolume < 1000) {
                results.recommendations.push('Look for alternative keywords with higher search volume');
            }
            if (competition === 'High') {
                results.recommendations.push('Focus on creating comprehensive, high-quality content');
            }
            if (searchIntent.informational > 50) {
                results.recommendations.push('Create educational content that answers common questions');
            }

            resolve(results);
        }, 2000); // Simulate network delay
    });
}

// Display Results
function displayResults(results) {
    const resultsCard = document.getElementById('resultsCard');
    const searchVolume = document.getElementById('searchVolume');
    const keywordDifficulty = document.getElementById('keywordDifficulty');
    const cpc = document.getElementById('cpc');
    const competition = document.getElementById('competition');
    const keywordIdeas = document.getElementById('keywordIdeas');
    const relatedTopics = document.getElementById('relatedTopics');
    const recommendations = document.getElementById('recommendations');

    // Show results card
    resultsCard.style.display = 'block';

    // Display metrics
    searchVolume.textContent = results.metrics.searchVolume.toLocaleString();
    keywordDifficulty.textContent = `${results.metrics.keywordDifficulty}%`;
    cpc.textContent = `$${results.metrics.cpc}`;
    competition.textContent = results.metrics.competition;

    // Display keyword ideas
    keywordIdeas.innerHTML = `
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>Keyword</th>
                    <th>Search Volume</th>
                    <th>Difficulty</th>
                    <th>CPC</th>
                    <th>Competition</th>
                    <th>Intent</th>
                </tr>
            </thead>
            <tbody>
                ${results.keywordIdeas.map(idea => `
                    <tr>
                        <td>${idea.keyword}</td>
                        <td>${idea.searchVolume.toLocaleString()}</td>
                        <td>
                            <div class="progress">
                                <div class="progress-bar" role="progressbar" 
                                    style="width: ${idea.difficulty}%" 
                                    aria-valuenow="${idea.difficulty}" 
                                    aria-valuemin="0" 
                                    aria-valuemax="100">
                                    ${idea.difficulty}%
                                </div>
                            </div>
                        </td>
                        <td>$${idea.cpc}</td>
                        <td>
                            <span class="badge bg-${idea.competition === 'High' ? 'danger' : 'success'}">
                                ${idea.competition}
                            </span>
                        </td>
                        <td>
                            <span class="badge bg-${getIntentBadgeColor(idea.intent)}">
                                ${idea.intent}
                            </span>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;

    // Display related topics
    relatedTopics.innerHTML = `
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>Topic</th>
                    <th>Search Volume</th>
                    <th>Difficulty</th>
                    <th>Relevance</th>
                </tr>
            </thead>
            <tbody>
                ${results.relatedTopics.map(topic => `
                    <tr>
                        <td>${topic.topic}</td>
                        <td>${topic.searchVolume.toLocaleString()}</td>
                        <td>
                            <div class="progress">
                                <div class="progress-bar" role="progressbar" 
                                    style="width: ${topic.difficulty}%" 
                                    aria-valuenow="${topic.difficulty}" 
                                    aria-valuemin="0" 
                                    aria-valuemax="100">
                                    ${topic.difficulty}%
                                </div>
                            </div>
                        </td>
                        <td>
                            <div class="progress">
                                <div class="progress-bar" role="progressbar" 
                                    style="width: ${topic.relevance}%" 
                                    aria-valuenow="${topic.relevance}" 
                                    aria-valuemin="0" 
                                    aria-valuemax="100">
                                    ${topic.relevance}%
                                </div>
                            </div>
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

// Get Intent Badge Color
function getIntentBadgeColor(intent) {
    const colors = {
        'Informational': 'info',
        'Transactional': 'success',
        'Navigational': 'warning'
    };
    return colors[intent] || 'secondary';
}

// Update Chart
function updateChart(results) {
    const ctx = document.getElementById('searchIntentChart').getContext('2d');
    
    // Destroy existing chart if it exists
    if (window.searchIntentChart) {
        window.searchIntentChart.destroy();
    }

    // Create new chart
    window.searchIntentChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: Object.keys(results.searchIntent),
            datasets: [{
                data: Object.values(results.searchIntent),
                backgroundColor: [
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(255, 206, 86, 0.5)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 206, 86, 1)'
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
        seedKeyword: document.getElementById('seedKeyword').value,
        metrics: {
            searchVolume: document.getElementById('searchVolume').textContent,
            keywordDifficulty: document.getElementById('keywordDifficulty').textContent,
            cpc: document.getElementById('cpc').textContent,
            competition: document.getElementById('competition').textContent
        },
        keywordIdeas: Array.from(document.querySelectorAll('#keywordIdeas table tbody tr')).map(row => ({
            keyword: row.cells[0].textContent,
            searchVolume: row.cells[1].textContent,
            difficulty: row.cells[2].querySelector('.progress-bar').style.width,
            cpc: row.cells[3].textContent,
            competition: row.cells[4].textContent.trim(),
            intent: row.cells[5].textContent.trim()
        })),
        relatedTopics: Array.from(document.querySelectorAll('#relatedTopics table tbody tr')).map(row => ({
            topic: row.cells[0].textContent,
            searchVolume: row.cells[1].textContent,
            difficulty: row.cells[2].querySelector('.progress-bar').style.width,
            relevance: row.cells[3].querySelector('.progress-bar').style.width
        })),
        recommendations: Array.from(document.querySelectorAll('#recommendations ul li')).map(li => li.textContent)
    };

    const csv = [
        ['Keyword Research Report'],
        ['Seed Keyword', results.seedKeyword],
        [],
        ['Metrics'],
        ['Search Volume', results.metrics.searchVolume],
        ['Keyword Difficulty', results.metrics.keywordDifficulty],
        ['CPC', results.metrics.cpc],
        ['Competition', results.metrics.competition],
        [],
        ['Keyword Ideas'],
        ['Keyword', 'Search Volume', 'Difficulty', 'CPC', 'Competition', 'Intent'],
        ...results.keywordIdeas.map(k => [
            k.keyword,
            k.searchVolume,
            k.difficulty,
            k.cpc,
            k.competition,
            k.intent
        ]),
        [],
        ['Related Topics'],
        ['Topic', 'Search Volume', 'Difficulty', 'Relevance'],
        ...results.relatedTopics.map(t => [
            t.topic,
            t.searchVolume,
            t.difficulty,
            t.relevance
        ]),
        [],
        ['Recommendations'],
        ...results.recommendations.map(r => [r])
    ].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'keyword-research-report.csv';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
} 