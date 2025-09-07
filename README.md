# HVAC Troubleshooting Web App

A web application for HVAC troubleshooting with an AI agent powered by Gemma 3 12B using LM Studio. This application prioritizes safety and provides users with accurate troubleshooting assistance.

## Features

- AI-powered troubleshooting assistant using Gemma 3 12B with LM Studio
- Safety-first approach with warnings and disclaimers
- User authentication and session management
- Comprehensive HVAC knowledge base
- Professional HVAC knowledge section with detailed wiring and component information
- Responsive design for mobile and desktop use

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Configure environment variables:
   - Create a `.env` file based on `.env.example`
   - Configure LM Studio API URL (default: http://localhost:1234/v1)

3. Set up LM Studio:
   - Download and install LM Studio from [lmstudio.ai](https://lmstudio.ai/)
   - Download the Gemma 3 12B model in LM Studio
   - Start the local inference server in LM Studio with the Gemma 3 12B model
   - Ensure it's running on http://localhost:1234/v1

4. Install Python dependencies (if using Python components):
   ```
   pip install -r requirements.txt
   ```

5. Start the development server:
   ```
   npm run dev
   ```

6. Open your browser and navigate to `http://localhost:3000`

## Deployment

To make the application publicly accessible, you have several options:

- For general deployment options, refer to the [Deployment Guide](DEPLOYMENT.md)
- For Render-specific deployment, see the [Render Deployment Guide](RENDER_DEPLOYMENT.md)
- For GitHub repository setup, check the [GitHub Setup Guide](GITHUB_SETUP.md)

### Quick GitHub Setup

This project includes scripts to quickly set up your GitHub repository:

- For Windows: `setup-github.ps1`
- For Linux/macOS: `setup-github.sh`

See [GitHub Setup Scripts Guide](GITHUB_SETUP_SCRIPTS.md) for usage instructions.

## Safety Notice

This application is designed to provide guidance for HVAC troubleshooting. Always prioritize safety and consult with a certified HVAC professional for serious issues. The AI assistant is a tool to help identify problems but should not replace professional judgment.

## License

MIT