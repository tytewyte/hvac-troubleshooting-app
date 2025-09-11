const server = require('../server')
const { createServer } = require('http')
const { parse } = require('url')

// Create a new HTTP server using the Express app
const app = server
const serverless = createServer(app)

// Netlify function handler
exports.handler = async (event, context) => {
  const url = new URL(event.rawUrl)
  const parsedUrl = parse(url.pathname, true)
  
  // Set up the request and response objects
  const request = {
    method: event.httpMethod,
    url: event.rawUrl,
    headers: event.headers,
    body: event.body,
    path: parsedUrl.pathname,
    query: parsedUrl.query,
    params: event.queryStringParameters || {},
  }

  const response = {
    statusCode: 200,
    headers: {},
    body: '',
    setHeader: (name, value) => {
      response.headers[name] = value
    },
    end: (data) => {
      if (data) {
        response.body = data.toString()
      }
      return response
    },
    writeHead: (statusCode, headers) => {
      response.statusCode = statusCode
      if (headers) {
        response.headers = { ...response.headers, ...headers }
      }
    },
    write: (data) => {
      response.body += data.toString()
    },
  }

  // Create a Promise to handle the server response
  return new Promise((resolve) => {
    // Handle the request using the Express app
    server(request, response, () => {
      // After the Express app has finished processing
      resolve({
        statusCode: response.statusCode,
        headers: response.headers,
        body: response.body,
      })
    })
  })
}
