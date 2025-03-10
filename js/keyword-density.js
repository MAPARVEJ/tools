// Keyword Density Checker Tool
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('keywordDensityForm');
    const resultsCard = document.getElementById('resultsCard');
    let keywordChart = null;

    // Form submission handler
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        analyzeContent();
    });
});

// Analyze Content
function analyzeContent() {
    const content = document.getElementById('content').value;
    const excludeWords = document.getElementById('excludeWords').value
        .split(',')
        .map(word => word.trim().toLowerCase());
    const minWordLength = parseInt(document.getElementById('minWordLength').value);

    // Clean and process content
    const words = content
        .toLowerCase()
        .replace(/[^\w\s]/g, '')
        .split(/\s+/)
        .filter(word => 
            word.length >= minWordLength && 
            !excludeWords.includes(word)
        );

    // Count word frequency
    const wordCount = {};
    words.forEach(word => {
        wordCount[word] = (wordCount[word] || 0) + 1;
    });

    // Calculate density
    const totalWords = words.length;
    const keywordDensity = Object.entries(wordCount)
        .map(([word, count]) => ({
            word,
            count,
            density: (count / totalWords) * 100
        }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);

    // Display results
    displayResults(keywordDensity, totalWords);
}

// Display Results
function displayResults(keywordDensity, totalWords) {
    const resultsCard = document.getElementById('resultsCard');
    const topKeywords = document.getElementById('topKeywords');
    const statistics = document.getElementById('statistics');

    // Show results card
    resultsCard.style.display = 'block';

    // Display top keywords table
    topKeywords.innerHTML = `
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>Keyword</th>
                    <th>Count</th>
                    <th>Density</th>
                </tr>
            </thead>
            <tbody>
                ${keywordDensity.map(({word, count, density}) => `
                    <tr>
                        <td>${word}</td>
                        <td>${count}</td>
                        <td>${density.toFixed(2)}%</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;

    // Display statistics
    statistics.innerHTML = `
        <div class="col-md-4">
            <div class="card bg-light">
                <div class="card-body">
                    <h6>Total Words</h6>
                    <p class="h3">${totalWords}</p>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="card bg-light">
                <div class="card-body">
                    <h6>Unique Words</h6>
                    <p class="h3">${Object.keys(wordCount).length}</p>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="card bg-light">
                <div class="card-body">
                    <h6>Top Keyword Density</h6>
                    <p class="h3">${keywordDensity[0].density.toFixed(2)}%</p>
                </div>
            </div>
        </div>
    `;

    // Update chart
    updateChart(keywordDensity);
}

// Update Chart
function updateChart(keywordDensity) {
    const ctx = document.getElementById('keywordChart').getContext('2d');
    
    // Destroy existing chart if it exists
    if (keywordChart) {
        keywordChart.destroy();
    }

    // Create new chart
    keywordChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: keywordDensity.map(item => item.word),
            datasets: [{
                label: 'Keyword Density (%)',
                data: keywordDensity.map(item => item.density),
                backgroundColor: 'rgba(13, 110, 253, 0.5)',
                borderColor: 'rgba(13, 110, 253, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Density (%)'
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Top 10 Keywords by Density'
                }
            }
        }
    });
} 