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


## Knowledge Base: Format & Contribution

### Location
The HVAC knowledge base is stored in `data/hvac-knowledge-base.json`.

### Format
The file is a structured JSON document with two main sections:

- `safety-protocols`: Contains safety categories (e.g., electrical, gas, refrigerant, general) with fields:
   - `title`: Human-readable title
   - `icon`: FontAwesome icon class
   - `tags`: Array of tags for search/filter
   - `difficulty`: Skill level (e.g., all, beginner, advanced)
   - `procedures`: Array of step-by-step safety procedures
   - `references`: Array of `{ label, url }` objects for external resources
- `troubleshooting`: Contains troubleshooting flows (e.g., no-heat, no-cooling) with fields:
   - `title`: Human-readable title
   - `systemTypes`: Array of applicable system types
   - `difficulty`: Skill level
   - `steps`: Array of troubleshooting steps
   - `safetyWarnings`: Array of safety warnings
   - `tags`: Array of tags for search/filter

#### Example
```json
{
   "safety-protocols": {
      "electrical-safety": {
         "title": "Electrical Safety Procedures",
         "icon": "fas fa-bolt",
         "tags": ["safety", "electrical"],
         "difficulty": "all",
         "procedures": ["ALWAYS turn off power at the main breaker before electrical work"],
         "references": [{ "label": "OSHA Electrical Safety", "url": "https://www.osha.gov/electrical" }]
      }
   },
   "troubleshooting": {
      "no-heat": {
         "title": "No Heat",
         "systemTypes": ["Furnace", "Heat Pump", "Boiler"],
         "difficulty": "beginner",
         "steps": ["Check thermostat settings"],
         "safetyWarnings": ["Turn off power before inspecting internal components"],
         "tags": ["heating", "troubleshooting"]
      }
   }
}
```

### How to Add or Edit Knowledge Entries

1. **Open** `data/hvac-knowledge-base.json` in your editor.
2. **To add a new safety protocol:**
    - Add a new key under `safety-protocols` with the structure above.
3. **To add a new troubleshooting flow:**
    - Add a new key under `troubleshooting` with the structure above.
4. **To edit an entry:**
    - Update the relevant fields (title, steps, procedures, etc.).
5. **Validate** your JSON (use an online validator or your editor's linter) to avoid syntax errors.
6. **Test** your changes by running the app and checking the knowledge base UI and search.

### Contribution Guidelines

- Use clear, concise language for steps and procedures.
- Always include safety warnings where appropriate.
- Add references to reputable sources when possible.
- Use tags to improve searchability.
- Submit a pull request with a summary of your changes.

For questions or suggestions, open an issue or contact the maintainers.

## License

MIT