class HVACDiagnosticAgent {
    constructor() {
        this.currentScreen = 'welcome';
        this.selectedSystem = '';
        this.selectedCategory = '';
        this.currentStep = 0;
        this.diagnosticSteps = [];
        this.userResponses = {};
        this.diagnosis = null;
        
        this.initializeEventListeners();
        this.loadDiagnosticData();
    }

    initializeEventListeners() {
        // System selection
        document.querySelectorAll('.system-card').forEach(card => {
            card.addEventListener('click', (e) => {
                this.selectSystem(e.currentTarget.dataset.system);
            });
        });

        // Problem category selection
        document.querySelectorAll('.category-card').forEach(card => {
            card.addEventListener('click', (e) => {
                this.selectCategory(e.currentTarget.dataset.category);
            });
        });

        // Navigation buttons
        document.getElementById('prev-step').addEventListener('click', () => this.previousStep());
        document.getElementById('next-step').addEventListener('click', () => this.nextStep());
        document.getElementById('reset-btn').addEventListener('click', () => this.reset());
        document.getElementById('start-over').addEventListener('click', () => this.reset());
        document.getElementById('print-results').addEventListener('click', () => this.printResults());
        
        // Reference library buttons
        document.getElementById('reference-btn').addEventListener('click', () => this.showReferenceLibrary());
        document.getElementById('close-reference').addEventListener('click', () => this.closeReferenceLibrary());
        document.getElementById('upload-manual').addEventListener('click', () => this.uploadManual());
        
        // Reference links
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('ref-link') || e.target.closest('.ref-link')) {
                e.preventDefault();
                const link = e.target.closest('.ref-link');
                this.openReference(link.dataset.type, link.dataset.system || link.dataset.topic);
            }
        });
        
        // Modal controls
        document.getElementById('close-modal').addEventListener('click', () => this.closeModal());
        document.getElementById('download-reference').addEventListener('click', () => this.downloadReference());
        document.getElementById('print-reference').addEventListener('click', () => this.printReference());
        
        // Close modal when clicking outside
        document.getElementById('reference-modal').addEventListener('click', (e) => {
            if (e.target.id === 'reference-modal') {
                this.closeModal();
            }
        });
    }

    loadDiagnosticData() {
        // Load expanded knowledge base from external file
        this.knowledgeBase = window.HVACKnowledgeBase || {
            'central-air': {
                'cooling': {
                    steps: [
                        {
                            title: 'Initial System Check',
                            description: 'Let\'s start with basic system verification',
                            icon: 'fas fa-search',
                            content: {
                                type: 'checklist',
                                items: [
                                    'Check if thermostat is set to COOL mode',
                                    'Verify temperature setting is below room temperature',
                                    'Ensure circuit breaker is ON',
                                    'Check if outdoor unit is running'
                                ]
                            }
                        },
                        {
                            title: 'Air Filter Inspection',
                            description: 'A dirty filter is the most common cause of cooling problems',
                            icon: 'fas fa-filter',
                            content: {
                                type: 'question',
                                question: 'When did you last change the air filter?',
                                options: [
                                    { value: 'recent', text: 'Within the last 3 months' },
                                    { value: 'old', text: '3-12 months ago' },
                                    { value: 'very-old', text: 'Over a year ago' },
                                    { value: 'unknown', text: 'I don\'t remember' }
                                ]
                            }
                        },
                        {
                            title: 'Airflow Assessment',
                            description: 'Check for proper air circulation',
                            icon: 'fas fa-wind',
                            content: {
                                type: 'question',
                                question: 'How would you describe the airflow from your vents?',
                                options: [
                                    { value: 'strong', text: 'Strong and consistent' },
                                    { value: 'weak', text: 'Weak but present' },
                                    { value: 'none', text: 'No airflow at all' },
                                    { value: 'uneven', text: 'Strong in some rooms, weak in others' }
                                ]
                            }
                        },
                        {
                            title: 'Outdoor Unit Inspection',
                            description: 'Check the condenser unit outside',
                            icon: 'fas fa-home',
                            content: {
                                type: 'checklist',
                                items: [
                                    'Remove debris around outdoor unit (2-3 feet clearance)',
                                    'Check if condenser coils are dirty or blocked',
                                    'Verify outdoor fan is spinning',
                                    'Listen for unusual noises'
                                ]
                            }
                        },
                        {
                            title: 'Temperature Assessment',
                            description: 'Measure system performance',
                            icon: 'fas fa-thermometer-half',
                            content: {
                                type: 'question',
                                question: 'What is the temperature difference between your thermostat setting and actual room temperature?',
                                options: [
                                    { value: 'small', text: '1-3 degrees warmer' },
                                    { value: 'medium', text: '4-7 degrees warmer' },
                                    { value: 'large', text: '8+ degrees warmer' },
                                    { value: 'same', text: 'No difference (not cooling at all)' }
                                ]
                            }
                        }
                    ],
                    diagnoses: {
                        'dirty-filter': {
                            condition: (responses) => responses.filter === 'old' || responses.filter === 'very-old' || responses.filter === 'unknown',
                            title: 'Dirty Air Filter',
                            description: 'Your air filter needs to be replaced. A dirty filter restricts airflow and reduces cooling efficiency.',
                            steps: [
                                'Turn off the system at the thermostat',
                                'Locate the air filter (usually near the indoor unit or in a return air vent)',
                                'Remove the old filter and note its size',
                                'Install a new filter with the same dimensions',
                                'Ensure the airflow arrow points toward the unit',
                                'Turn the system back on and wait 30 minutes to test'
                            ]
                        },
                        'low-refrigerant': {
                            condition: (responses) => responses.airflow === 'weak' && responses.temperature === 'large',
                            title: 'Low Refrigerant',
                            description: 'Your system may be low on refrigerant, which requires professional service.',
                            steps: [
                                'Check for ice formation on indoor coils',
                                'Look for refrigerant leaks around outdoor unit',
                                'Contact a licensed HVAC technician for refrigerant service',
                                'Do not attempt to add refrigerant yourself'
                            ]
                        },
                        'electrical-issue': {
                            condition: (responses) => responses.airflow === 'none',
                            title: 'Electrical Problem',
                            description: 'There appears to be an electrical issue preventing proper operation.',
                            steps: [
                                'Check circuit breaker and reset if tripped',
                                'Verify thermostat has power (display should be on)',
                                'Check for loose connections at thermostat',
                                'If problem persists, contact an HVAC technician'
                            ]
                        },
                        'maintenance-needed': {
                            condition: (responses) => responses.temperature === 'medium' && responses.airflow === 'strong',
                            title: 'System Maintenance Required',
                            description: 'Your system needs routine maintenance to restore efficiency.',
                            steps: [
                                'Clean or replace air filter',
                                'Clean outdoor condenser coils',
                                'Clear debris from around outdoor unit',
                                'Schedule professional maintenance if issues persist'
                            ]
                        }
                    }
                },
                'heating': {
                    steps: [
                        {
                            title: 'Thermostat Check',
                            description: 'Verify thermostat settings and operation',
                            icon: 'fas fa-thermometer-half',
                            content: {
                                type: 'checklist',
                                items: [
                                    'Set thermostat to HEAT mode',
                                    'Set temperature 5 degrees above room temperature',
                                    'Check if display is working',
                                    'Replace batteries if needed'
                                ]
                            }
                        }
                        // Add more heating diagnostic steps...
                    ]
                }
            },
            'furnace': {
                'heating': {
                    steps: [
                        {
                            title: 'Safety Check',
                            description: 'Ensure safe operation before diagnosis',
                            icon: 'fas fa-shield-alt',
                            content: {
                                type: 'checklist',
                                items: [
                                    'Check for gas odors (if present, evacuate and call gas company)',
                                    'Ensure furnace area is clear of combustibles',
                                    'Verify pilot light is lit (if applicable)',
                                    'Check that furnace door is properly closed'
                                ]
                            }
                        }
                        // Add more furnace diagnostic steps...
                    ]
                }
            }
            // Add more system types and categories...
        };
    }

    selectSystem(systemType) {
        this.selectedSystem = systemType;
        document.getElementById('selected-system').textContent = this.getSystemDisplayName(systemType);
        this.showScreen('problem');
    }

    selectCategory(category) {
        this.selectedCategory = category;
        document.getElementById('diagnostic-system').textContent = this.getSystemDisplayName(this.selectedSystem);
        document.getElementById('diagnostic-category').textContent = this.getCategoryDisplayName(category);
        
        this.loadDiagnosticSteps();
        this.showScreen('diagnostic');
    }

    loadDiagnosticSteps() {
        const systemData = this.knowledgeBase[this.selectedSystem];
        if (systemData && systemData[this.selectedCategory]) {
            this.diagnosticSteps = systemData[this.selectedCategory].steps;
            this.diagnoses = systemData[this.selectedCategory].diagnoses;
            this.currentStep = 0;
            this.userResponses = {};
            this.updateDiagnosticStep();
        }
    }

    updateDiagnosticStep() {
        if (this.currentStep >= this.diagnosticSteps.length) {
            this.performDiagnosis();
            return;
        }

        const step = this.diagnosticSteps[this.currentStep];
        const totalSteps = this.diagnosticSteps.length;
        
        // Update progress
        const progress = ((this.currentStep + 1) / totalSteps) * 100;
        document.getElementById('progress-fill').style.width = `${progress}%`;
        document.getElementById('current-step').textContent = this.currentStep + 1;
        document.getElementById('total-steps').textContent = totalSteps;
        
        // Update step content
        document.getElementById('step-icon').className = step.icon;
        document.getElementById('step-title').textContent = step.title;
        document.getElementById('step-description').textContent = step.description;
        
        // Generate step content
        const stepContent = document.getElementById('step-content');
        stepContent.innerHTML = this.generateStepContent(step.content);
        
        // Update navigation buttons
        document.getElementById('prev-step').disabled = this.currentStep === 0;
        document.getElementById('next-step').textContent = 
            this.currentStep === totalSteps - 1 ? 'Complete Diagnosis' : 'Next';
    }

    generateStepContent(content) {
        if (content.type === 'checklist') {
            return `
                <div class="checklist">
                    ${content.items.map((item, index) => `
                        <div class="checklist-item">
                            <input type="checkbox" id="check-${index}" />
                            <label for="check-${index}">${item}</label>
                        </div>
                    `).join('')}
                </div>
            `;
        } else if (content.type === 'question') {
            return `
                <div class="question">
                    <h4>${content.question}</h4>
                    <div class="question-options">
                        ${content.options.map(option => `
                            <button class="option-button" data-value="${option.value}">
                                ${option.text}
                            </button>
                        `).join('')}
                    </div>
                </div>
            `;
        }
        return '';
    }

    nextStep() {
        // Collect responses from current step
        this.collectStepResponse();
        
        this.currentStep++;
        this.updateDiagnosticStep();
    }

    previousStep() {
        if (this.currentStep > 0) {
            this.currentStep--;
            this.updateDiagnosticStep();
        }
    }

    collectStepResponse() {
        const stepContent = document.getElementById('step-content');
        const step = this.diagnosticSteps[this.currentStep];
        
        if (step.content.type === 'question') {
            const selectedOption = stepContent.querySelector('.option-button.selected');
            if (selectedOption) {
                this.userResponses[step.content.question.toLowerCase().replace(/\s+/g, '-')] = selectedOption.dataset.value;
            }
        } else if (step.content.type === 'checklist') {
            const checkedItems = Array.from(stepContent.querySelectorAll('input[type="checkbox"]:checked'));
            this.userResponses[`step-${this.currentStep}-checklist`] = checkedItems.map(item => item.id);
        }
    }

    performDiagnosis() {
        // Simple diagnosis logic based on responses
        let diagnosis = null;
        
        if (this.diagnoses) {
            for (const [key, diagnosisData] of Object.entries(this.diagnoses)) {
                if (diagnosisData.condition(this.userResponses)) {
                    diagnosis = diagnosisData;
                    break;
                }
            }
        }
        
        // Default diagnosis if no specific match
        if (!diagnosis) {
            diagnosis = {
                title: 'Professional Service Recommended',
                description: 'Based on your responses, this issue may require professional diagnosis and repair.',
                steps: [
                    'Contact a licensed HVAC technician',
                    'Provide them with the symptoms you\'ve described',
                    'Schedule a service appointment',
                    'Keep a record of any error codes or unusual behaviors'
                ]
            };
        }
        
        this.diagnosis = diagnosis;
        this.showResults();
    }

    showResults() {
        const issueCard = document.getElementById('diagnosed-issue');
        issueCard.innerHTML = `
            <h4>${this.diagnosis.title}</h4>
            <p>${this.diagnosis.description}</p>
        `;
        
        const stepsList = document.getElementById('repair-steps-list');
        stepsList.innerHTML = `
            <ol>
                ${this.diagnosis.steps.map(step => `<li>${step}</li>`).join('')}
            </ol>
        `;
        
        this.showScreen('results');
    }

    showScreen(screenName) {
        // Hide all screens
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        
        // Show target screen
        document.getElementById(`${screenName}-screen`).classList.add('active');
        this.currentScreen = screenName;
    }

    reset() {
        this.currentScreen = 'welcome';
        this.selectedSystem = '';
        this.selectedCategory = '';
        this.currentStep = 0;
        this.userResponses = {};
        this.diagnosis = null;
        this.showScreen('welcome');
    }

    printResults() {
        window.print();
    }

    getSystemDisplayName(systemType) {
        const names = {
            'central-air': 'Central Air Conditioning',
            'heat-pump': 'Heat Pump',
            'furnace': 'Furnace',
            'boiler': 'Boiler',
            'window-unit': 'Window Unit',
            'mini-split': 'Mini Split System'
        };
        return names[systemType] || systemType;
    }

    getCategoryDisplayName(category) {
        const names = {
            'cooling': 'Cooling Issues',
            'heating': 'Heating Issues',
            'airflow': 'Airflow Problems',
            'electrical': 'Electrical Issues'
        };
        return names[category] || category;
    }
    
    // Reference Library Methods
    showReferenceLibrary() {
        this.showScreen('reference-screen');
    }
    
    closeReferenceLibrary() {
        // Return to the previous screen
        if (this.currentStep > 0) {
            this.showScreen('diagnostic-screen');
        } else if (this.selectedCategory) {
            this.showScreen('problem-screen');
        } else {
            this.showScreen('welcome-screen');
        }
    }
    
    openReference(type, identifier) {
        const modal = document.getElementById('reference-modal');
        const title = document.getElementById('modal-title');
        const body = document.getElementById('modal-body');
        
        let content = '';
        let titleText = '';
        
        if (type === 'guide') {
            const guideContent = this.getGuideContent(identifier);
            titleText = guideContent.title;
            content = guideContent.content;
        } else if (type === 'manual') {
            titleText = `${this.getSystemDisplayName(identifier)} Manual`;
            content = this.getManualContent(identifier);
        } else if (type === 'wiring') {
            titleText = `${this.getSystemDisplayName(identifier)} Wiring Diagrams`;
            content = this.getWiringContent(identifier);
        }
        
        title.textContent = titleText;
        body.innerHTML = content;
        modal.style.display = 'block';
    }
    
    getGuideContent(topic) {
        const guides = {
            'electrical': {
                title: 'Electrical Troubleshooting Guide',
                content: this.formatKnowledgeContent(window.hvacKnowledge['electrical-systems'])
            },
            'refrigeration': {
                title: 'Refrigeration Systems Guide',
                content: this.formatKnowledgeContent(window.hvacKnowledge['refrigeration-systems'])
            },
            'repair': {
                title: 'Repair Techniques Guide',
                content: this.formatKnowledgeContent(window.hvacKnowledge['repair-techniques'])
            },
            'safety': {
                title: 'Safety Protocols Guide',
                content: this.formatKnowledgeContent(window.hvacKnowledge['safety-protocols'])
            },
            'maintenance': {
                title: 'Preventive Maintenance Guide',
                content: this.formatKnowledgeContent(window.hvacKnowledge['preventive-maintenance'])
            },
            'troubleshooting': {
                title: 'Troubleshooting Methodology',
                content: this.formatKnowledgeContent(window.hvacKnowledge['troubleshooting-methodology'])
            },
            'case-studies': {
                title: 'Case Studies',
                content: this.formatKnowledgeContent(window.hvacKnowledge['case-studies'])
            },
            'tools': {
                title: 'Tools & Equipment Guide',
                content: this.formatKnowledgeContent(window.hvacKnowledge['tools-equipment'])
            }
        };
        
        return guides[topic] || { title: 'Reference Guide', content: '<p>Content not available.</p>' };
    }
    
    formatKnowledgeContent(knowledgeSection) {
        if (!knowledgeSection) return '<p>Content not available.</p>';
        
        let html = '';
        
        if (knowledgeSection.overview) {
            html += `<div class="guide-section"><h3>Overview</h3><p>${knowledgeSection.overview}</p></div>`;
        }
        
        Object.keys(knowledgeSection).forEach(key => {
            if (key !== 'overview' && typeof knowledgeSection[key] === 'object') {
                html += `<div class="guide-section"><h3>${this.formatSectionTitle(key)}</h3>`;
                
                if (Array.isArray(knowledgeSection[key])) {
                    html += '<ul>';
                    knowledgeSection[key].forEach(item => {
                        if (typeof item === 'string') {
                            html += `<li>${item}</li>`;
                        } else if (typeof item === 'object') {
                            html += `<li><strong>${item.title || item.name}:</strong> ${item.description || item.procedure || item.content}</li>`;
                        }
                    });
                    html += '</ul>';
                } else {
                    Object.keys(knowledgeSection[key]).forEach(subKey => {
                        const subSection = knowledgeSection[key][subKey];
                        html += `<h4>${this.formatSectionTitle(subKey)}</h4>`;
                        
                        if (Array.isArray(subSection)) {
                            html += '<ul>';
                            subSection.forEach(item => {
                                html += `<li>${typeof item === 'string' ? item : item.description || item.procedure || item.content}</li>`;
                            });
                            html += '</ul>';
                        } else if (typeof subSection === 'string') {
                            html += `<p>${subSection}</p>`;
                        }
                    });
                }
                
                html += '</div>';
            }
        });
        
        return html || '<p>Content not available.</p>';
    }
    
    formatSectionTitle(key) {
        return key.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }
    
    getManualContent(system) {
        return `
            <div class="manual-content">
                <h3>${this.getSystemDisplayName(system)} Service Manual</h3>
                <p><strong>Note:</strong> This is a placeholder for actual equipment manuals. In a production environment, this would link to or display actual manufacturer documentation.</p>
                
                <h4>Quick Reference</h4>
                <ul>
                    <li>Installation specifications</li>
                    <li>Electrical requirements</li>
                    <li>Maintenance schedules</li>
                    <li>Troubleshooting charts</li>
                    <li>Parts diagrams</li>
                    <li>Warranty information</li>
                </ul>
                
                <div class="manual-placeholder">
                    <i class="fas fa-file-pdf" style="font-size: 48px; color: #ccc; margin: 20px;"></i>
                    <p>Manual content would be displayed here</p>
                </div>
            </div>
        `;
    }
    
    getWiringContent(system) {
        return `
            <div class="wiring-content">
                <h3>${this.getSystemDisplayName(system)} Wiring Diagrams</h3>
                <p><strong>Note:</strong> This is a placeholder for actual wiring diagrams. In a production environment, this would display interactive wiring diagrams.</p>
                
                <h4>Available Diagrams</h4>
                <ul>
                    <li>Control circuit wiring</li>
                    <li>Power circuit connections</li>
                    <li>Thermostat wiring</li>
                    <li>Safety device connections</li>
                    <li>Component locations</li>
                </ul>
                
                <div class="wiring-placeholder">
                    <i class="fas fa-sitemap" style="font-size: 48px; color: #ccc; margin: 20px;"></i>
                    <p>Wiring diagrams would be displayed here</p>
                </div>
            </div>
        `;
    }
    
    uploadManual() {
        // Create file input for manual upload
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.pdf,.doc,.docx,.txt';
        input.multiple = true;
        
        input.onchange = (e) => {
            const files = Array.from(e.target.files);
            if (files.length > 0) {
                alert(`Selected ${files.length} file(s) for upload. In a production environment, these would be processed and added to the reference library.`);
                // In production, you would handle file upload here
            }
        };
        
        input.click();
    }
    
    closeModal() {
        document.getElementById('reference-modal').style.display = 'none';
    }
    
    downloadReference() {
        const title = document.getElementById('modal-title').textContent;
        const content = document.getElementById('modal-body').innerHTML;
        
        // Create a simple text version for download
        const textContent = content.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
        const blob = new Blob([`${title}\n\n${textContent}`], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.txt`;
        a.click();
        
        URL.revokeObjectURL(url);
    }
    
    printReference() {
        const title = document.getElementById('modal-title').textContent;
        const content = document.getElementById('modal-body').innerHTML;
        
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
                <head>
                    <title>${title}</title>
                    <style>
                        body { font-family: Arial, sans-serif; margin: 20px; }
                        h3, h4 { color: #333; }
                        .guide-section { margin-bottom: 20px; }
                        ul { margin-left: 20px; }
                    </style>
                </head>
                <body>
                    <h1>${title}</h1>
                    ${content}
                </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    const app = new HVACDiagnosticAgent();
    
    // Add click handlers for option buttons
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('option-button')) {
            // Remove selection from siblings
            e.target.parentNode.querySelectorAll('.option-button').forEach(btn => {
                btn.classList.remove('selected');
            });
            // Select clicked option
            e.target.classList.add('selected');
        }
    });
});
