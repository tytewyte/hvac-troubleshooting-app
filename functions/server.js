const express = require('express')
const cors = require('cors')

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Mock user storage (in production, use a database)
const users = []

// Register endpoint
app.post('/auth/register', (req, res) => {
  const { username, email, password } = req.body
  
  // Check if user already exists
  const existingUser = users.find(u => u.email === email)
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' })
  }
  
  // Create new user
  const user = {
    id: Date.now().toString(),
    username,
    email,
    password, // In production, hash this password
    troubleshootingHistory: []
  }
  
  users.push(user)
  
  // Generate mock token
  const token = `token_${user.id}_${Date.now()}`
  
  res.json({ 
    token,
    user: { id: user.id, username: user.username, email: user.email }
  })
})

// Login endpoint
app.post('/auth/login', (req, res) => {
  const { email, password } = req.body
  
  // Find user
  const user = users.find(u => u.email === email && u.password === password)
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' })
  }
  
  // Generate mock token
  const token = `token_${user.id}_${Date.now()}`
  
  res.json({ 
    token,
    user: { id: user.id, username: user.username, email: user.email }
  })
})

// Get user profile
app.get('/auth/me', (req, res) => {
  const token = req.headers['x-auth-token']
  if (!token) {
    return res.status(401).json({ message: 'No token provided' })
  }
  
  // Extract user ID from token (mock implementation)
  const userId = token.split('_')[1]
  const user = users.find(u => u.id === userId)
  
  if (!user) {
    return res.status(401).json({ message: 'Invalid token' })
  }
  
  res.json({
    id: user.id,
    username: user.username,
    email: user.email,
    troubleshootingHistory: user.troubleshootingHistory || []
  })
})

// Troubleshoot endpoint
app.post('/api/troubleshoot', (req, res) => {
  const { systemType, issue, symptoms } = req.body
  
  // Mock AI response
  const response = `Based on your ${systemType} issue: "${issue}", here are the recommended troubleshooting steps:
  
1. Check power supply and circuit breakers
2. Inspect air filters for clogs or dirt
3. Verify thermostat settings and batteries
4. Examine outdoor unit for debris (if applicable)
5. Check for proper airflow through vents

Safety Warning: Always turn off power before inspecting electrical components. If you smell gas, leave immediately and call your gas company.

If these steps don't resolve the issue, contact a certified HVAC technician.`

  res.json({ response })
})

// Netlify function handler
exports.handler = async (event, context) => {
  return new Promise((resolve, reject) => {
    const req = {
      method: event.httpMethod,
      url: event.path,
      headers: event.headers,
      body: event.body ? JSON.parse(event.body) : {}
    }
    
    const res = {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, x-auth-token',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
      },
      body: '',
      json: (data) => {
        res.body = JSON.stringify(data)
        resolve(res)
      },
      status: (code) => {
        res.statusCode = code
        return res
      }
    }
    
    // Handle CORS preflight
    if (event.httpMethod === 'OPTIONS') {
      resolve(res)
      return
    }
    
    // Route the request
    if (event.path.includes('/auth/register') && event.httpMethod === 'POST') {
      app._router.handle(req, res)
    } else if (event.path.includes('/auth/login') && event.httpMethod === 'POST') {
      app._router.handle(req, res)
    } else if (event.path.includes('/auth/me') && event.httpMethod === 'GET') {
      app._router.handle(req, res)
    } else if (event.path.includes('/api/troubleshoot') && event.httpMethod === 'POST') {
      app._router.handle(req, res)
    } else {
      res.status(404).json({ message: 'Not found' })
    }
  })
}
