exports.handler = async (event, context) => {
  // Handle CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS'
  }

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' }
  }

  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ message: 'Method not allowed' })
    }
  }

  // Sample knowledge base categories
  const categories = [
    {
      name: 'Heating Systems',
      icon: 'fa-fire',
      procedures: [
        'Check thermostat settings and battery',
        'Inspect air filter for clogs',
        'Verify gas supply and pilot light',
        'Check electrical connections',
        'Examine heat exchanger for cracks'
      ],
      references: [
        { label: 'Furnace Maintenance Guide', url: '#' },
        { label: 'Gas Safety Procedures', url: '#' }
      ]
    },
    {
      name: 'Cooling Systems',
      icon: 'fa-snowflake',
      procedures: [
        'Replace dirty air filters',
        'Clean condenser coils',
        'Check refrigerant levels',
        'Inspect ductwork for leaks',
        'Verify proper airflow'
      ],
      references: [
        { label: 'AC Troubleshooting Guide', url: '#' },
        { label: 'Refrigerant Handling Safety', url: '#' }
      ]
    },
    {
      name: 'Ventilation',
      icon: 'fa-wind',
      procedures: [
        'Inspect exhaust fans',
        'Check ductwork for blockages',
        'Verify proper air circulation',
        'Clean air vents and registers',
        'Test ventilation controls'
      ],
      references: [
        { label: 'Ventilation Standards', url: '#' },
        { label: 'Indoor Air Quality Guide', url: '#' }
      ]
    },
    {
      name: 'Electrical Systems',
      icon: 'fa-bolt',
      procedures: [
        'Check circuit breakers',
        'Inspect wiring connections',
        'Test voltage levels',
        'Verify grounding systems',
        'Check motor operations'
      ],
      references: [
        { label: 'Electrical Safety Code', url: '#' },
        { label: 'Motor Troubleshooting', url: '#' }
      ]
    },
    {
      name: 'Maintenance',
      icon: 'fa-tools',
      procedures: [
        'Schedule regular filter changes',
        'Lubricate moving parts',
        'Clean system components',
        'Check system performance',
        'Document maintenance activities'
      ],
      references: [
        { label: 'Preventive Maintenance Schedule', url: '#' },
        { label: 'Equipment Lifecycle Guide', url: '#' }
      ]
    }
  ]

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({ categories })
  }
}
