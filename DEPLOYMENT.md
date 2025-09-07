# HVAC Troubleshooting App Deployment Guide

This guide provides instructions for deploying your HVAC Troubleshooting App to make it publicly accessible.

## Prerequisites

- Node.js and npm installed
- MongoDB database (local or cloud-based)
- Basic understanding of server deployment

## Deployment Options

### Option 1: Deploy to a VPS (Virtual Private Server)

1. **Set up a VPS** with providers like DigitalOcean, Linode, AWS EC2, etc.

2. **Install Node.js and MongoDB** on your server

3. **Clone your repository** to the server

4. **Configure environment variables**:
   - Create a `.env` file based on `.env.example`
   - Update the following variables for production:
     ```
     NODE_ENV=production
     PORT=80 (or your preferred port)
     MONGODB_URI=your_production_mongodb_uri
     JWT_SECRET=a_strong_random_string
     SESSION_SECRET=another_strong_random_string
     ```
   - For LM Studio configuration, you'll need to ensure it's accessible or replace with another AI service

5. **Install dependencies**:
   ```
   npm install
   ```

6. **Use a process manager** like PM2 to keep your app running:
   ```
   npm install -g pm2
   pm2 start server.js
   ```

7. **Set up a reverse proxy** (recommended) with Nginx or Apache

8. **Configure a domain name** and SSL certificate (using Let's Encrypt)

### Option 2: Deploy to Heroku

1. **Create a Heroku account** and install the Heroku CLI

2. **Create a new Heroku app**:
   ```
   heroku create your-app-name
   ```

3. **Add a MongoDB add-on** or use MongoDB Atlas:
   ```
   heroku addons:create mongodb
   ```
   Or configure the `MONGODB_URI` to point to your MongoDB Atlas instance

4. **Configure environment variables** in Heroku dashboard or using CLI:
   ```
   heroku config:set NODE_ENV=production
   heroku config:set JWT_SECRET=your_jwt_secret
   heroku config:set SESSION_SECRET=your_session_secret
   ```

5. **Deploy your app**:
   ```
   git push heroku main
   ```

6. **Note about LM Studio**: Since Heroku doesn't support running local AI models, you'll need to:
   - Host LM Studio on a separate server and update the `LM_STUDIO_API_URL`
   - Or replace it with a cloud-based AI service

### Option 3: Deploy to Render

1. **Create a Render account** at [render.com](https://render.com) and sign up

2. **Create a new Web Service**:
   - Click "New" and select "Web Service"
   - Connect your GitHub repository
   - Give your service a name
   - Select the branch to deploy (usually `main`)
   - Set the build command: `npm install`
   - Set the start command: `npm start`
   - Select an appropriate instance type (Free tier is available for testing)

3. **Configure environment variables** in the Render dashboard:
   - Go to your web service → Environment
   - Add the following key-value pairs:
     ```
     NODE_ENV=production
     PORT=10000 (Render will automatically use this)
     MONGODB_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     SESSION_SECRET=your_session_secret
     ```

4. **Set up a MongoDB database**:
   - Option A: Use Render's managed MongoDB service
     - Create a new MongoDB database in Render
     - Copy the connection string to your MONGODB_URI environment variable
   - Option B: Use MongoDB Atlas
     - Create a cluster in MongoDB Atlas
     - Configure network access to allow connections from Render
     - Copy the connection string to your MONGODB_URI environment variable

5. **Auto-deploy from GitHub**:
   - Render automatically deploys when you push to your connected GitHub repository
   - You can configure auto-deploy settings in the Render dashboard

6. **Note about LM Studio**: Since Render doesn't support running local AI models, you'll need to:
   - Host LM Studio on a separate server and update the `LM_STUDIO_API_URL`
   - Or replace it with a cloud-based AI service

## Important Security Considerations

1. **Always use strong, unique secrets** for JWT_SECRET and SESSION_SECRET

2. **Enable HTTPS** for production deployments

3. **Implement rate limiting** to prevent abuse

4. **Set secure cookie options** in production:
   ```javascript
   cookie: { secure: true, httpOnly: true, sameSite: 'strict' }
   ```

5. **Regularly update dependencies** to patch security vulnerabilities

## Accessing Your Deployed App

Once deployed, your app will be accessible at:
- VPS: Your domain name or server IP address
- Heroku: https://your-app-name.herokuapp.com
- Other platforms: The URL provided by your hosting service

## Troubleshooting

- **Connection issues**: Check firewall settings and ensure your server is listening on the correct port and interface
- **Database connection errors**: Verify your MongoDB connection string and network access settings
- **LM Studio integration**: Ensure your AI model is properly configured and accessible from your deployed application

## Getting User Feedback

Consider adding one of these options to collect user feedback:

1. **Add a feedback form** to your application
2. **Integrate a service** like Hotjar or UserVoice
3. **Set up analytics** with Google Analytics or similar services
4. **Create a dedicated email address** for user feedback

## Monitoring

Implement monitoring to track application performance and issues:

1. **Use a monitoring service** like New Relic, Datadog, or Sentry
2. **Set up logging** with services like Loggly or Papertrail
3. **Monitor server resources** to ensure adequate capacity