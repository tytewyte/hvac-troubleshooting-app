// Main Application JavaScript for HVAC Troubleshooting App

// DOM Elements
const navLinks = document.querySelectorAll('nav a');
const pages = document.querySelectorAll('.page');
const startTroubleshootingBtn = document.getElementById('start-troubleshooting');
const submitIssueBtn = document.getElementById('submit-issue');
const aiResponseSection = document.getElementById('ai-response');
const responseContent = document.querySelector('.response-content');

// Feedback Elements
const feedbackBtn = document.getElementById('feedback-btn');
const feedbackModal = document.getElementById('feedback-modal');
const feedbackForm = document.getElementById('feedback-form');
const feedbackSuccess = document.getElementById('feedback-success');
const modalCloseButtons = document.querySelectorAll('.modal .close');

// Navigation
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetPage = link.getAttribute('data-page');
    
    // Update active nav link
    navLinks.forEach(navLink => navLink.classList.remove('active'));
    link.classList.add('active');
    
    // Show target page
    pages.forEach(page => {
      if (page.id === `${targetPage}-page`) {
        page.classList.add('active');
      } else {
        page.classList.remove('active');
      }
    });
  });
});

// Start Troubleshooting Button
startTroubleshootingBtn.addEventListener('click', () => {
  // Navigate to troubleshooting page
  navLinks.forEach(navLink => navLink.classList.remove('active'));
  document.querySelector('nav a[data-page="troubleshoot"]').classList.add('active');
  
  pages.forEach(page => {
    if (page.id === 'troubleshoot-page') {
      page.classList.add('active');
    } else {
      page.classList.remove('active');
    }
  });
});

// Load Knowledge Base Categories
async function loadKnowledgeBase() {
  const authToken = localStorage.getItem('token');
  
  if (!authToken) {
    // If not logged in, show sample categories
    const sampleCategories = [
      {
        id: 'heating',
        name: 'Heating Systems',
        subcategories: ['Furnaces', 'Heat Pumps', 'Boilers', 'Radiators']
      },
      {
        id: 'cooling',
        name: 'Cooling Systems',
        subcategories: ['Central Air', 'Ductless Mini-Splits', 'Window Units', 'Evaporative Coolers']
      },
      {
        id: 'ventilation',
        name: 'Ventilation',
        subcategories: ['Ductwork', 'Air Handlers', 'ERVs/HRVs', 'Exhaust Systems']
      }
    ];
    
    displayKnowledgeCategories(sampleCategories);
    return;
  }
  
  try {
    const response = await fetch('/api/knowledge', {
      headers: {
        'x-auth-token': authToken
      }
    });
    
    if (response.ok) {
      const data = await response.json();
      displayKnowledgeCategories(data.categories);
    }
  } catch (error) {
    console.error('Error loading knowledge base:', error);
  }
}

// Display Knowledge Categories
function displayKnowledgeCategories(categories) {
  const categoriesContainer = document.querySelector('.kb-categories');
  categoriesContainer.innerHTML = '';
  
  categories.forEach(category => {
    const categoryElement = document.createElement('div');
    categoryElement.className = 'kb-category';
    categoryElement.setAttribute('data-id', category.id);
    
    categoryElement.innerHTML = `
      <h3>${category.name}</h3>
      <p>${category.subcategories.length} subcategories</p>
    `;
    
    categoryElement.addEventListener('click', () => {
      // Update active category
      document.querySelectorAll('.kb-category').forEach(cat => {
        cat.classList.remove('active');
      });
      categoryElement.classList.add('active');
      
      // Display category content
      displayCategoryContent(category);
    });
    
    categoriesContainer.appendChild(categoryElement);
  });
}

// Display Category Content
function displayCategoryContent(category) {
  const contentContainer = document.querySelector('.kb-content');
  
  let subcategoriesHTML = '';
  category.subcategories.forEach(sub => {
    subcategoriesHTML += `<li><a href="#" class="subcategory-link" data-category="${category.id}" data-subcategory="${sub}">${sub}</a></li>`;
  });
  
  contentContainer.innerHTML = `
    <h3>${category.name}</h3>
    <div class="safety-notice">
      <i class="fas fa-exclamation-triangle"></i>
      <p><strong>Safety Notice:</strong> Always prioritize safety when working with HVAC systems. For complex issues, consult a certified professional.</p>
    </div>
    <h4>Subcategories:</h4>
    <ul>${subcategoriesHTML}</ul>
    <div class="category-description">
      <p>This section contains information about ${category.name.toLowerCase()}. Select a subcategory to view detailed information.</p>
    </div>
  `;
  
  // Add event listeners to subcategory links
  document.querySelectorAll('.subcategory-link').forEach(link => {
    link.addEventListener('click', async (e) => {
      e.preventDefault();
      const categoryId = link.getAttribute('data-category');
      const subcategory = link.getAttribute('data-subcategory');
      
      // If it's a professional category, fetch the detailed content
      if (categoryId === 'professional') {
        await loadProfessionalContent(subcategory);
      } else {
        // For other categories, show a placeholder message
        contentContainer.innerHTML += `
          <div class="subcategory-content">
            <h4>${subcategory}</h4>
            <p>Detailed information about ${subcategory.toLowerCase()} will be available soon.</p>
          </div>
        `;
      }
    });
  });
}

// Load Professional HVAC Content
async function loadProfessionalContent(subcategory) {
  const contentContainer = document.querySelector('.kb-content');
  const authToken = localStorage.getItem('token');
  
  // Show loading state
  contentContainer.innerHTML += '<div class="loading">Loading professional content...</div>';
  
  try {
    if (!authToken) {
      // If not logged in, show sample content based on subcategory
      setTimeout(() => {
        const loadingElement = document.querySelector('.loading');
        if (loadingElement) loadingElement.remove();
        
        // Convert subcategory to API-friendly format
        const apiCategory = subcategory.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-');
        
        // Sample professional content (simplified version of what's in the API)
        let sampleContent = '';
        
        if (apiCategory === 'air-handler-wiring-components') {
          sampleContent = `
            <h3>Air Handler Wiring & Components (Focus: Troubleshooting & Advanced Diagnostics)</h3>
            <p>This section contains detailed information about air handler wiring and components for professional HVAC technicians.</p>
            <div class="safety-notice">
              <i class="fas fa-exclamation-triangle"></i>
              <p><strong>Safety Notice:</strong> This information is for experienced HVAC professionals only. Working with electrical systems can be extremely dangerous.</p>
            </div>
            <p>Please log in to view the complete professional content.</p>
          `;
        } else if (apiCategory === 'condenser-wiring-components') {
          sampleContent = `
            <h3>Condenser Wiring & Components (Focus: High-Voltage Systems and Refrigerant Circuit Interaction)</h3>
            <p>This section contains detailed information about condenser wiring and components for professional HVAC technicians.</p>
            <div class="safety-notice">
              <i class="fas fa-exclamation-triangle"></i>
              <p><strong>Safety Notice:</strong> This information is for experienced HVAC professionals only. Working with high-voltage electrical systems and refrigerants can be extremely dangerous.</p>
            </div>
            <p>Please log in to view the complete professional content.</p>
          `;
        } else if (apiCategory === 'advanced-diagnostics') {
          sampleContent = `
            <h3>Advanced Diagnostics & Considerations</h3>
            <p>This section contains detailed information about advanced diagnostic techniques for professional HVAC technicians.</p>
            <div class="safety-notice">
              <i class="fas fa-exclamation-triangle"></i>
              <p><strong>Safety Notice – CRITICAL!</strong> This information is for experienced HVAC professionals only.</p>
            </div>
            <p>Please log in to view the complete professional content.</p>
          `;
        }
        
        contentContainer.innerHTML += `
          <div class="subcategory-content professional-content">
            ${sampleContent}
          </div>
        `;
      }, 1000);
      return;
    }
    
    // Convert subcategory to API-friendly format
    const apiCategory = subcategory.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-');
    
    // Fetch professional content from API
    const response = await fetch(`/api/professional-knowledge/${apiCategory}`, {
      headers: {
        'x-auth-token': authToken
      }
    });
    
    if (response.ok) {
      const data = await response.json();
      
      // Remove loading indicator
      const loadingElement = document.querySelector('.loading');
      if (loadingElement) loadingElement.remove();
      
      // Display the professional content
      contentContainer.innerHTML += `
        <div class="subcategory-content professional-content">
          ${data.content}
        </div>
      `;
    } else {
      throw new Error('Failed to load professional content');
    }
  } catch (error) {
    console.error('Error loading professional content:', error);
    
    // Remove loading indicator
    const loadingElement = document.querySelector('.loading');
    if (loadingElement) loadingElement.remove();
    
    // Show error message
    contentContainer.innerHTML += `
      <div class="subcategory-content error-content">
        <h4>Error Loading Content</h4>
        <p>There was an error loading the professional content. Please try again later.</p>
      </div>
    `;
  }
}

// Submit Troubleshooting Issue
submitIssueBtn.addEventListener('click', async () => {
  const authToken = localStorage.getItem('token');
  const systemType = document.getElementById('system-type').value;
  const issueDescription = document.getElementById('issue-description').value;
  
  // Get selected symptoms
  const selectedSymptoms = [];
  document.querySelectorAll('input[name="symptom"]:checked').forEach(checkbox => {
    selectedSymptoms.push(checkbox.value);
  });
  
  // Validate input
  if (!issueDescription) {
    alert('Please describe your issue');
    return;
  }
  
  // Show loading state
  submitIssueBtn.disabled = true;
  submitIssueBtn.textContent = 'Getting assistance...';
  aiResponseSection.classList.remove('hidden');
  responseContent.innerHTML = '<p>Analyzing your issue...</p>';
  
  try {
    if (!authToken) {
      // If not logged in, show sample response with safety warnings
      setTimeout(() => {
        displaySampleResponse(systemType, issueDescription, selectedSymptoms);
        submitIssueBtn.disabled = false;
        submitIssueBtn.textContent = 'Get Troubleshooting Help';
      }, 2000);
      return;
    }
    
    // Send request to API
    const response = await fetch('/api/troubleshoot', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': authToken
      },
      body: JSON.stringify({
        systemType,
        issue: issueDescription,
        symptoms: selectedSymptoms
      })
    });
    
    if (response.ok) {
      const data = await response.json();
      
      // Display response
      responseContent.innerHTML = `
        <div class="safety-notice">
          <i class="fas fa-exclamation-triangle"></i>
          <p><strong>Safety Warning:</strong> ${data.safetyWarning}</p>
        </div>
        <p>${data.response}</p>
      `;
    } else {
      const errorData = await response.json();
      responseContent.innerHTML = `<p>Error: ${errorData.message || 'Failed to get troubleshooting assistance'}</p>`;
    }
  } catch (error) {
    console.error('Troubleshooting error:', error);
    responseContent.innerHTML = '<p>Error: Could not connect to the troubleshooting service. Please try again later.</p>';
  } finally {
    submitIssueBtn.disabled = false;
    submitIssueBtn.textContent = 'Get Troubleshooting Help';
  }
});

// Display Sample Response (when not logged in)
function displaySampleResponse(systemType, issue, symptoms) {
  const systemTypeText = systemType ? systemType.replace('-', ' ') : 'HVAC system';
  const symptomsText = symptoms.length > 0 ? symptoms.join(', ').replace(/-/g, ' ') : 'unspecified symptoms';
  
  let response = '';
  
  // Generate a safety-focused response based on the issue
  if (issue.toLowerCase().includes('no heat') || issue.toLowerCase().includes('not heating')) {
    response = `
      <div class="safety-notice">
        <i class="fas fa-exclamation-triangle"></i>
        <p><strong>Safety Warning:</strong> Always prioritize safety. For complex issues involving gas lines, electrical components, or internal furnace parts, consult a certified HVAC professional.</p>
      </div>
      
      <h4>Possible Causes for No Heat in ${systemTypeText}:</h4>
      <ol>
        <li><strong>Thermostat Issues:</strong>
          <ul>
            <li>Check if the thermostat is set to "Heat" mode</li>
            <li>Ensure temperature setting is higher than current room temperature</li>
            <li>Replace batteries if display is blank or fading</li>
          </ul>
        </li>
        <li><strong>Power Issues:</strong>
          <ul>
            <li>Check if the furnace power switch is turned on (typically looks like a light switch on or near the unit)</li>
            <li>Check circuit breakers to ensure none have tripped</li>
          </ul>
        </li>
        <li><strong>Filter Issues:</strong>
          <ul>
            <li>A clogged filter can cause the system to overheat and shut down</li>
            <li>Replace the filter if it appears dirty</li>
          </ul>
        </li>
      </ol>
      
      <h4>Safe DIY Steps:</h4>
      <ol>
        <li>Check and adjust thermostat settings</li>
        <li>Inspect and replace air filter if dirty</li>
        <li>Ensure all supply and return vents are open and unblocked</li>
        <li>Check circuit breakers and reset if tripped</li>
      </ol>
      
      <h4>When to Call a Professional:</h4>
      <p>Contact a certified HVAC technician immediately if:</p>
      <ul>
        <li>You smell gas or burning odors</li>
        <li>The system makes unusual noises when attempting to start</li>
        <li>You see any signs of water leakage around the unit</li>
        <li>The above steps don't resolve the issue</li>
      </ul>
    `;
  } else if (issue.toLowerCase().includes('no cool') || issue.toLowerCase().includes('not cooling')) {
    response = `
      <div class="safety-notice">
        <i class="fas fa-exclamation-triangle"></i>
        <p><strong>Safety Warning:</strong> Always prioritize safety. Never attempt to handle refrigerant or repair sealed system components yourself, as this requires professional certification and specialized tools.</p>
      </div>
      
      <h4>Possible Causes for No Cooling in ${systemTypeText}:</h4>
      <ol>
        <li><strong>Thermostat Issues:</strong>
          <ul>
            <li>Verify thermostat is set to "Cool" mode</li>
            <li>Ensure temperature setting is lower than current room temperature</li>
            <li>Check if thermostat has power (replace batteries if needed)</li>
          </ul>
        </li>
        <li><strong>Airflow Problems:</strong>
          <ul>
            <li>Dirty air filter restricting airflow</li>
            <li>Blocked or closed supply vents</li>
            <li>Debris around outdoor unit</li>
          </ul>
        </li>
        <li><strong>Power Issues:</strong>
          <ul>
            <li>Check circuit breakers for both indoor and outdoor units</li>
            <li>Verify outdoor disconnect switch is in the ON position</li>
          </ul>
        </li>
      </ol>
      
      <h4>Safe DIY Steps:</h4>
      <ol>
        <li>Check and adjust thermostat settings</li>
        <li>Replace air filter if dirty</li>
        <li>Clear debris (leaves, dirt, etc.) from around outdoor unit (turn power off first)</li>
        <li>Ensure all vents are open and unobstructed</li>
        <li>Check and reset circuit breakers if tripped</li>
      </ol>
      
      <h4>When to Call a Professional:</h4>
      <p>Contact a certified HVAC technician if:</p>
      <ul>
        <li>You notice ice formation on refrigerant lines or the indoor coil</li>
        <li>The system runs but doesn't cool effectively</li>
        <li>You hear unusual noises from either the indoor or outdoor unit</li>
        <li>The above steps don't resolve the issue</li>
      </ul>
    `;
  } else {
    // Generic response for other issues
    response = `
      <div class="safety-notice">
        <i class="fas fa-exclamation-triangle"></i>
        <p><strong>Safety Warning:</strong> Always prioritize safety when troubleshooting HVAC issues. For complex problems, electrical issues, or anything involving refrigerant or gas lines, consult a certified HVAC professional.</p>
      </div>
      
      <h4>Troubleshooting for ${systemTypeText} with ${symptomsText}:</h4>
      
      <p>Based on your description: "${issue}", here are some general troubleshooting steps:</p>
      
      <h4>Initial Checks:</h4>
      <ol>
        <li>Verify thermostat settings are correct for your desired operation</li>
        <li>Check that the system has power (circuit breakers, disconnect switches)</li>
        <li>Inspect air filters and replace if dirty</li>
        <li>Ensure all vents and registers are open and unobstructed</li>
        <li>Check that outdoor unit is clear of debris and has proper airflow</li>
      </ol>
      
      <h4>System-Specific Checks:</h4>
      <p>For more specific guidance, please provide additional details about your system and the exact symptoms you're experiencing. Different HVAC systems have unique troubleshooting procedures.</p>
      
      <h4>When to Call a Professional:</h4>
      <p>Contact a certified HVAC technician if:</p>
      <ul>
        <li>You're uncomfortable performing any troubleshooting steps</li>
        <li>The issue involves electrical components, gas connections, or refrigerant</li>
        <li>You notice unusual odors, sounds, or leaks</li>
        <li>Basic troubleshooting doesn't resolve the issue</li>
      </ul>
      
      <p>For more accurate troubleshooting assistance, consider creating an account and providing more details about your specific HVAC system.</p>
    `;
  }
  
  responseContent.innerHTML = response;
}

// Feedback Modal Functionality
feedbackBtn.addEventListener('click', () => {
  feedbackModal.classList.remove('hidden');
  feedbackForm.classList.remove('hidden');
  feedbackSuccess.classList.add('hidden');
});

// Close modals when clicking the X button
modalCloseButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = button.closest('.modal');
    modal.classList.add('hidden');
  });
});

// Close modals when clicking outside the modal content
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal')) {
    e.target.classList.add('hidden');
  }
});

// Handle feedback form submission
feedbackForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const feedbackData = {
    name: document.getElementById('feedback-name').value,
    email: document.getElementById('feedback-email').value,
    type: document.getElementById('feedback-type').value,
    message: document.getElementById('feedback-message').value,
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent
  };
  
  try {
    // Show loading state
    const submitButton = feedbackForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    submitButton.textContent = 'Submitting...';
    submitButton.disabled = true;
    
    // Send feedback to the server
    const response = await fetch('/api/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(feedbackData)
    });
    
    if (!response.ok) {
      throw new Error('Failed to submit feedback');
    }
    
    // Also store in localStorage as a backup
    const storedFeedback = JSON.parse(localStorage.getItem('userFeedback') || '[]');
    storedFeedback.push(feedbackData);
    localStorage.setItem('userFeedback', JSON.stringify(storedFeedback));
    
    // Show success message
    feedbackForm.classList.add('hidden');
    feedbackSuccess.classList.remove('hidden');
    
    // Reset form
    feedbackForm.reset();
    
    // Close modal after 3 seconds
    setTimeout(() => {
      feedbackModal.classList.add('hidden');
      // Reset button state
      submitButton.textContent = originalButtonText;
      submitButton.disabled = false;
    }, 3000);
  } catch (error) {
    console.error('Error submitting feedback:', error);
    alert('There was an error submitting your feedback. Please try again later.');
  }
});

// Reference Library Functionality
const referenceModal = document.getElementById('reference-modal');
const referenceTitle = document.getElementById('reference-title');
const referenceContent = document.getElementById('reference-content');
const referenceLinks = document.querySelectorAll('.reference-link');
const uploadReferenceBtn = document.getElementById('upload-reference');
const downloadAllBtn = document.getElementById('download-all');
const printLibraryBtn = document.getElementById('print-library');
const downloadReferenceBtn = document.getElementById('download-reference');
const printReferenceBtn = document.getElementById('print-reference');
const closeReferenceBtn = document.getElementById('close-reference');

// Reference Library Event Listeners
referenceLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const contentType = link.getAttribute('data-content');
    openReference(contentType);
  });
});

if (uploadReferenceBtn) {
  uploadReferenceBtn.addEventListener('click', () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.doc,.docx,.txt';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        alert(`File "${file.name}" uploaded successfully!`);
      }
    };
    input.click();
  });
}

if (downloadAllBtn) {
  downloadAllBtn.addEventListener('click', () => {
    alert('Downloading all reference materials...');
  });
}

if (printLibraryBtn) {
  printLibraryBtn.addEventListener('click', () => {
    window.print();
  });
}

if (downloadReferenceBtn) {
  downloadReferenceBtn.addEventListener('click', () => {
    const title = referenceTitle.textContent;
    alert(`Downloading "${title}"...`);
  });
}

if (printReferenceBtn) {
  printReferenceBtn.addEventListener('click', () => {
    const printWindow = window.open('', '_blank');
    const title = referenceTitle.textContent;
    const content = referenceContent.innerHTML;
    
    printWindow.document.write(`
      <html>
        <head>
          <title>${title}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h3 { color: #0077cc; }
            .guide-section { margin-bottom: 20px; }
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
  });
}

if (closeReferenceBtn) {
  closeReferenceBtn.addEventListener('click', () => {
    closeReferenceModal();
  });
}

// Reference Modal Functions
function openReference(contentType) {
  const content = getReferenceContent(contentType);
  referenceTitle.textContent = content.title;
  referenceContent.innerHTML = content.html;
  showReferenceModal();
}

function showReferenceModal() {
  referenceModal.style.display = 'block';
  document.body.style.overflow = 'hidden';
}

function closeReferenceModal() {
  referenceModal.style.display = 'none';
  document.body.style.overflow = 'auto';
}

function getReferenceContent(contentType) {
  // Load content from hvac-knowledge-base.js if available
  if (typeof window.hvacKnowledgeBase !== 'undefined' && window.hvacKnowledgeBase[contentType]) {
    return window.hvacKnowledgeBase[contentType];
  }
  
  // Fallback content
  const fallbackContent = {
    'furnace-manual': {
      title: 'Furnace Installation & Service Manual',
      html: `
        <div class="guide-section">
          <h3>Safety Procedures</h3>
          <ul>
            <li>Always turn off power before servicing</li>
            <li>Check for gas leaks before ignition</li>
            <li>Ensure proper ventilation</li>
            <li>Use appropriate PPE</li>
          </ul>
        </div>
        <div class="guide-section">
          <h3>Installation Guidelines</h3>
          <ul>
            <li>Verify proper clearances</li>
            <li>Install according to local codes</li>
            <li>Test all safety controls</li>
            <li>Commission the system</li>
          </ul>
        </div>
      `
    },
    'ac-manual': {
      title: 'Air Conditioner Service Manual',
      html: `
        <div class="guide-section">
          <h3>Refrigerant Handling</h3>
          <ul>
            <li>EPA certification required</li>
            <li>Use proper recovery equipment</li>
            <li>Check for leaks before charging</li>
            <li>Follow manufacturer specifications</li>
          </ul>
        </div>
        <div class="guide-section">
          <h3>Electrical Safety</h3>
          <ul>
            <li>Lock out/tag out procedures</li>
            <li>Test voltage before working</li>
            <li>Use insulated tools</li>
            <li>Check grounding</li>
          </ul>
        </div>
      `
    },
    'safety-guide': {
      title: 'Safety Procedures & Protocols',
      html: `
        <div class="guide-section">
          <h3>Personal Protective Equipment</h3>
          <ul>
            <li>Safety glasses and face shields</li>
            <li>Insulated gloves for electrical work</li>
            <li>Steel-toed boots</li>
            <li>Hard hats in appropriate areas</li>
          </ul>
        </div>
        <div class="guide-section">
          <h3>Lockout/Tagout Procedures</h3>
          <ul>
            <li>Identify all energy sources</li>
            <li>Notify affected personnel</li>
            <li>Apply locks and tags</li>
            <li>Verify isolation before work</li>
          </ul>
        </div>
      `
    }
  };
  
  return fallbackContent[contentType] || {
    title: 'Reference Document',
    html: '<p>Content not available. Please check back later.</p>'
  };
}

// Reference Library Functionality
const referenceModal = document.getElementById('reference-modal');
const referenceTitle = document.getElementById('reference-title');
const referenceContent = document.getElementById('reference-content');
const uploadReferenceBtn = document.getElementById('upload-reference');
const downloadAllBtn = document.getElementById('download-all');
const printLibraryBtn = document.getElementById('print-library');
const downloadReferenceBtn = document.getElementById('download-reference');
const printReferenceBtn = document.getElementById('print-reference');
const closeReferenceBtn = document.getElementById('close-reference');

// Reference Library Event Listeners
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('reference-link')) {
    e.preventDefault();
    const contentType = e.target.getAttribute('data-content');
    const type = e.target.getAttribute('data-type');
    openReference(contentType, type);
  }
});

if (uploadReferenceBtn) {
  uploadReferenceBtn.addEventListener('click', () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.doc,.docx,.txt';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        alert(`File "${file.name}" uploaded successfully to reference library.`);
      }
    };
    input.click();
  });
}

if (downloadAllBtn) {
  downloadAllBtn.addEventListener('click', () => {
    alert('Downloading all reference documents...');
  });
}

if (printLibraryBtn) {
  printLibraryBtn.addEventListener('click', () => {
    window.print();
  });
}

if (downloadReferenceBtn) {
  downloadReferenceBtn.addEventListener('click', () => {
    const title = referenceTitle.textContent;
    alert(`Downloading "${title}"...`);
  });
}

if (printReferenceBtn) {
  printReferenceBtn.addEventListener('click', () => {
    const printWindow = window.open('', '_blank');
    const content = referenceContent.innerHTML;
    const title = referenceTitle.textContent;
    
    printWindow.document.write(`
      <html>
        <head>
          <title>${title}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h3 { color: #0077cc; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px; }
            h4 { color: #4a5568; margin-top: 15px; }
            ul { margin-left: 20px; line-height: 1.6; }
            li { margin-bottom: 8px; }
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
  });
}

if (closeReferenceBtn) {
  closeReferenceBtn.addEventListener('click', () => {
    closeReferenceModal();
  });
}

// Reference Library Functions
function openReference(contentType, type) {
  referenceTitle.textContent = getContentTitle(contentType);
  referenceContent.innerHTML = getContentHTML(contentType, type);
  referenceModal.classList.remove('hidden');
  referenceModal.style.display = 'block';
}

function closeReferenceModal() {
  referenceModal.classList.add('hidden');
  referenceModal.style.display = 'none';
}

function getContentTitle(contentType) {
  const titles = {
    'furnace-manual': 'Furnace Installation & Service Manual',
    'ac-manual': 'Air Conditioner Service Manual',
    'heatpump-manual': 'Heat Pump Technical Manual',
    'boiler-manual': 'Boiler Operation Manual',
    'refrigeration-guide': 'Refrigeration Cycle & Troubleshooting Guide',
    'electrical-guide': 'Electrical Systems & Wiring Guide',
    'airflow-guide': 'Airflow & Ductwork Design Guide',
    'safety-guide': 'Safety Procedures & Protocols',
    'preventive-maintenance': 'Preventive Maintenance Schedules',
    'filter-guide': 'Filter Selection & Replacement Guide',
    'seasonal-prep': 'Seasonal Preparation Checklists',
    'troubleshooting-charts': 'Quick Troubleshooting Charts'
  };
  return titles[contentType] || 'Reference Document';
}

function getContentHTML(contentType, type) {
  // Load content from hvac-knowledge-base.js if available
  if (typeof window.hvacKnowledgeBase !== 'undefined' && window.hvacKnowledgeBase[contentType]) {
    return formatReferenceContent(window.hvacKnowledgeBase[contentType]);
  }
  
  // Fallback content
  return getDefaultContent(contentType, type);
}

function formatReferenceContent(content) {
  if (typeof content === 'string') {
    return `<div class="guide-section"><p>${content}</p></div>`;
  }
  
  let html = '';
  for (const [section, data] of Object.entries(content)) {
    html += `<div class="guide-section">`;
    html += `<h3>${section.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</h3>`;
    
    if (Array.isArray(data)) {
      html += '<ul>';
      data.forEach(item => {
        html += `<li>${item}</li>`;
      });
      html += '</ul>';
    } else if (typeof data === 'object') {
      for (const [key, value] of Object.entries(data)) {
        html += `<h4>${key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</h4>`;
        if (Array.isArray(value)) {
          html += '<ul>';
          value.forEach(item => {
            html += `<li>${item}</li>`;
          });
          html += '</ul>';
        } else {
          html += `<p>${value}</p>`;
        }
      }
    } else {
      html += `<p>${data}</p>`;
    }
    
    html += '</div>';
  }
  
  return html;
}

function getDefaultContent(contentType, type) {
  const defaultContents = {
    'furnace-manual': `
      <div class="guide-section">
        <h3>Installation Guidelines</h3>
        <ul>
          <li>Ensure proper clearances around unit</li>
          <li>Check gas line connections for leaks</li>
          <li>Verify electrical connections</li>
          <li>Test safety controls</li>
        </ul>
      </div>
      <div class="guide-section">
        <h3>Maintenance Procedures</h3>
        <ul>
          <li>Replace air filters regularly</li>
          <li>Clean heat exchanger annually</li>
          <li>Inspect venting system</li>
          <li>Lubricate blower motor</li>
        </ul>
      </div>
    `,
    'safety-guide': `
      <div class="guide-section">
        <h3>General Safety Procedures</h3>
        <ul>
          <li>Always turn off power before servicing</li>
          <li>Use proper personal protective equipment</li>
          <li>Follow lockout/tagout procedures</li>
          <li>Never bypass safety controls</li>
        </ul>
      </div>
      <div class="guide-section">
        <h3>Gas Safety</h3>
        <ul>
          <li>Check for gas leaks with approved detector</li>
          <li>Never use open flames near gas lines</li>
          <li>Ensure proper ventilation</li>
          <li>Know emergency shutdown procedures</li>
        </ul>
      </div>
    `
  };
  
  return defaultContents[contentType] || `
    <div class="manual-content">
      <div class="manual-placeholder">
        <i class="fas fa-file-alt" style="font-size: 3rem; color: #cbd5e0; margin-bottom: 15px;"></i>
        <p>Reference document content will be available here.</p>
        <p>Upload your ${type} documents to access them in the reference library.</p>
      </div>
    </div>
  `;
}

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
  // Load knowledge base
  loadKnowledgeBase();
  
  // Load HVAC knowledge base for reference library
  const script = document.createElement('script');
  script.src = 'js/hvac-knowledge-base.js';
  script.onload = () => {
    console.log('HVAC Knowledge Base loaded for reference library');
  };
  document.head.appendChild(script);
});  
  // Add reference modal close functionality
  if (referenceModal) {
    referenceModal.addEventListener('click', (e) => {
      if (e.target === referenceModal) {
        closeReferenceModal();
      }
    });
  }
});}