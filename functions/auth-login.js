// Mock user storage (in production, use a database)
let users = []

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
    const { email, password } = JSON.parse(event.body)

    // Find user
    const user = users.find(u => u.email === email && u.password === password)
    if (!user) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ message: 'Invalid credentials' })
      }
    }

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
