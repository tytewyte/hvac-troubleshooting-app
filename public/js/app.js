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

// Reference Library Elements
const referenceModal = document.getElementById('reference-modal');
const referenceTitle = document.getElementById('reference-title');
const referenceContent = document.getElementById('reference-content');
const uploadModal = document.getElementById('upload-modal');
const manageManualsModal = document.getElementById('manage-manuals-modal');
const uploadReferenceBtn = document.getElementById('upload-reference');
const downloadAllBtn = document.getElementById('download-all');
const printLibraryBtn = document.getElementById('print-library');
const downloadReferenceBtn = document.getElementById('download-reference');
const printReferenceBtn = document.getElementById('print-reference');
const closeReferenceBtn = document.getElementById('close-reference');
const uploadSubmitBtn = document.getElementById('upload-submit');
const uploadCancelBtn = document.getElementById('upload-cancel');
const closeManualsBtn = document.getElementById('close-manage');
const manualFileInput = document.getElementById('manual-file');
const filePreview = document.getElementById('file-preview');
const fileUploadArea = document.querySelector('.file-upload-area');
const gridViewBtn = document.getElementById('grid-view');
const listViewBtn = document.getElementById('list-view');
const manualSearch = document.getElementById('manual-search');
const categoryFilter = document.getElementById('category-filter');
const manualsContainer = document.getElementById('manuals-container');
const noManualsDiv = document.getElementById('no-manuals');

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
if (startTroubleshootingBtn) {
  startTroubleshootingBtn.addEventListener('click', () => {
    // Navigate to troubleshooting page
    navLinks.forEach(navLink => navLink.classList.remove('active'));
    const troubleshootLink = document.querySelector('nav a[data-page="troubleshoot"]');
    if (troubleshootLink) {
      troubleshootLink.classList.add('active');
    }
    
    pages.forEach(page => {
      if (page.id === 'troubleshoot-page') {
        page.classList.add('active');
      } else {
        page.classList.remove('active');
      }
    });
  });
}

// Load Knowledge Base
async function loadKnowledgeBase() {
  try {
    const response = await fetch('/api/knowledge-base');
    if (response.ok) {
      const data = await response.json();
      displayKnowledgeCategories(data.categories);
    } else {
      console.error('Failed to load knowledge base');
      displayKnowledgeCategories({
        'Heating Systems': {
          'Furnaces': {},
          'Boilers': {},
          'Heat Pumps': {},
          'Radiant Heating': {}
        },
        'Cooling Systems': {
          'Central Air': {},
          'Heat Pumps': {},
          'Ductless Mini-Splits': {},
          'Window Units': {}
        },
        'Ventilation': {
          'Exhaust Fans': {},
          'Air Exchangers': {},
          'Ductwork': {},
          'Air Quality': {}
        }
      });
    }
  } catch (error) {
    console.error('Error loading knowledge base:', error);
    displayKnowledgeCategories({
      'Heating Systems': {
        'Furnaces': {},
        'Boilers': {},
        'Heat Pumps': {},
        'Radiant Heating': {}
      },
      'Cooling Systems': {
        'Central Air': {},
        'Heat Pumps': {},
        'Ductless Mini-Splits': {},
        'Window Units': {}
      },
      'Ventilation': {
        'Exhaust Fans': {},
        'Air Exchangers': {},
        'Ductwork': {},
        'Air Quality': {}
      }
    });
  }
}

function displayKnowledgeCategories(categories) {
  const knowledgeGrid = document.querySelector('.knowledge-grid');
  if (!knowledgeGrid) return;
  
  knowledgeGrid.innerHTML = '';
  
  Object.entries(categories).forEach(([category, subcategories]) => {
    const categoryCard = document.createElement('div');
    categoryCard.className = 'category-card';
    categoryCard.innerHTML = `
      <div class="category-icon">
        <i class="fas ${getCategoryIcon(category)}"></i>
      </div>
      <h3>${category}</h3>
      <p>${Object.keys(subcategories).length} subcategories</p>
    `;
    
    categoryCard.addEventListener('click', () => {
      displayCategoryContent(category, subcategories);
    });
    
    knowledgeGrid.appendChild(categoryCard);
  });
}

function getCategoryIcon(category) {
  const icons = {
    'Heating Systems': 'fa-fire',
    'Cooling Systems': 'fa-snowflake',
    'Ventilation': 'fa-wind',
    'Electrical': 'fa-bolt',
    'Maintenance': 'fa-tools'
  };
  return icons[category] || 'fa-cog';
}

function displayCategoryContent(category, subcategories) {
  const knowledgeGrid = document.querySelector('.knowledge-grid');
  if (!knowledgeGrid) return;
  
  knowledgeGrid.innerHTML = `
    <div class="category-header">
      <button class="back-btn" onclick="loadKnowledgeBase()">
        <i class="fas fa-arrow-left"></i> Back to Categories
      </button>
      <h2>${category}</h2>
    </div>
  `;
  
  Object.entries(subcategories).forEach(([subcategory, content]) => {
    const subcategoryCard = document.createElement('div');
    subcategoryCard.className = 'subcategory-card';
    subcategoryCard.innerHTML = `
      <h3>${subcategory}</h3>
      <p>Click to view detailed information</p>
    `;
    
    subcategoryCard.addEventListener('click', () => {
      loadProfessionalContent(subcategory);
    });
    
    knowledgeGrid.appendChild(subcategoryCard);
  });
}

async function loadProfessionalContent(subcategory) {
  const knowledgeGrid = document.querySelector('.knowledge-grid');
  if (!knowledgeGrid) return;
  
  knowledgeGrid.innerHTML = `
    <div class="loading-content">
      <i class="fas fa-spinner fa-spin"></i>
      <p>Loading ${subcategory} information...</p>
    </div>
  `;
  
  try {
    const response = await fetch(`/api/knowledge-base/${encodeURIComponent(subcategory)}`);
    if (response.ok) {
      const data = await response.json();
      displayDetailedContent(subcategory, data);
    } else {
      displayPlaceholderContent(subcategory);
    }
  } catch (error) {
    console.error('Error loading content:', error);
    displayPlaceholderContent(subcategory);
  }
}

function displayPlaceholderContent(subcategory) {
  const knowledgeGrid = document.querySelector('.knowledge-grid');
  if (!knowledgeGrid) return;
  
  knowledgeGrid.innerHTML = `
    <div class="content-header">
      <button class="back-btn" onclick="loadKnowledgeBase()">
        <i class="fas fa-arrow-left"></i> Back to Categories
      </button>
      <h2>${subcategory}</h2>
    </div>
    <div class="professional-content">
      <div class="content-placeholder">
        <i class="fas fa-info-circle" style="font-size: 3rem; color: #0077cc; margin-bottom: 15px;"></i>
        <h3>Professional Content Available</h3>
        <p>Detailed technical information for ${subcategory} is available to certified HVAC professionals.</p>
        <p>This content includes:</p>
        <ul>
          <li>Technical specifications and requirements</li>
          <li>Installation and maintenance procedures</li>
          <li>Troubleshooting guides and diagnostic charts</li>
          <li>Safety protocols and best practices</li>
          <li>Code compliance information</li>
        </ul>
        <div class="professional-note">
          <strong>Note:</strong> Some content requires professional certification to access.
        </div>
      </div>
    </div>
  `;
}

function displayDetailedContent(subcategory, data) {
  const knowledgeGrid = document.querySelector('.knowledge-grid');
  if (!knowledgeGrid) return;
  
  let contentHTML = `
    <div class="content-header">
      <button class="back-btn" onclick="loadKnowledgeBase()">
        <i class="fas fa-arrow-left"></i> Back to Categories
      </button>
      <h2>${subcategory}</h2>
    </div>
    <div class="detailed-content">
  `;
  
  if (data.overview) {
    contentHTML += `<div class="content-section"><h3>Overview</h3><p>${data.overview}</p></div>`;
  }
  
  if (data.specifications) {
    contentHTML += `<div class="content-section"><h3>Specifications</h3><ul>`;
    data.specifications.forEach(spec => {
      contentHTML += `<li>${spec}</li>`;
    });
    contentHTML += `</ul></div>`;
  }
  
  if (data.maintenance) {
    contentHTML += `<div class="content-section"><h3>Maintenance</h3><ul>`;
    data.maintenance.forEach(item => {
      contentHTML += `<li>${item}</li>`;
    });
    contentHTML += `</ul></div>`;
  }
  
  contentHTML += `</div>`;
  knowledgeGrid.innerHTML = contentHTML;
}

// Troubleshooting Form
if (submitIssueBtn) {
  submitIssueBtn.addEventListener('click', async () => {
    const systemType = document.getElementById('system-type')?.value;
    const issueDescription = document.getElementById('issue-description')?.value;
    const symptoms = Array.from(document.querySelectorAll('input[name="symptoms"]:checked')).map(cb => cb.value);
    
    if (!systemType || !issueDescription) {
      alert('Please fill in all required fields.');
      return;
    }
    
    // Show loading state
    aiResponseSection.style.display = 'block';
    responseContent.innerHTML = `
      <div class="loading-response">
        <i class="fas fa-spinner fa-spin"></i>
        <p>Analyzing your HVAC issue...</p>
      </div>
    `;
    
    try {
      const response = await fetch('/api/troubleshoot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          systemType,
          issue: issueDescription,
          symptoms
        })
      });
      
      if (response.ok) {
        const data = await response.json();
        displayAIResponse(data.response);
      } else {
        displaySampleResponse(systemType, issueDescription, symptoms);
      }
    } catch (error) {
      console.error('Error submitting issue:', error);
      displaySampleResponse(systemType, issueDescription, symptoms);
    }
  });
}

function displaySampleResponse(systemType, issue, symptoms) {
  const sampleResponses = {
    'furnace': {
      'no-heat': {
        diagnosis: 'Based on your symptoms, this appears to be a common furnace issue.',
        steps: [
          'Check thermostat settings and batteries',
          'Verify power supply to the furnace',
          'Inspect air filter for clogs',
          'Check pilot light or ignition system',
          'Examine gas supply (if applicable)'
        ],
        safety: 'Always turn off power before inspecting. If you smell gas, leave immediately and call your gas company.',
        professional: 'If these steps don\'t resolve the issue, contact a certified HVAC technician.'
      }
    },
    'ac': {
      'no-cooling': {
        diagnosis: 'Air conditioning not cooling can have several causes.',
        steps: [
          'Check thermostat settings',
          'Replace or clean air filter',
          'Check circuit breakers',
          'Inspect outdoor unit for debris',
          'Verify refrigerant levels (professional required)'
        ],
        safety: 'Never attempt to handle refrigerant. This requires professional certification.',
        professional: 'Refrigerant issues require a licensed HVAC technician.'
      }
    }
  };
  
  const systemResponses = sampleResponses[systemType] || sampleResponses['furnace'];
  const response = systemResponses['no-heat'] || systemResponses[Object.keys(systemResponses)[0]];
  
  responseContent.innerHTML = `
    <div class="ai-response-content">
      <div class="response-header">
        <i class="fas fa-robot"></i>
        <h3>AI Troubleshooting Assistant</h3>
      </div>
      
      <div class="diagnosis-section">
        <h4><i class="fas fa-search"></i> Diagnosis</h4>
        <p>${response.diagnosis}</p>
      </div>
      
      <div class="steps-section">
        <h4><i class="fas fa-list-ol"></i> Troubleshooting Steps</h4>
        <ol>
          ${response.steps.map(step => `<li>${step}</li>`).join('')}
        </ol>
      </div>
      
      <div class="safety-section">
        <h4><i class="fas fa-exclamation-triangle"></i> Safety Warning</h4>
        <p>${response.safety}</p>
      </div>
      
      <div class="professional-section">
        <h4><i class="fas fa-user-tie"></i> Professional Recommendation</h4>
        <p>${response.professional}</p>
      </div>
      
      <div class="response-actions">
        <button class="btn btn-secondary" onclick="window.print()">Print Instructions</button>
        <button class="btn btn-primary" onclick="document.getElementById('feedback-modal').style.display = 'block'">Provide Feedback</button>
      </div>
    </div>
  `;
}

function displayAIResponse(response) {
  responseContent.innerHTML = `
    <div class="ai-response-content">
      <div class="response-header">
        <i class="fas fa-robot"></i>
        <h3>AI Troubleshooting Assistant</h3>
      </div>
      <div class="response-text">
        ${response}
      </div>
      <div class="response-actions">
        <button class="btn btn-secondary" onclick="window.print()">Print Instructions</button>
        <button class="btn btn-primary" onclick="document.getElementById('feedback-modal').style.display = 'block'">Provide Feedback</button>
      </div>
    </div>
  `;
}

// Feedback Modal
if (feedbackBtn) {
  feedbackBtn.addEventListener('click', () => {
    feedbackModal.style.display = 'block';
  });
}

// File Upload Functionality
if (manualFileInput) {
  manualFileInput.addEventListener('change', handleFileSelect);
}

if (fileUploadArea) {
  fileUploadArea.addEventListener('dragover', handleDragOver);
  fileUploadArea.addEventListener('dragleave', handleDragLeave);
  fileUploadArea.addEventListener('drop', handleFileDrop);
}

function handleFileSelect(e) {
  const file = e.target.files[0];
  if (file) {
    displayFilePreview(file);
  }
}

function handleDragOver(e) {
  e.preventDefault();
  fileUploadArea.classList.add('dragover');
}

function handleDragLeave(e) {
  e.preventDefault();
  fileUploadArea.classList.remove('dragover');
}

function handleFileDrop(e) {
  e.preventDefault();
  fileUploadArea.classList.remove('dragover');
  
  const files = e.dataTransfer.files;
  if (files.length > 0) {
    manualFileInput.files = files;
    displayFilePreview(files[0]);
  }
}

function displayFilePreview(file) {
  const fileName = document.getElementById('file-name');
  const fileSize = document.getElementById('file-size');
  const fileInfo = document.querySelector('.file-upload-info');
  
  if (fileName && fileSize) {
    fileName.textContent = file.name;
    fileSize.textContent = formatFileSize(file.size);
    filePreview.classList.remove('hidden');
    fileInfo.style.display = 'none';
  }
}

function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Upload Modal Event Listeners
if (uploadSubmitBtn) {
  uploadSubmitBtn.addEventListener('click', handleManualUpload);
}

if (uploadCancelBtn) {
  uploadCancelBtn.addEventListener('click', () => {
    uploadModal.style.display = 'none';
    resetUploadForm();
  });
}

function handleManualUpload() {
  const form = document.getElementById('upload-form');
  const formData = new FormData(form);
  
  const title = formData.get('title');
  const category = formData.get('category');
  const subcategory = formData.get('subcategory') || '';
  const description = formData.get('description') || '';
  const isPublic = formData.get('public') === 'on';
  const file = manualFileInput.files[0];
  
  if (!title || !category || !file) {
    alert('Please fill in all required fields and select a file.');
    return;
  }
  
  if (file.size > 10 * 1024 * 1024) { // 10MB limit
    alert('File size must be less than 10MB.');
    return;
  }
  
  // Convert file to base64 for storage
  const reader = new FileReader();
  reader.onload = function(e) {
    const manual = {
      title,
      category,
      subcategory,
      description,
      isPublic,
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
      fileData: e.target.result
    };
    
    manualStorage.addManual(manual);
    uploadModal.style.display = 'none';
    resetUploadForm();
    alert('Manual uploaded successfully!');
  };
  
  reader.readAsDataURL(file);
}

function resetUploadForm() {
  document.getElementById('upload-form').reset();
  filePreview.classList.add('hidden');
  document.querySelector('.file-upload-info').style.display = 'block';
}

// Manual Management Event Listeners
if (closeManualsBtn) {
  closeManualsBtn.addEventListener('click', () => {
    manageManualsModal.style.display = 'none';
  });
}

if (gridViewBtn && listViewBtn) {
  gridViewBtn.addEventListener('click', () => {
    gridViewBtn.classList.add('active');
    listViewBtn.classList.remove('active');
    manualsContainer.className = 'manuals-grid';
    displayManuals();
  });
  
  listViewBtn.addEventListener('click', () => {
    listViewBtn.classList.add('active');
    gridViewBtn.classList.remove('active');
    manualsContainer.className = 'manuals-list';
    displayManuals();
  });
}

if (manualSearch) {
  manualSearch.addEventListener('input', displayManuals);
}

if (categoryFilter) {
  categoryFilter.addEventListener('change', displayManuals);
}

function displayManuals() {
  const search = manualSearch ? manualSearch.value : '';
  const category = categoryFilter ? categoryFilter.value : '';
  const manuals = manualStorage.getManuals(category, search);
  const isGridView = manualsContainer.classList.contains('manuals-grid');
  
  if (manuals.length === 0) {
    manualsContainer.style.display = 'none';
    noManualsDiv.classList.remove('hidden');
    return;
  }
  
  manualsContainer.style.display = isGridView ? 'grid' : 'flex';
  noManualsDiv.classList.add('hidden');
  
  manualsContainer.innerHTML = manuals.map(manual => 
    isGridView ? createManualCard(manual) : createManualListItem(manual)
  ).join('');
}

function createManualCard(manual) {
  const uploadDate = new Date(manual.uploadDate).toLocaleDateString();
  return `
    <div class="manual-card" data-id="${manual.id}">
      <div class="manual-card-header">
        <i class="fas fa-file-pdf manual-icon"></i>
        <div class="manual-info">
          <div class="manual-title">${manual.title}</div>
          <span class="manual-category">${manual.category.replace('-', ' ')}</span>
        </div>
      </div>
      <div class="manual-description">${manual.description}</div>
      <div class="manual-meta">
        <span>Uploaded: ${uploadDate}</span>
        <div class="manual-actions">
          <button class="btn btn-small" onclick="downloadManual('${manual.id}')">
            <i class="fas fa-download"></i>
          </button>
          <button class="btn btn-small" onclick="viewManual('${manual.id}')">
            <i class="fas fa-eye"></i>
          </button>
          <button class="btn btn-small btn-danger" onclick="deleteManual('${manual.id}')">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
    </div>
  `;
}

function createManualListItem(manual) {
  const uploadDate = new Date(manual.uploadDate).toLocaleDateString();
  return `
    <div class="manual-list-item" data-id="${manual.id}">
      <i class="fas fa-file-pdf manual-list-icon"></i>
      <div class="manual-list-info">
        <div class="manual-list-title">${manual.title}</div>
        <div class="manual-list-meta">
          ${manual.category.replace('-', ' ')} • ${uploadDate} • ${formatFileSize(manual.fileSize)}
        </div>
      </div>
      <div class="manual-list-actions">
        <button class="btn btn-small" onclick="downloadManual('${manual.id}')">
          <i class="fas fa-download"></i>
        </button>
        <button class="btn btn-small" onclick="viewManual('${manual.id}')">
          <i class="fas fa-eye"></i>
        </button>
        <button class="btn btn-small btn-danger" onclick="deleteManual('${manual.id}')">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    </div>
  `;
}

// Manual Actions
function downloadManual(id) {
  const manual = manualStorage.manuals.find(m => m.id === id);
  if (manual) {
    const link = document.createElement('a');
    link.href = manual.fileData;
    link.download = manual.fileName;
    link.click();
  }
}

function viewManual(id) {
  const manual = manualStorage.manuals.find(m => m.id === id);
  if (manual) {
    if (manual.fileType === 'application/pdf') {
      window.open(manual.fileData, '_blank');
    } else {
      downloadManual(id);
    }
  }
}

function deleteManual(id) {
  if (confirm('Are you sure you want to delete this manual?')) {
    manualStorage.deleteManual(id);
    displayManuals();
  }
}

modalCloseButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = button.closest('.modal');
    if (modal) {
      modal.style.display = 'none';
      if (modal === uploadModal) {
        resetUploadForm();
      }
    }
  });
});

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal')) {
    e.target.style.display = 'none';
    if (e.target === uploadModal) {
      resetUploadForm();
    }
  }
});

if (feedbackForm) {
  feedbackForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(feedbackForm);
    const feedbackData = {
      rating: formData.get('rating'),
      comments: formData.get('comments'),
      email: formData.get('email')
    };
    
    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(feedbackData)
      });
      
      if (response.ok) {
        feedbackForm.style.display = 'none';
        feedbackSuccess.style.display = 'block';
        setTimeout(() => {
          feedbackModal.style.display = 'none';
          feedbackForm.style.display = 'block';
          feedbackSuccess.style.display = 'none';
          feedbackForm.reset();
        }, 3000);
      } else {
        alert('Failed to submit feedback. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('Failed to submit feedback. Please try again.');
    }
  });
}

// Manual Storage System
class ManualStorage {
  constructor() {
    this.storageKey = 'hvac_manuals';
    this.manuals = this.loadManuals();
  }

  loadManuals() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading manuals:', error);
      return [];
    }
  }

  saveManuals() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.manuals));
    } catch (error) {
      console.error('Error saving manuals:', error);
    }
  }

  addManual(manual) {
    manual.id = Date.now().toString();
    manual.uploadDate = new Date().toISOString();
    this.manuals.push(manual);
    this.saveManuals();
    return manual;
  }

  deleteManual(id) {
    this.manuals = this.manuals.filter(manual => manual.id !== id);
    this.saveManuals();
  }

  getManuals(category = '', search = '') {
    let filtered = this.manuals;
    
    if (category) {
      filtered = filtered.filter(manual => manual.category === category);
    }
    
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(manual => 
        manual.title.toLowerCase().includes(searchLower) ||
        manual.description.toLowerCase().includes(searchLower) ||
        manual.subcategory.toLowerCase().includes(searchLower)
      );
    }
    
    return filtered;
  }
}

const manualStorage = new ManualStorage();

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
    uploadModal.style.display = 'block';
  });
}

if (downloadAllBtn) {
  downloadAllBtn.addEventListener('click', () => {
    manageManualsModal.style.display = 'block';
    displayManuals();
  });
}

if (printLibraryBtn) {
  printLibraryBtn.addEventListener('click', () => {
    manageManualsModal.style.display = 'block';
    displayManuals();
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
  
  // Add reference modal close functionality
  if (referenceModal) {
    referenceModal.addEventListener('click', (e) => {
      if (e.target === referenceModal) {
        closeReferenceModal();
      }
    });
  }
});