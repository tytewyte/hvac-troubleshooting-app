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
router.get('/knowledge', auth, (req, res) => {
  // This would typically come from a database
  const categories = [
    {
      id: 'professional',
      name: 'Professional HVAC Knowledge',
      subcategories: ['Air Handler Wiring & Components', 'Condenser Wiring & Components', 'Advanced Diagnostics']
    },
    {
      id: 'heating',
      name: 'Heating Systems',
      subcategories: ['Furnaces', 'Heat Pumps', 'Boilers', 'Radiators']
    },
    {
      id: 'cooling',
      name: 'Cooling Systems',
      subcategories: ['Central Air', 'Ductless Mini-Splits', 'Window Units', 'Evaporative Coolers']
    },
    {
      id: 'ventilation',
      name: 'Ventilation',
      subcategories: ['Ductwork', 'Air Handlers', 'ERVs/HRVs', 'Exhaust Systems']
    },
    {
      id: 'controls',
      name: 'Controls & Thermostats',
      subcategories: ['Smart Thermostats', 'Programmable Thermostats', 'Zoning Systems']
    },
    {
      id: 'maintenance',
      name: 'Maintenance',
      subcategories: ['Filter Replacement', 'Seasonal Maintenance', 'Efficiency Tips']
    }
  ];
  
  res.json({ categories });
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