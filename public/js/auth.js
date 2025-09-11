// Auth Module for HVAC Troubleshooting App

// DOM Elements
const loginBtn = document.getElementById('login-btn');
const registerBtn = document.getElementById('register-btn');
const logoutBtn = document.getElementById('logout-btn');
const userProfile = document.getElementById('user-profile');
const usernameDisplay = document.getElementById('username');
const loginModal = document.getElementById('login-modal');
const registerModal = document.getElementById('register-modal');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const closeButtons = document.querySelectorAll('.close');

// Auth State
let authToken = localStorage.getItem('token');
let currentUser = JSON.parse(localStorage.getItem('user'));

// Check if user is logged in
function checkAuthState() {
  if (authToken && currentUser) {
    // User is logged in
    loginBtn.classList.add('hidden');
    registerBtn.classList.add('hidden');
    userProfile.classList.remove('hidden');
    usernameDisplay.textContent = currentUser.username;
    
    // Update history page
    document.querySelector('.no-history').classList.add('hidden');
    loadUserHistory();
  } else {
    // User is not logged in
    loginBtn.classList.remove('hidden');
    registerBtn.classList.remove('hidden');
    userProfile.classList.add('hidden');
    
    // Update history page
    document.querySelector('.no-history').classList.remove('hidden');
    document.querySelector('.history-list').innerHTML = '<p class="no-history">Login to view your troubleshooting history.</p>';
  }
}

// Load user history
async function loadUserHistory() {
  if (!authToken) return;
  
  try {
    const response = await fetch('/auth/me', {
      headers: {
        'x-auth-token': authToken
      }
    });
    
    if (response.ok) {
      const userData = await response.json();
      
      // Display history if available
      const historyList = document.querySelector('.history-list');
      
      if (userData.troubleshootingHistory && userData.troubleshootingHistory.length > 0) {
        historyList.innerHTML = '';
        
        userData.troubleshootingHistory.forEach(item => {
          const historyItem = document.createElement('div');
          historyItem.className = 'history-item';
          
          const date = new Date(item.timestamp);
          const formattedDate = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
          
          historyItem.innerHTML = `
            <div class="history-item-header">
              <h3>${item.systemType || 'HVAC System'}</h3>
              <span class="history-date">${formattedDate}</span>
            </div>
            <p><strong>Issue:</strong> ${item.issue}</p>
            ${item.symptoms && item.symptoms.length > 0 ? 
              `<p><strong>Symptoms:</strong> ${item.symptoms.join(', ')}</p>` : ''}
            <div class="response-content">
              <strong>AI Response:</strong>
              <p>${item.aiResponse}</p>
            </div>
          `;
          
          historyList.appendChild(historyItem);
        });
      } else {
        historyList.innerHTML = '<p>No troubleshooting history found.</p>';
      }
    }
  } catch (error) {
    console.error('Error loading user history:', error);
  }
}

// Event Listeners
loginBtn.addEventListener('click', () => {
  loginModal.classList.remove('hidden');
});

registerBtn.addEventListener('click', () => {
  registerModal.classList.remove('hidden');
});

logoutBtn.addEventListener('click', () => {
  // Clear auth data
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  authToken = null;
  currentUser = null;
  
  // Update UI
  checkAuthState();
});

closeButtons.forEach(button => {
  button.addEventListener('click', () => {
    loginModal.classList.add('hidden');
    registerModal.classList.add('hidden');
  });
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
  if (e.target === loginModal) {
    loginModal.classList.add('hidden');
  }
  if (e.target === registerModal) {
    registerModal.classList.add('hidden');
  }
});

// Login Form Submission
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  
  try {
    const response = await fetch('/.netlify/functions/auth-login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });
    
    const data = await response.json();
    
    if (response.ok) {
      // Store auth token
      localStorage.setItem('token', data.token);
      authToken = data.token;
      
      // Get user data
      const userResponse = await fetch('/auth/me', {
        headers: {
          'x-auth-token': authToken
        }
      });
      
      if (userResponse.ok) {
        const userData = await userResponse.json();
        localStorage.setItem('user', JSON.stringify(userData));
        currentUser = userData;
        
        // Update UI
        checkAuthState();
        loginModal.classList.add('hidden');
        loginForm.reset();
      }
    } else {
      alert(data.message || 'Login failed');
    }
  } catch (error) {
    console.error('Login error:', error);
    alert('Login failed. Please try again.');
  }
});

// Register Form Submission
registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const username = document.getElementById('register-username').value;
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;
  const confirmPassword = document.getElementById('register-confirm-password').value;
  
  // Validate passwords match
  if (password !== confirmPassword) {
    alert('Passwords do not match');
    return;
  }
  
  try {
    const response = await fetch('/.netlify/functions/auth-register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, email, password })
    });
    
    const data = await response.json();
    
    if (response.ok) {
      // Store auth token
      localStorage.setItem('token', data.token);
      authToken = data.token;
      
      // Get user data
      const userResponse = await fetch('/auth/me', {
        headers: {
          'x-auth-token': authToken
        }
      });
      
      if (userResponse.ok) {
        const userData = await userResponse.json();
        localStorage.setItem('user', JSON.stringify(userData));
        currentUser = userData;
        
        // Update UI
        checkAuthState();
        registerModal.classList.add('hidden');
        registerForm.reset();
      }
    } else {
      alert(data.message || 'Registration failed');
    }
  } catch (error) {
    console.error('Registration error:', error);
    alert('Registration failed. Please try again.');
  }
});

// Initialize auth state
document.addEventListener('DOMContentLoaded', checkAuthState);