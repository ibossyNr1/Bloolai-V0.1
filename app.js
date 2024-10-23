export function initializeApp() {
    // Page loading functionality
    const mainContent = document.getElementById('mainContent');
    const navLinks = document.querySelectorAll('.nav-link');
    let currentPage = 'wizard';

    // Function to show page-specific popup
    function showPagePopup(page) {
        const popupId = `${page}Popup`;
        const popup = new bootstrap.Modal(document.getElementById(popupId));
        popup.show();

        // Add event listener for "Got it!" button
        const gotItBtn = document.querySelector(`#${popupId} .btn-primary`);
        if (gotItBtn) {
            gotItBtn.addEventListener('click', () => {
                popup.hide();
            });
        }
    }

    function initializeWizard() {
        const analyzeDomain = document.getElementById('analyzeDomain');
        const domainInput = document.getElementById('domainInput');
        const analysisProgress = document.getElementById('analysisProgress');
        const analysisResults = document.getElementById('analysisResults');
        const progressBar = document.querySelector('.progress-bar');
        const steps = document.querySelectorAll('.analysis-steps .step');
        const startOver = document.getElementById('startOver');
        const confirmAnalysis = document.getElementById('confirmAnalysis');

        if (analyzeDomain && domainInput) {
            analyzeDomain.addEventListener('click', () => {
                const domain = domainInput.value.trim();
                if (domain && analysisProgress && analysisResults) {
                    // Show progress section
                    analysisProgress.classList.remove('d-none');
                    
                    // Simulate analysis progress
                    let progress = 0;
                    const interval = setInterval(() => {
                        progress += 25;
                        if (progressBar) {
                            progressBar.style.width = `${progress}%`;
                        }
                        
                        // Update step indicators
                        const stepIndex = Math.floor(progress / 25) - 1;
                        if (stepIndex >= 0 && stepIndex < steps.length) {
                            const stepIcon = steps[stepIndex].querySelector('i');
                            if (stepIcon) {
                                stepIcon.classList.remove('text-muted');
                                stepIcon.classList.add('text-success');
                            }
                        }

                        if (progress >= 100) {
                            clearInterval(interval);
                            setTimeout(() => {
                                if (analysisProgress && analysisResults) {
                                    analysisProgress.classList.add('d-none');
                                    analysisResults.classList.remove('d-none');
                                    
                                    // Safely update form fields
                                    const companyName = document.getElementById('companyName');
                                    const industry = document.getElementById('industry');
                                    const mission = document.getElementById('mission');
                                    const coreValues = document.getElementById('coreValues');

                                    if (companyName) companyName.value = domain;
                                    if (industry) industry.value = 'Technology';
                                    if (mission) mission.value = 'Empowering businesses through innovative AI solutions';
                                    if (coreValues) coreValues.value = 'Innovation, Excellence, Customer Focus';
                                }
                            }, 500);
                        }
                    }, 1000);
                }
            });
        }

        if (startOver) {
            startOver.addEventListener('click', () => {
                if (analysisResults && domainInput) {
                    analysisResults.classList.add('d-none');
                    domainInput.value = '';
                    steps.forEach(step => {
                        const icon = step.querySelector('i');
                        if (icon) {
                            icon.classList.remove('text-success');
                            icon.classList.add('text-muted');
                        }
                    });
                }
            });
        }

        if (confirmAnalysis) {
            confirmAnalysis.addEventListener('click', () => {
                // Navigate to contextual page after confirmation
                loadPage('contextual');
            });
        }
    }

    // Rest of the code remains the same...
    
    // Function to load page content
    async function loadPage(page) {
        try {
            const response = await fetch(`/${page}.html`);
            if (!response.ok) throw new Error(`Failed to load ${page}`);
            const content = await response.text();
            
            if (mainContent) {
                mainContent.innerHTML = content;

                // Initialize wizard functionality if on wizard page
                if (page === 'wizard') {
                    initializeWizard();
                }

                // Add page-specific popup HTML
                const popupHTML = `
                    <div class="modal fade" id="${page}Popup" tabindex="-1">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header" style="background-color: #f0f8ff;">
                                    <h5 class="modal-title">${getPopupTitle(page)}</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                                </div>
                                <div class="modal-body">
                                    ${getPopupContent(page)}
                                </div>
                                <div class="modal-footer" style="background-color: #f0f8ff;">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">${getPopupButtonText(page, 'cancel')}</button>
                                    <button type="button" class="btn btn-primary">${getPopupButtonText(page, 'confirm')}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                mainContent.insertAdjacentHTML('beforeend', popupHTML);
                
                // Update active state in sidebar
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${page}`) {
                        link.classList.add('active');
                    }
                });

                // Show popup for the page
                showPagePopup(page);

                currentPage = page;
            } else {
                console.error('Main content element not found');
            }
        } catch (error) {
            console.error('Error loading page:', error);
            if (mainContent) {
                mainContent.innerHTML = '<div class="alert alert-danger">Error loading page content</div>';
            }
        }
    }

    function getPopupTitle(page) {
        const titles = {
            contextual: 'Welcome to Bloolai Faruk',
            behavior: 'Define AI Behavior',
            specialists: 'AI Specialists Overview',
            collaborate: 'Team Collaboration',
            fundament: 'Knowledge Base',
            diversify: 'AI Services',
            integrate: 'Integration Options',
            automate: 'Process Automation',
            build: 'Agent Building',
            publishing: 'Marketing Automation',
            competition: 'Competition Analysis',
            profession: 'Professional Profile',
            wizard: 'Welcome to the Wizard'
        };
        return titles[page] || 'Information';
    }

    function getPopupContent(page) {
        if (page === 'contextual') {
            return `Based on your email, I concluded you are the CTO and co-owner of Bloola, a boutique Dortmund based A.I. software development firm, focused on SAAS production for client.<br><br>I've defined your business fundamentals for us to work with, please take a look if this is correct. Feel free to edit, ask for my support, or start a fully new project for another company or project.`;
        }

        const contents = {
            behavior: 'Configure how your AI agents communicate and interact.',
            specialists: 'Discover AI specialists designed for different business functions.',
            collaborate: 'Share and collaborate with team members.',
            fundament: 'Review your knowledge base settings.',
            diversify: 'Explore available AI services.',
            integrate: 'Learn about integration options.',
            automate: 'Set up automated workflows.',
            build: 'Start building custom AI agents.',
            publishing: 'Configure marketing automation.',
            competition: 'Analyze your competitive landscape.',
            profession: 'Define your professional context.',
            wizard: 'Let\'s analyze your business context.'
        };
        return contents[page] || 'Welcome to this section.';
    }

    function getPopupButtonText(page, type) {
        if (page === 'contextual') {
            return type === 'cancel' ? 'Initiate New Project' : 'Got it!';
        }
        return type === 'cancel' ? 'Close' : 'Got it!';
    }

    // Handle navigation with proper error checking
    document.addEventListener('click', (e) => {
        const link = e.target.closest('.nav-link');
        if (link && link.getAttribute('href')) {
            e.preventDefault();
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                const page = href.substring(1);
                loadPage(page);
            }
        }
    });

    // Load initial page
    loadPage('wizard');
}