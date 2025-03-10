// Meta Tag Generator Tool
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('metaTagForm');
    const generatedTags = document.getElementById('generatedTags');

    // Auto-fill Open Graph and Twitter fields with basic meta tag values
    document.getElementById('title').addEventListener('input', function() {
        document.getElementById('ogTitle').value = this.value;
        document.getElementById('twitterTitle').value = this.value;
    });

    document.getElementById('description').addEventListener('input', function() {
        document.getElementById('ogDescription').value = this.value;
        document.getElementById('twitterDescription').value = this.value;
    });

    // Form submission handler
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        generateMetaTags();
    });
});

// Generate Meta Tags
function generateMetaTags() {
    const tags = [];
    
    // Basic Meta Tags
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const keywords = document.getElementById('keywords').value;

    tags.push(`<title>${escapeHtml(title)}</title>`);
    tags.push(`<meta name="description" content="${escapeHtml(description)}">`);
    if (keywords) {
        tags.push(`<meta name="keywords" content="${escapeHtml(keywords)}">`);
    }

    // Open Graph Tags
    const ogTitle = document.getElementById('ogTitle').value;
    const ogDescription = document.getElementById('ogDescription').value;
    const ogImage = document.getElementById('ogImage').value;
    const ogUrl = document.getElementById('ogUrl').value;

    if (ogTitle) tags.push(`<meta property="og:title" content="${escapeHtml(ogTitle)}">`);
    if (ogDescription) tags.push(`<meta property="og:description" content="${escapeHtml(ogDescription)}">`);
    if (ogImage) tags.push(`<meta property="og:image" content="${escapeHtml(ogImage)}">`);
    if (ogUrl) tags.push(`<meta property="og:url" content="${escapeHtml(ogUrl)}">`);
    tags.push('<meta property="og:type" content="website">');

    // Twitter Card Tags
    const twitterCard = document.getElementById('twitterCard').value;
    const twitterTitle = document.getElementById('twitterTitle').value;
    const twitterDescription = document.getElementById('twitterDescription').value;
    const twitterImage = document.getElementById('twitterImage').value;

    tags.push(`<meta name="twitter:card" content="${escapeHtml(twitterCard)}">`);
    if (twitterTitle) tags.push(`<meta name="twitter:title" content="${escapeHtml(twitterTitle)}">`);
    if (twitterDescription) tags.push(`<meta name="twitter:description" content="${escapeHtml(twitterDescription)}">`);
    if (twitterImage) tags.push(`<meta name="twitter:image" content="${escapeHtml(twitterImage)}">`);

    // Display generated tags
    const generatedTags = document.getElementById('generatedTags');
    generatedTags.textContent = tags.join('\n');
}

// Copy to Clipboard Function
function copyToClipboard() {
    const generatedTags = document.getElementById('generatedTags');
    const textArea = document.createElement('textarea');
    textArea.value = generatedTags.textContent;
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

// Helper function to escape HTML special characters
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
} 