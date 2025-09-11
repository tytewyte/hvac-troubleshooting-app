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
    const { systemType, issue, symptoms } = JSON.parse(event.body)

    // Mock AI response based on system type and issue
    let response = `Based on your ${systemType} issue: "${issue}", here are the recommended troubleshooting steps:\n\n`

    if (systemType === 'furnace' || systemType === 'boiler') {
      response += `1. Check thermostat settings and replace batteries if needed
2. Verify power supply to the unit and check circuit breakers
3. Inspect air filter - replace if dirty or clogged
4. Check pilot light or ignition system (if gas unit)
5. Examine gas supply valve (ensure it's open)
6. Inspect vents and flue for blockages

🔥 **Safety Warning**: Never attempt to repair gas components yourself. If you smell gas, leave immediately and call your gas company.`
    } else if (systemType === 'central-ac' || systemType === 'heat-pump') {
      response += `1. Check thermostat settings and replace batteries
2. Replace or clean air filter
3. Check circuit breakers and electrical connections
4. Inspect outdoor unit - remove debris, leaves, or obstructions
5. Check refrigerant lines for ice buildup
6. Verify proper airflow through all vents

❄️ **Safety Warning**: Never attempt to handle refrigerant. This requires professional certification and specialized equipment.`
    } else {
      response += `1. Check power supply and circuit breakers
2. Inspect air filters for clogs or dirt
3. Verify thermostat settings and batteries
4. Examine unit for debris or obstructions
5. Check for proper airflow through vents
6. Listen for unusual noises or vibrations`
    }

    response += `\n\n⚠️ **Important**: Always turn off power before inspecting electrical components. If these steps don't resolve the issue, contact a certified HVAC technician.`

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ response })
    }
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ message: 'Server error' })
    }
  }
}
