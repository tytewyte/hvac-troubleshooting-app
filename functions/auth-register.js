// Mock user storage (in production, use a database)
// Using global storage to persist across function calls
global.users = global.users || []

exports.handler = async (event, context) => {
  // Handle CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  }

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' }
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ message: 'Method not allowed' })
    }
  }

  try {
    const { username, email, password } = JSON.parse(event.body || '{}')
    
    if (!username || !email || !password) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ message: 'Missing required fields' })
      }
    }

    // Check if user already exists
    const existingUser = global.users.find(u => u.email === email)
    if (existingUser) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ message: 'User already exists' })
      }
    }

    // Create new user
    const user = {
      id: Date.now().toString(),
      username,
      email,
      password, // In production, hash this password
      troubleshootingHistory: []
    }

    global.users.push(user)

    // Generate mock token
    const token = `token_${user.id}_${Date.now()}`

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        token,
        user: { id: user.id, username: user.username, email: user.email }
      })
    }
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ message: 'Server error' })
    }
  }
}
