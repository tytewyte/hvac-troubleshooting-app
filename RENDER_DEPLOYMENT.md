# Render Deployment Guide

## Overview

This guide provides specific instructions for deploying the HVAC Troubleshooting App to Render.com, a cloud platform that offers free and paid hosting options for web applications.

## Prerequisites

- A [Render account](https://render.com)
- Your application code in a GitHub repository
- A MongoDB database (either through Render or MongoDB Atlas)

## Deployment Steps

### 1. Connect Your GitHub Repository

1. Sign in to your Render account
2. Click on "New" and select "Web Service"
3. Connect your GitHub account if you haven't already
4. Select the repository containing your HVAC Troubleshooting App

### 2. Configure Your Web Service

1. **Service Name**: Choose a name for your service (e.g., "hvac-troubleshooting-app")
2. **Runtime**: Select "Node"
3. **Branch**: Choose the branch to deploy (usually "main")
4. **Build Command**: `npm install`
5. **Start Command**: `npm start`
6. **Plan**: Select the appropriate plan (Free tier is available for testing)

### 3. Set Environment Variables

In the "Environment" section, add the following variables:

```
NODE_ENV=production
PORT=10000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
SESSION_SECRET=your_session_secret
```

### 4. Set Up MongoDB

#### Option A: Use Render's MongoDB Service

1. Create a new MongoDB database in Render
   - Go to "New" → "Database"
   - Select "MongoDB"
   - Choose a name and plan
   - Note the connection details provided

2. Update your `MONGODB_URI` environment variable with the connection string

#### Option B: Use MongoDB Atlas

1. Create a cluster in [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Configure network access to allow connections from anywhere (or specifically from Render's IP ranges)
3. Create a database user with appropriate permissions
4. Get your connection string and update the `MONGODB_URI` environment variable

### 5. Deploy Your Application

1. Click "Create Web Service"
2. Render will automatically build and deploy your application
3. Once deployment is complete, you can access your application at the provided URL

### 6. Set Up Automatic Deployments

Render automatically deploys when you push to your connected GitHub repository. You can configure this behavior in the "Settings" tab of your web service.

### 7. Custom Domains (Optional)

1. Go to the "Settings" tab of your web service
2. Scroll to "Custom Domain"
3. Click "Add Custom Domain"
4. Follow the instructions to configure your domain's DNS settings

## Using the Blueprint Specification

This project includes a `render.yaml` file that defines the infrastructure needed to run the application. If you fork this repository, you can use the "Blueprint" deployment option in Render to automatically configure all services.

1. Go to the Render Dashboard
2. Click "New" → "Blueprint"
3. Select your repository
4. Render will detect the `render.yaml` file and configure the services accordingly

## Troubleshooting

### Application Crashes

If your application crashes after deployment:

1. Check the logs in the Render dashboard
2. Verify that all environment variables are set correctly
3. Ensure your MongoDB connection string is correct and the database is accessible

### Long Build Times

If your builds are taking too long:

1. Consider optimizing your npm dependencies
2. Use a `.npmrc` file with `save-exact=true` to prevent npm from resolving versions

### Memory Issues

If your application is running out of memory:

1. Consider upgrading to a paid plan with more resources
2. Optimize your application to use less memory

## Additional Resources

- [Render Documentation](https://render.com/docs)
- [Render Node.js Guide](https://render.com/docs/deploy-node-express-app)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)