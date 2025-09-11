

const express = require('express');
const router = express.Router();
const axios = require('axios');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

// Middleware to verify JWT token
const auth = (req, res, next) => {
  const token = req.header('x-auth-token');
  
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// File upload dependencies
const multer = require('multer');
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, unique + '-' + file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, '_'));
  }
});
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    const allowed = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
    if (allowed.includes(file.mimetype)) cb(null, true);
    else cb(new Error('Invalid file type'));
  }
});

// List manuals endpoint
router.get('/list-manuals', auth, (req, res) => {
  try {
    const manuals = fs.readdirSync(uploadDir)
      .filter(file => file.toLowerCase().endsWith('.pdf'))
      .map(fileName => {
        const filePath = path.join(uploadDir, fileName);
        const stats = fs.statSync(filePath);
        return {
          filename: fileName,
          size: stats.size,
          uploadDate: stats.mtime.toISOString(),
          title: fileName.replace(/\.[^/.]+$/, "").replace(/-/g, " ")
        };
      });
    res.json(manuals);
  } catch (err) {
    console.error('Error listing manuals:', err);
    res.status(500).json({ message: 'Error listing manuals', error: err.message });
  }
});

// Upload manual endpoint
router.post('/upload-manual', auth, upload.single('file'), (req, res) => {
  try {
    const { title, category, subcategory, description, isPublic } = req.body;
    if (!title || !category || !req.file) {
      return res.status(400).json({ message: 'Missing required fields or file.' });
    }
    // Save manual metadata (could be extended to a DB)
    const manual = {
      title,
      category,
      subcategory: subcategory || '',
      description: description || '',
      isPublic: isPublic === 'on' || isPublic === true,
      fileName: req.file.filename,
      originalName: req.file.originalname,
      fileSize: req.file.size,
      fileType: req.file.mimetype,
      uploadDate: new Date().toISOString(),
      url: '/uploads/' + req.file.filename
    };
    // Optionally, save to a JSON file or DB here
    res.status(201).json({ message: 'Manual uploaded successfully!', manual });
  } catch (err) {
    res.status(500).json({ message: 'Upload failed', error: err.message });
  }
});
// Simple admin check middleware (replace with real role check in production)
function adminOnly(req, res, next) {
  // Example: check for admin flag in JWT payload
  if (req.user && req.user.isAdmin) {
    return next();
  }
  return res.status(403).json({ message: 'Admin access required' });
}

// Simple input sanitization utility
function sanitizeInput(obj) {
  if (typeof obj === 'string') {
    return obj.replace(/[<>"'`;]/g, '');
  } else if (Array.isArray(obj)) {
    return obj.map(sanitizeInput);
  } else if (typeof obj === 'object' && obj !== null) {
    const clean = {};
    for (const k in obj) {
      clean[k] = sanitizeInput(obj[k]);
    }
    return clean;
  }
  return obj;
}

// Enable editing for user 'tytewyte' only
router.post('/edit-knowledge', auth, (req, res) => {
  try {
    // Only allow user 'tytewyte' (from JWT payload)
    if (!req.user || req.user.username !== 'tytewyte') {
      return res.status(403).json({ message: 'Edit access denied' });
    }
    const sanitized = sanitizeInput(req.body);
    const kbPath = path.join(__dirname, '..', 'data', 'hvac-knowledge-base.json');
    let kbRaw = fs.readFileSync(kbPath, 'utf-8');
    let kb = JSON.parse(kbRaw);
    // Accept full replacement or partial update (merge)
    if (sanitized.fullReplace) {
      kb = sanitized.data;
    } else {
      // Merge: shallow merge top-level keys
      for (const k in sanitized.data) {
        kb[k] = sanitized.data[k];
      }
    }
    fs.writeFileSync(kbPath, JSON.stringify(kb, null, 2));
    res.json({ message: 'Knowledge base updated successfully.' });
  } catch (err) {
    res.status(400).json({ message: 'Invalid input', error: err.message });
  }
});
// Get troubleshooting flows from knowledge base
router.get('/troubleshooting-flows', auth, (req, res) => {
  try {
    const kbPath = path.join(__dirname, '..', 'data', 'hvac-knowledge-base.json');
    const kbRaw = fs.readFileSync(kbPath, 'utf-8');
    const kb = JSON.parse(kbRaw);
    const flows = kb.troubleshooting ? Object.values(kb.troubleshooting) : [];
    res.json({ flows });
  } catch (err) {
    console.error('Error loading troubleshooting flows:', err);
    res.status(500).json({ message: 'Error loading troubleshooting flows', error: err.message });
  }
});

// Search knowledge base (categories, procedures, troubleshooting, etc.)
router.get('/search', auth, (req, res) => {
  const q = (req.query.q || '').toLowerCase();
  if (!q) return res.json({ results: [] });
  try {
    const kbPath = path.join(__dirname, '..', 'data', 'hvac-knowledge-base.json');
    const kbRaw = fs.readFileSync(kbPath, 'utf-8');
    const kb = JSON.parse(kbRaw);
    let results = [];
    // Search safety protocols
    if (kb['safety-protocols']) {
      for (const [key, section] of Object.entries(kb['safety-protocols'])) {
        if (
          (section.title && section.title.toLowerCase().includes(q)) ||
          (section.procedures && section.procedures.some(p => p.toLowerCase().includes(q))) ||
          (section.tags && section.tags.some(tag => tag.toLowerCase().includes(q)))
        ) {
          results.push({ type: 'safety', key, ...section });
        }
      }
    }
    // Search troubleshooting flows
    if (kb.troubleshooting) {
      for (const [key, flow] of Object.entries(kb.troubleshooting)) {
        if (
          (flow.title && flow.title.toLowerCase().includes(q)) ||
          (flow.steps && flow.steps.some(s => s.toLowerCase().includes(q))) ||
          (flow.tags && flow.tags.some(tag => tag.toLowerCase().includes(q)))
        ) {
          results.push({ type: 'troubleshooting', key, ...flow });
        }
      }
    }
    res.json({ results });
  } catch (err) {
    console.error('Error searching knowledge base:', err);
    res.status(500).json({ message: 'Error searching knowledge base', error: err.message });
  }
});

// LM Studio API configuration
const LM_STUDIO_API_URL = process.env.LM_STUDIO_API_URL || 'http://localhost:1234/v1';
const LM_STUDIO_MODEL = process.env.LM_STUDIO_MODEL || 'gemma-3-12b';

// HVAC troubleshooting endpoint with Gemma 3 12B via LM Studio
router.post('/troubleshoot', auth, async (req, res) => {
  try {
    const { issue, systemType, symptoms } = req.body;
    
    if (!issue) {
      return res.status(400).json({ message: 'Issue description is required' });
    }

    // Safety first system prompt
    const systemPrompt = `You are a helpful HVAC troubleshooting assistant. Your primary goal is to help users diagnose and potentially fix HVAC issues safely. 

ALWAYS prioritize safety in your responses. Include relevant safety warnings and precautions with every response. 

For any issues involving:
- Electrical components
- Gas lines or connections
- Refrigerant handling
- Complex internal components

Explicitly advise the user to contact a certified HVAC professional rather than attempting repairs themselves.

Provide step-by-step diagnostic procedures when safe to do so, and explain potential causes of the reported symptoms. When suggesting DIY fixes, only recommend actions that are completely safe for untrained individuals.`;

    // Format user query with available information
    let userQuery = `I'm having an issue with my HVAC system: ${issue}`;
    
    if (systemType) {
      userQuery += `\nSystem type: ${systemType}`;
    }
    
    if (symptoms && symptoms.length > 0) {
      userQuery += `\nSymptoms: ${symptoms.join(', ')}`;
    }

    // Prepare the prompt for Gemma 3 12B
    const fullPrompt = `${systemPrompt}\n\nUser: ${userQuery}\n\nAssistant:`;

    // Call LM Studio API (using the OpenAI-compatible endpoint)
    const response = await axios.post(`${LM_STUDIO_API_URL}/chat/completions`, {
      model: process.env.LM_STUDIO_MODEL || 'gemma-3-12b',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userQuery }
      ],
      max_tokens: 1000,
      temperature: 0.7
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Extract the response text
    const aiResponse = response.data.choices[0].message.content;

    // Return the AI response
    res.json({
      response: aiResponse,
      safetyWarning: 'Always prioritize safety. For complex issues, consult a certified HVAC professional.'
    });

  } catch (err) {
    console.error('LM Studio API error:', err);
    res.status(500).json({ 
      message: 'Error processing your request', 
      error: process.env.NODE_ENV === 'development' ? err.message : undefined 
    });
  }
});

// Get HVAC knowledge base categories
router.get('/knowledge', (req, res) => {
  try {
    const kbPath = path.join(__dirname, '..', 'data', 'hvac-knowledge-base.json');
    const kbRaw = fs.readFileSync(kbPath, 'utf-8');
    const kb = JSON.parse(kbRaw);
    // For now, return the top-level keys as categories
    const categories = Object.keys(kb).map(key => ({
      id: key,
      name: kb[key].title || key,
      icon: kb[key].icon || '',
      procedures: kb[key].procedures || [],
    }));
    res.json({ categories });
  } catch (err) {
    console.error('Error loading knowledge base:', err);
    res.status(500).json({ message: 'Error loading knowledge base', error: err.message });
  }
});

// Get common troubleshooting flows
router.get('/troubleshooting-flows', auth, (req, res) => {
  // This would typically come from a database
  const flows = [
    {
      id: 'no-heat',
      title: 'No Heat',
      systemTypes: ['Furnace', 'Heat Pump', 'Boiler'],
      steps: [
        'Check thermostat settings',
        'Check circuit breakers',
        'Check fuel supply',
        'Check filter',
        'Check pilot light or ignition (if applicable)'
      ],
      safetyWarnings: [
        'Turn off power before inspecting internal components',
        'Do not attempt to repair gas components',
        'If you smell gas, leave immediately and call your gas company'
      ]
    },
    {
      id: 'no-cooling',
      title: 'No Cooling',
      systemTypes: ['Central AC', 'Heat Pump', 'Mini-Split'],
      steps: [
        'Check thermostat settings',
        'Check circuit breakers',
        'Check outdoor unit power',
        'Check filter',
        'Check for ice on refrigerant lines'
      ],
      safetyWarnings: [
        'Turn off power before inspecting components',
        'Do not attempt to repair refrigerant lines',
        'Keep debris clear from outdoor unit'
      ]
    },
    {
      id: 'poor-airflow',
      title: 'Poor Airflow',
      systemTypes: ['All'],
      steps: [
        'Check and replace air filters',
        'Check for closed or blocked vents',
        'Check for duct obstructions',
        'Inspect blower motor and fan'
      ],
      safetyWarnings: [
        'Turn off system before inspecting internal components',
        'Be cautious of sharp edges in ductwork',
        'Do not remove permanent duct components without professional help'
      ]
    }
  ];
  
  res.json({ flows });
});

// Get professional HVAC knowledge content
router.get('/professional-knowledge/:category', auth, (req, res) => {
  const { category } = req.params;
  
  // Professional HVAC knowledge content
  const professionalContent = {
    'air-handler-wiring-components': {
      title: 'Air Handler Wiring & Components',
      content: `
        <h3>Air Handler Wiring & Components (Focus: Troubleshooting & Advanced Diagnostics)</h3>
        
        <h4>Typical Circuit Breakdown:</h4>
        <ul>
          <li><strong>Fuses/Circuit Breakers:</strong> Primary protection. Verify proper sizing and condition. Look for signs of overheating or corrosion.</li>
          <li><strong>Control Board (PCB):</strong> The brain. Common issues include capacitor failures, relay malfunctions, input/output errors, and firmware glitches. Use a multimeter to check voltages at the board's terminals against service manuals. Understanding the wiring diagrams is critical.</li>
          <li><strong>Blower Motor Circuit:</strong> Includes motor windings, centrifugal fan power supply (CFPS) or ECM motor driver, thermal overload protection (TOL), and associated capacitors. Measure winding resistance for shorts/opens. Check capacitor capacitance with a meter. Analyze CFPS/ECM drive signals with an oscilloscope if available.</li>
          <li><strong>Heating Element Circuit (if applicable):</strong> Resistance measurements to check element integrity. Verify proper control from the thermostat or zone board.</li>
          <li><strong>Cooling Coil Fan Motor:</strong> Similar circuit considerations as the blower motor.</li>
        </ul>
        
        <h4>Key Components & Troubleshooting Tips:</h4>
        <ul>
          <li><strong>Capacitors:</strong> Dual-run capacitors are common for both motors. Test with a capacitance meter and visually inspect for bulging, leaking, or corrosion. Discharge before handling!</li>
          <li><strong>Relays:</strong> Listen for clicking sounds (or lack thereof). Use a multimeter to check coil continuity and contact closure.</li>
          <li><strong>Sensors:</strong> Air temperature sensors, return air temperature sensors, supply air temperature sensors – all critical for proper operation. Verify signal accuracy with a calibrated thermometer.</li>
          <li><strong>Wiring Connections:</strong> Loose or corroded connections are frequent culprits. Use a thermal imaging camera to identify hotspots indicating resistance.</li>
        </ul>
        
        <div class="safety-notice">
          <i class="fas fa-exclamation-triangle"></i>
          <p><strong>Safety Notice:</strong> This information is for experienced HVAC professionals only. Working with electrical systems can be extremely dangerous. Always follow all applicable safety regulations and manufacturer's instructions.</p>
        </div>
      `
    },
    'condenser-wiring-components': {
      title: 'Condenser Wiring & Components',
      content: `
        <h3>Condenser Wiring & Components (Focus: High-Voltage Systems and Refrigerant Circuit Interaction)</h3>
        
        <h4>Typical Circuit Breakdown:</h4>
        <ul>
          <li><strong>Disconnect Switch:</strong> Always the first step in any condenser troubleshooting procedure. Verify proper operation and secure connections.</li>
          <li><strong>Contactor:</strong> Controls power to the compressor motor. Check coil continuity, contact closure, and for signs of pitting or burning.</li>
          <li><strong>Compressor Motor Circuit:</strong> Includes start capacitor, run capacitor (often combined), start relay, and overload protection. Similar testing procedures as air handler motors apply.</li>
          <li><strong>Fan Motor Circuit:</strong> Similar to the air handler fan motor circuit.</li>
          <li><strong>Refrigerant Pressure Switches:</strong> High-pressure and low-pressure switches protect the compressor. Verify proper operation using manifold gauges and pressure readings.</li>
        </ul>
        
        <h4>Key Components & Troubleshooting Tips:</h4>
        <ul>
          <li><strong>High-Voltage Wiring:</strong> Condensers utilize high voltage for the compressor motor. Extreme caution is required. Use appropriate personal protective equipment (PPE) – insulated gloves, eye protection.</li>
          <li><strong>Compressor Overload Protector:</strong> This device protects the compressor from overheating. Test continuity with an ohmmeter after allowing it to cool down completely.</li>
          <li><strong>Metering Device (TXV or Capillary Tube):</strong> While not directly electrical, proper refrigerant flow is crucial for condenser performance. Monitor suction and discharge pressures to assess its function.</li>
          <li><strong>Condenser Fan Motor Speed:</strong> Many modern condensers use ECM fans with variable speed control. Verify the fan motor is receiving the correct voltage and that the speed sensor is functioning properly.</li>
        </ul>
        
        <div class="safety-notice">
          <i class="fas fa-exclamation-triangle"></i>
          <p><strong>Safety Notice:</strong> This information is for experienced HVAC professionals only. Working with high-voltage electrical systems and refrigerants can be extremely dangerous. Always follow all applicable safety regulations and manufacturer's instructions.</p>
        </div>
      `
    },
    'advanced-diagnostics': {
      title: 'Advanced Diagnostics & Considerations',
      content: `
        <h3>Advanced Diagnostics & Considerations</h3>
        
        <ul>
          <li><strong>Wiring Diagrams:</strong> Become intimately familiar with wiring diagrams for various HVAC manufacturers (Carrier, Trane, Lennox, etc.).</li>
          <li><strong>Multimeter Proficiency:</strong> Essential for measuring voltages, currents, resistances, and continuity.</li>
          <li><strong>Oscilloscope Use:</strong> Allows you to visualize electrical signals and diagnose complex issues like intermittent faults or signal distortion.</li>
          <li><strong>Refrigerant Leak Detection:</strong> Use electronic leak detectors and bubble solutions to pinpoint refrigerant leaks.</li>
          <li><strong>System Performance Analysis:</strong> Analyze system performance data (temperature differentials, airflow rates, energy consumption) to identify inefficiencies and potential problems.</li>
        </ul>
        
        <div class="safety-notice">
          <i class="fas fa-exclamation-triangle"></i>
          <p><strong>Safety Notice – CRITICAL!</strong> This information is for experienced HVAC professionals only. Working with electrical systems and refrigerants can be extremely dangerous. Always follow all applicable safety regulations and manufacturer's instructions. Never attempt repairs if you are not properly trained and equipped. Improper handling of electricity or refrigerant can result in serious injury, death, or environmental damage. This information does not substitute for professional judgment.</p>
        </div>
      `
    }
  };
  
  // Convert category parameter to match object keys
  const categoryKey = category.toLowerCase().replace(/ /g, '-');
  
  if (professionalContent[categoryKey]) {
    res.json(professionalContent[categoryKey]);
  } else {
    res.status(404).json({ message: 'Category not found' });
  }
});

// Feedback endpoint
router.post('/feedback', (req, res) => {
  try {
    const feedback = req.body;
    feedback.timestamp = new Date().toISOString();
    feedback.ipAddress = req.ip;
    
    // Create feedback directory if it doesn't exist
    const feedbackDir = path.join(__dirname, '..', 'feedback');
    if (!fs.existsSync(feedbackDir)) {
      fs.mkdirSync(feedbackDir, { recursive: true });
    }
    
    // Save feedback to a JSON file
    const filename = `feedback_${Date.now()}.json`;
    const filePath = path.join(feedbackDir, filename);
    
    fs.writeFileSync(filePath, JSON.stringify(feedback, null, 2));
    
    // Log feedback for monitoring
    console.log(`New feedback received: ${feedback.type}`);
    
    res.status(201).json({ message: 'Feedback received. Thank you!' });
  } catch (error) {
    console.error('Error saving feedback:', error);
    res.status(500).json({ message: 'Error saving feedback', error: error.message });
  }
});

module.exports = router;