// Tool Data Structure
const tools = {
    seo: [
        {
            id: 'meta-tag-generator',
            name: 'Meta Tag Generator',
            description: 'Generate optimized meta tags for your website',
            icon: 'fas fa-tags',
            url: 'tools/meta-tag-generator.html'
        },
        {
            id: 'keyword-density',
            name: 'Keyword Density Checker',
            description: 'Analyze keyword density in your content',
            icon: 'fas fa-chart-bar',
            url: 'tools/keyword-density.html'
        },
        {
            id: 'sitemap-generator',
            name: 'Sitemap Generator',
            description: 'Create XML sitemaps for your website',
            icon: 'fas fa-sitemap',
            url: 'tools/sitemap-generator.html'
        },
        {
            id: 'google-index-checker',
            name: 'Google Index Checker',
            description: 'Check if your pages are indexed by Google',
            icon: 'fas fa-search',
            url: 'tools/google-index-checker.html'
        },
        {
            id: 'domain-authority',
            name: 'Domain Authority Checker',
            description: 'Check your website\'s domain authority score',
            icon: 'fas fa-star',
            url: 'tools/domain-authority.html'
        },
        {
            id: 'backlink-checker',
            name: 'Backlink Checker',
            description: 'Analyze your website\'s backlink profile',
            icon: 'fas fa-link',
            url: 'tools/backlink-checker.html'
        },
        {
            id: 'page-speed',
            name: 'Page Speed Checker',
            description: 'Test your website\'s loading speed',
            icon: 'fas fa-tachometer-alt',
            url: 'tools/page-speed.html'
        },
        {
            id: 'xml-sitemap-validator',
            name: 'XML Sitemap Validator',
            description: 'Validate your XML sitemap structure',
            icon: 'fas fa-file-code',
            url: 'tools/xml-sitemap-validator.html'
        },
        {
            id: 'mobile-friendly',
            name: 'Mobile-Friendly Test',
            description: 'Check if your website is mobile-friendly',
            icon: 'fas fa-mobile-alt',
            url: 'tools/mobile-friendly.html'
        },
        {
            id: 'keyword-magic',
            name: 'Keyword Magic Tools',
            description: 'Find and analyze keyword opportunities',
            icon: 'fas fa-magic',
            url: 'tools/keyword-magic.html'
        },
        {
            id: 'on-page-seo',
            name: 'On Page SEO Checker',
            description: 'Analyze your page\'s SEO elements',
            icon: 'fas fa-search-plus',
            url: 'tools/on-page-seo.html'
        },
        {
            id: 'brand-monitoring',
            name: 'Brand Monitoring',
            description: 'Monitor your brand mentions online',
            icon: 'fas fa-bullhorn',
            url: 'tools/brand-monitoring.html'
        },
        {
            id: 'off-page-seo',
            name: 'Off-Page SEO',
            description: 'Analyze your off-page SEO factors',
            icon: 'fas fa-external-link-alt',
            url: 'tools/off-page-seo.html'
        },
        {
            id: 'organic-research',
            name: 'Organic Research',
            description: 'Research organic search opportunities',
            icon: 'fas fa-chart-line',
            url: 'tools/organic-research.html'
        },
        {
            id: 'site-audit',
            name: 'Site Audit',
            description: 'Comprehensive website SEO audit',
            icon: 'fas fa-clipboard-check',
            url: 'tools/site-audit.html'
        },
        {
            id: 'keyword-research',
            name: 'Keyword Research',
            description: 'Find profitable keywords for your niche',
            icon: 'fas fa-key',
            url: 'tools/keyword-research.html'
        },
        {
            id: 'link-building',
            name: 'Link Building',
            description: 'Find link building opportunities',
            icon: 'fas fa-link',
            url: 'tools/link-building.html'
        },
        {
            id: 'technical-seo',
            name: 'Technical SEO',
            description: 'Check technical SEO elements',
            icon: 'fas fa-cogs',
            url: 'tools/technical-seo.html'
        },
        {
            id: 'local-seo',
            name: 'Local SEO',
            description: 'Optimize for local search results',
            icon: 'fas fa-map-marker-alt',
            url: 'tools/local-seo.html'
        },
        {
            id: 'seo-analytics',
            name: 'SEO Analytics & Reporting',
            description: 'Track and report SEO performance',
            icon: 'fas fa-chart-pie',
            url: 'tools/seo-analytics.html'
        },
        {
            id: 'rank-tracking',
            name: 'Rank Tracking',
            description: 'Monitor your search engine rankings',
            icon: 'fas fa-trophy',
            url: 'tools/rank-tracking.html'
        },
        {
            id: 'website-audit',
            name: 'Website Audit & SEO Checker',
            description: 'Comprehensive website analysis',
            icon: 'fas fa-search',
            url: 'tools/website-audit.html'
        },
        {
            id: 'content-optimization',
            name: 'Content Optimization & AI SEO',
            description: 'Optimize content with AI assistance',
            icon: 'fas fa-robot',
            url: 'tools/content-optimization.html'
        },
        {
            id: 'competitor-analysis',
            name: 'Competitor Analysis',
            description: 'Analyze your competitors\' SEO strategies',
            icon: 'fas fa-users',
            url: 'tools/competitor-analysis.html'
        }
    ],
    dev: [
        {
            id: 'json-formatter',
            name: 'JSON Formatter',
            description: 'Format and validate JSON data',
            icon: 'fas fa-code',
            url: 'tools/json-formatter.html'
        },
        {
            id: 'base64',
            name: 'Base64 Encoder/Decoder',
            description: 'Encode and decode Base64 strings',
            icon: 'fas fa-exchange-alt',
            url: 'tools/base64.html'
        },
        {
            id: 'regex-tester',
            name: 'Regex Tester',
            description: 'Test and validate regular expressions',
            icon: 'fas fa-search',
            url: 'tools/regex-tester.html'
        },
        // Add more developer tools here
    ]
};

// Add path detection helper
function getBasePath() {
    const path = window.location.pathname;
    // Convert backslashes to forward slashes and normalize the path
    const normalizedPath = path.replace(/\\/g, '/').toLowerCase();
    
    // Check if we're in the tools directory
    if (normalizedPath.includes('/tools/')) {
        return '../';
    }
    
    // If we're at the root level
    if (normalizedPath.endsWith('/') || 
        normalizedPath.endsWith('/index.html') || 
        normalizedPath === '') {
        return './';
    }
    
    return './';
}

// Load Components with loading states and error handling
async function loadComponent(elementId, componentPath) {
    const element = document.getElementById(elementId);
    if (!element) {
        console.error(`Element with id '${elementId}' not found`);
        return;
    }

    // Add loading state
    element.innerHTML = `
        <div class="text-center py-4">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    `;

    try {
        const basePath = getBasePath();
        const fullPath = `${basePath}${componentPath}`;
        console.log('Loading component from:', fullPath); // Debug log
        
        // Use fetch with cache control
        const response = await fetch(fullPath, {
            cache: 'no-cache', // Disable caching
            headers: {
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache'
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const html = await response.text();
        
        // Check if the response is empty or invalid
        if (!html.trim()) {
            throw new Error('Empty component content received');
        }

        // Update the element content
        element.innerHTML = html;

        // Initialize dropdowns after loading header
        if (elementId === 'header-placeholder') {
            // Small delay to ensure DOM is updated
            setTimeout(() => {
                initializeDropdowns();
                // Fix header links if in tools directory
                if (window.location.pathname.includes('/tools/')) {
                    fixHeaderLinks();
                }
            }, 100);
        }
    } catch (error) {
        console.error(`Error loading component ${componentPath}:`, error);
        element.innerHTML = `
            <div class="alert alert-danger m-3" role="alert">
                <i class="fas fa-exclamation-circle me-2"></i>
                Error loading component (${error.message}). Please check console for details or refresh the page.
            </div>
        `;
    }
}

// Fix header links when in tools directory
function fixHeaderLinks() {
    const header = document.getElementById('header-placeholder');
    if (!header) return;

    // Fix navbar brand link
    const brand = header.querySelector('.navbar-brand');
    if (brand) {
        brand.href = '../index.html';
    }

    // Fix dropdown links
    const dropdownLinks = header.querySelectorAll('.dropdown-item');
    dropdownLinks.forEach(link => {
        if (link.href.includes('/tools/')) {
            link.href = '../' + link.href.split('/tools/')[1];
        }
    });
}

// Initialize dropdowns with Bootstrap 5
function initializeDropdowns() {
    // Use Bootstrap's native dropdown initialization
    const dropdownElementList = document.querySelectorAll('.dropdown-toggle');
    const dropdownList = [...dropdownElementList].map(dropdownToggleEl => {
        return new bootstrap.Dropdown(dropdownToggleEl);
    });

    // Add active class to current page link
    const currentPath = window.location.pathname;
    const links = document.querySelectorAll('.nav-link, .dropdown-item');
    links.forEach(link => {
        if (link.href && currentPath.includes(link.getAttribute('href'))) {
            link.classList.add('active');
            // If it's a dropdown item, also activate the parent dropdown
            const dropdownMenu = link.closest('.dropdown-menu');
            if (dropdownMenu) {
                const dropdownToggle = dropdownMenu.previousElementSibling;
                if (dropdownToggle) {
                    dropdownToggle.classList.add('active');
                }
            }
        }
    });
}

// Initialize Tool Cards
function initializeToolCards() {
    const seoToolsContainer = document.getElementById('seoTools');
    const devToolsContainer = document.getElementById('devTools');

    if (seoToolsContainer) {
        tools.seo.forEach(tool => {
            seoToolsContainer.appendChild(createToolCard(tool));
        });
    }

    if (devToolsContainer) {
        tools.dev.forEach(tool => {
            devToolsContainer.appendChild(createToolCard(tool));
        });
    }
}

// Create Tool Card Element
function createToolCard(tool) {
    const col = document.createElement('div');
    col.className = 'col-md-4 col-lg-3';
    
    col.innerHTML = `
        <div class="tool-card">
            <div class="card-body">
                <div class="d-flex align-items-center mb-3">
                    <i class="${tool.icon} text-primary me-2"></i>
                    <h5 class="card-title mb-0">${tool.name}</h5>
                </div>
                <p class="card-text">${tool.description}</p>
                <a href="${tool.url}" class="btn btn-outline-primary btn-sm">Use Tool</a>
            </div>
        </div>
    `;
    
    return col;
}

// Search Functionality
function initializeSearch() {
    const searchInput = document.getElementById('toolSearch');
    if (!searchInput) return;

    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        const filteredSeoTools = tools.seo.filter(tool => 
            tool.name.toLowerCase().includes(searchTerm) || 
            tool.description.toLowerCase().includes(searchTerm)
        );
        const filteredDevTools = tools.dev.filter(tool => 
            tool.name.toLowerCase().includes(searchTerm) || 
            tool.description.toLowerCase().includes(searchTerm)
        );
        updateToolDisplay(filteredSeoTools, filteredDevTools);
    });
}

// Update Tool Display
function updateToolDisplay(filteredSeoTools, filteredDevTools) {
    const seoToolsContainer = document.getElementById('seoTools');
    const devToolsContainer = document.getElementById('devTools');

    if (seoToolsContainer) {
        seoToolsContainer.innerHTML = '';
        filteredSeoTools.forEach(tool => {
            seoToolsContainer.appendChild(createToolCard(tool));
        });
    }

    if (devToolsContainer) {
        devToolsContainer.innerHTML = '';
        filteredDevTools.forEach(tool => {
            devToolsContainer.appendChild(createToolCard(tool));
        });
    }
}

// Initialize Ad Spaces
function initializeAdSpaces() {
    const adSpaces = document.querySelectorAll('[id$="ad-space"]');
    adSpaces.forEach(space => {
        space.innerHTML = `
            <div class="ad-placeholder p-4 bg-light rounded">
                <p class="mb-0 text-muted">Advertisement Space</p>
            </div>
        `;
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', async function() {
    try {
        console.log('Current path:', window.location.pathname);
        console.log('Base path:', getBasePath());
        
        // Load header and footer sequentially to ensure proper order
        await loadComponent('header-placeholder', 'components/header.html');
        await loadComponent('footer-placeholder', 'components/footer.html');

        // Initialize tool cards if on home page
        if (document.getElementById('seoTools') || document.getElementById('devTools')) {
            initializeToolCards();
            initializeSearch();
        }

        // Initialize ad spaces
        initializeAdSpaces();

        // Initialize Bootstrap components
        setTimeout(initializeBootstrapComponents, 200);
    } catch (error) {
        console.error('Error initializing application:', error);
    }
});

// Initialize Bootstrap components
function initializeBootstrapComponents() {
    // Initialize all tooltips
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

    // Initialize all popovers
    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
    const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl));
} 