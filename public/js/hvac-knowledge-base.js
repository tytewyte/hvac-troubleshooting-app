// Expanded HVAC Knowledge Base
// Enhanced with comprehensive safety protocols and educational content

window.hvacKnowledgeBase = {
    // Universal Safety Protocols - Applied to all system types
    'safety-protocols': {
        'electrical-safety': {
            title: 'Electrical Safety Procedures',
            icon: 'fas fa-bolt',
            procedures: [
                'ALWAYS turn off power at the main breaker before electrical work',
                'Use lockout/tagout (LOTO) procedures to prevent accidental energization',
                'Test circuits with a multimeter to verify power is off',
                'Wear appropriate PPE: safety glasses, insulated gloves, non-conductive footwear',
                'Never work on electrical components in wet conditions',
                'Use insulated tools rated for electrical work',
                'Be aware of capacitors that may retain charge even when power is off',
                'If unsure about electrical safety, contact a licensed electrician'
            ]
        },
        'gas-safety': {
            title: 'Gas Safety Protocols',
            icon: 'fas fa-fire',
            procedures: [
                'If you smell gas, evacuate immediately and call the gas company',
                'Never use open flames or create sparks near gas appliances',
                'Ensure adequate ventilation when working on gas systems',
                'Check for gas leaks using soap solution, never use a flame',
                'Turn off gas supply at the meter if major leak is suspected',
                'Only qualified technicians should work on gas connections',
                'Install and maintain carbon monoxide detectors',
                'Never bypass or disable safety controls on gas appliances'
            ]
        },
        'refrigerant-safety': {
            title: 'Refrigerant Handling Safety',
            icon: 'fas fa-snowflake',
            procedures: [
                'Only EPA-certified technicians should handle refrigerants',
                'Wear safety glasses and gloves when working with refrigerants',
                'Ensure adequate ventilation to prevent refrigerant accumulation',
                'Never vent refrigerants to atmosphere - illegal and harmful',
                'Use proper recovery equipment for refrigerant removal',
                'Store refrigerants in approved containers in cool, dry areas',
                'Be aware that refrigerants can displace oxygen in confined spaces',
                'Follow EPA regulations for refrigerant handling and disposal'
            ]
        },
        'general-safety': {
            title: 'General HVAC Safety',
            icon: 'fas fa-shield-alt',
            procedures: [
                'Always wear appropriate PPE: safety glasses, work gloves, steel-toed boots',
                'Use proper ladder safety - maintain 3-point contact, check stability',
                'Keep work area clean and free of tripping hazards',
                'Use proper lifting techniques to prevent back injury',
                'Be aware of sharp edges on ductwork and equipment',
                'Never work alone on complex or dangerous procedures',
                'Have emergency contact numbers readily available',
                'Know the location of emergency shutoffs for gas, water, and electricity'
            ]
        }
     },

    // Essential Tools and Equipment - From Chapter 2
    'tools-equipment': {
        'basic-tools': {
            title: 'Essential Basic Tools',
            icon: 'fas fa-tools',
            tools: [
                {
                    name: 'Screwdrivers',
                    types: ['Phillips head', 'Flathead', 'Torx', 'Hex/Allen keys'],
                    purpose: 'Removing panels, accessing components, electrical connections',
                    safety: 'Use insulated handles for electrical work'
                },
                {
                    name: 'Adjustable Wrench',
                    types: ['10-inch', '12-inch adjustable'],
                    purpose: 'Gas line connections, pipe fittings, general mechanical work',
                    safety: 'Never use on electrical components'
                },
                {
                    name: 'Pipe Wrench',
                    types: ['10-inch', '14-inch pipe wrench'],
                    purpose: 'Gas pipe connections, water lines, threaded fittings',
                    safety: 'Ensure proper grip to prevent slipping'
                },
                {
                    name: 'Needle-nose Pliers',
                    types: ['Standard', 'Insulated'],
                    purpose: 'Wire connections, small component manipulation',
                    safety: 'Use insulated pliers for electrical work'
                },
                {
                    name: 'Wire Strippers',
                    types: ['Multi-gauge', 'Automatic'],
                    purpose: 'Electrical wire preparation and connections',
                    safety: 'Essential for safe electrical connections'
                }
            ]
        },
        'measuring-tools': {
            title: 'Measurement and Testing Equipment',
            icon: 'fas fa-ruler',
            tools: [
                {
                    name: 'Digital Multimeter',
                    purpose: 'Voltage, current, resistance, continuity testing',
                    safety: 'Always verify meter function before use, use proper test leads',
                    usage: 'Essential for electrical diagnostics and safety verification'
                },
                {
                    name: 'Manometer',
                    purpose: 'Gas pressure measurement, draft testing',
                    safety: 'Use only gas-rated manometers for gas pressure testing',
                    usage: 'Critical for gas appliance safety and efficiency'
                },
                {
                    name: 'Thermometer (Digital)',
                    purpose: 'Temperature measurement of air, surfaces, refrigerant lines',
                    safety: 'Use non-contact infrared for electrical components',
                    usage: 'Essential for system performance evaluation'
                },
                {
                    name: 'Refrigerant Manifold Gauges',
                    purpose: 'Refrigerant pressure testing and charging',
                    safety: 'EPA certification required, proper hose connections essential',
                    usage: 'Professional tool for refrigerant system diagnostics'
                }
            ]
        },
        'safety-equipment': {
            title: 'Personal Protective Equipment (PPE)',
            icon: 'fas fa-shield-alt',
            equipment: [
                {
                    name: 'Safety Glasses',
                    purpose: 'Eye protection from debris, chemicals, sparks',
                    requirement: 'ANSI Z87.1 rated, side shields recommended',
                    usage: 'Required for all HVAC work'
                },
                {
                    name: 'Work Gloves',
                    types: ['Insulated electrical gloves', 'Cut-resistant gloves', 'Chemical-resistant gloves'],
                    purpose: 'Hand protection from cuts, electrical shock, chemicals',
                    usage: 'Select appropriate type for specific task'
                },
                {
                    name: 'Steel-toed Boots',
                    purpose: 'Foot protection from falling objects, electrical hazards',
                    requirement: 'ASTM rated, slip-resistant soles',
                    usage: 'Required for all field work'
                },
                {
                    name: 'Hard Hat',
                    purpose: 'Head protection in industrial/commercial settings',
                    requirement: 'ANSI Z89.1 rated',
                    usage: 'Required in commercial/industrial environments'
                }
            ]
        },
        'specialized-tools': {
            title: 'Specialized HVAC Tools',
            icon: 'fas fa-cog',
            tools: [
                {
                    name: 'Refrigerant Recovery Machine',
                    purpose: 'EPA-compliant refrigerant removal and storage',
                    requirement: 'EPA certification required for operation',
                    usage: 'Mandatory for refrigerant system service'
                },
                {
                    name: 'Combustion Analyzer',
                    purpose: 'Gas appliance efficiency and safety testing',
                    safety: 'Essential for carbon monoxide detection',
                    usage: 'Professional diagnostic tool for gas appliances'
                },
                {
                    name: 'Leak Detection Equipment',
                    types: ['Electronic leak detector', 'Soap solution', 'Ultrasonic detector'],
                    purpose: 'Refrigerant and gas leak detection',
                    usage: 'Critical for system integrity and safety'
                },
                {
                    name: 'Vacuum Pump',
                    purpose: 'System evacuation before refrigerant charging',
                    requirement: 'Deep vacuum capability (500 microns or better)',
                    usage: 'Essential for refrigerant system service'
                }
            ]
        }
    },

    "electrical-systems": {
        "title": "HVAC Electrical Systems",
        "description": "Comprehensive guide to electrical components, wiring, and safety",
        "icon": "⚡",
        "components": {
            "control-circuits": {
                "title": "Control Circuits and Components",
                "voltage-levels": {
                    "low-voltage": {
                        "range": "24V AC/DC",
                        "applications": ["Thermostats", "Control relays", "Safety switches"],
                        "safety": "Generally safe but still requires caution"
                    },
                    "line-voltage": {
                        "range": "120V/240V AC",
                        "applications": ["Motors", "Heating elements", "Compressors"],
                        "safety": "Potentially lethal - requires lockout/tagout"
                    }
                },
                "key-components": [
                    {
                        "name": "Contactors",
                        "function": "Switch high-voltage circuits using low-voltage control",
                        "testing": "Check coil resistance and contact continuity",
                        "common-failures": ["Burned contacts", "Coil failure", "Mechanical wear"]
                    },
                    {
                        "name": "Relays",
                        "function": "Control switching for various circuits",
                        "types": ["Control relays", "Time delay relays", "Current sensing relays"],
                        "testing": "Verify coil operation and contact switching"
                    },
                    {
                        "name": "Transformers",
                        "function": "Step down voltage for control circuits",
                        "common-ratings": ["40VA", "75VA", "100VA"],
                        "testing": "Check primary/secondary voltage and VA rating"
                    },
                    {
                        "name": "Capacitors",
                        "types": ["Start capacitors", "Run capacitors", "Dual capacitors"],
                        "function": "Provide starting torque and improve motor efficiency",
                        "testing": "Use capacitor tester or multimeter with capacitance function"
                    }
                ]
            },
            "motors-and-drives": {
                "title": "Motors and Variable Frequency Drives",
                "motor-types": [
                    {
                        "type": "Single-phase induction",
                        "applications": ["Residential blowers", "Small pumps"],
                        "starting-methods": ["Capacitor start", "Permanent split capacitor"],
                        "testing": "Check winding resistance and insulation"
                    },
                    {
                        "type": "Three-phase induction",
                        "applications": ["Commercial equipment", "Large compressors"],
                        "advantages": ["Higher efficiency", "Better power factor", "Smoother operation"],
                        "testing": "Verify phase balance and rotation"
                    },
                    {
                        "type": "ECM (Electronically Commutated)",
                        "applications": ["High-efficiency blowers", "Variable speed applications"],
                        "benefits": ["Variable speed", "High efficiency", "Soft start"],
                        "testing": "Requires specialized procedures and equipment"
                    }
                ],
                "vfd-basics": {
                    "purpose": "Control motor speed and torque electronically",
                    "benefits": ["Energy savings", "Precise control", "Reduced mechanical stress"],
                    "safety-considerations": ["High voltage present", "EMI concerns", "Proper grounding required"]
                }
            }
        },
        "wiring-diagrams": {
            "title": "Reading and Interpreting Wiring Diagrams",
            "diagram-types": {
                "schematic": {
                    "description": "Shows electrical connections and component relationships",
                    "purpose": "Understanding circuit operation and troubleshooting",
                    "symbols": "Uses standard electrical symbols"
                },
                "ladder": {
                    "description": "Shows control logic in ladder format",
                    "purpose": "Troubleshooting control sequences",
                    "reading-method": "Read from left to right, top to bottom"
                },
                "pictorial": {
                    "description": "Shows physical layout and wire routing",
                    "purpose": "Installation and physical troubleshooting",
                    "detail-level": "Shows actual component appearance"
                }
            },
            "common-symbols": [
                {
                    "symbol": "Circle with X",
                    "meaning": "Motor",
                    "variations": "May include speed or type indicators"
                },
                {
                    "symbol": "Parallel lines",
                    "meaning": "Capacitor",
                    "notation": "Value usually marked in microfarads"
                },
                {
                    "symbol": "Coil symbol",
                    "meaning": "Contactor or relay coil",
                    "associated": "Contacts shown separately"
                },
                {
                    "symbol": "Switch contacts",
                    "meaning": "NO (normally open) or NC (normally closed)",
                    "operation": "State shown when coil is de-energized"
                }
            ],
            "troubleshooting-approach": {
                "preparation": "Study diagram before starting work",
                "methodology": "Follow signal path from input to output",
                "documentation": "Mark tested points and findings on diagram",
                "verification": "Confirm repair by re-testing complete circuit"
            }
        },
        "electrical-safety": {
            "title": "Electrical Safety Procedures",
            "lockout-tagout": {
                "purpose": "Prevent accidental energization during service",
                "procedure": [
                    "Identify all energy sources",
                    "Notify affected personnel",
                    "Shut down equipment properly",
                    "Isolate energy sources",
                    "Apply lockout/tagout devices",
                    "Verify zero energy state"
                ],
                "verification": "Test with meter before beginning work"
            },
            "ppe-requirements": {
                "minimum": ["Safety glasses", "Insulated tools", "Non-conductive footwear"],
                "high-voltage": ["Arc-rated clothing", "Insulated gloves", "Face shield"],
                "testing": "Verify PPE condition before each use"
            },
            "safe-practices": [
                {
                    "practice": "Test before touch",
                    "description": "Always verify de-energized state with meter",
                    "importance": "Prevents electrical shock"
                },
                {
                    "practice": "One hand rule",
                    "description": "Keep one hand away from electrical components",
                    "purpose": "Prevents current path through heart"
                },
                {
                    "practice": "Proper grounding",
                    "description": "Ensure all equipment is properly grounded",
                    "verification": "Test ground continuity"
                },
                {
                    "practice": "Work in dry conditions",
                    "description": "Avoid electrical work in wet conditions",
                    "exception": "Emergency situations with proper PPE"
                }
            ]
        },
        "testing-procedures": {
            "title": "Electrical Testing and Measurement",
            "multimeter-usage": {
                "voltage-testing": {
                    "ac-voltage": "Set to AC volts, test across load",
                    "dc-voltage": "Set to DC volts, observe polarity",
                    "safety": "Never exceed meter ratings"
                },
                "current-testing": {
                    "method": "Use clamp-on ammeter for safety",
                    "in-line": "Only when circuit can be safely opened",
                    "interpretation": "Compare to nameplate ratings"
                },
                "resistance-testing": {
                    "requirement": "Circuit must be de-energized",
                    "applications": ["Winding resistance", "Contact continuity", "Insulation testing"],
                    "interpretation": "Zero = short, infinite = open"
                }
            },
            "specialized-tests": [
                {
                    "test": "Insulation resistance",
                    "equipment": "Megohmmeter (megger)",
                    "purpose": "Verify winding insulation integrity",
                    "standards": "Minimum 1 megohm for most applications"
                },
                {
                    "test": "Power quality analysis",
                    "equipment": "Power quality analyzer",
                    "measurements": ["Harmonics", "Power factor", "Voltage distortion"],
                    "importance": "Identifies power-related problems"
                },
                {
                    "test": "Motor analysis",
                    "equipment": "Motor circuit analyzer",
                    "capabilities": ["Rotor bar testing", "Stator analysis", "Bearing condition"],
                    "benefit": "Predictive maintenance capabilities"
                }
            ]
        }
    },

    "refrigeration-systems": {
        "title": "Refrigeration Cycle and Systems",
        "description": "Comprehensive guide to refrigeration principles, components, and procedures",
        "icon": "❄️",
        "cycle-fundamentals": {
            "title": "Basic Refrigeration Cycle",
            "description": "Understanding the four main processes of refrigeration",
            "processes": [
                {
                    "process": "Compression",
                    "component": "Compressor",
                    "description": "Low-pressure vapor compressed to high-pressure vapor",
                    "energy-change": "Temperature and pressure increase",
                    "purpose": "Prepares refrigerant for heat rejection"
                },
                {
                    "process": "Condensation",
                    "component": "Condenser",
                    "description": "High-pressure vapor releases heat and becomes liquid",
                    "energy-change": "Latent heat removed, temperature decreases",
                    "purpose": "Heat rejection to ambient environment"
                },
                {
                    "process": "Expansion",
                    "component": "Expansion device (TXV/Orifice)",
                    "description": "High-pressure liquid expands to low-pressure mixture",
                    "energy-change": "Pressure and temperature drop significantly",
                    "purpose": "Prepares refrigerant for heat absorption"
                },
                {
                    "process": "Evaporation",
                    "component": "Evaporator",
                    "description": "Low-pressure mixture absorbs heat and becomes vapor",
                    "energy-change": "Latent heat absorbed, complete vaporization",
                    "purpose": "Heat absorption from conditioned space"
                }
            ],
            "key-concepts": {
                "superheat": {
                    "definition": "Temperature above saturation temperature for given pressure",
                    "measurement": "Actual temperature minus saturation temperature",
                    "typical-range": "8-12°F at evaporator outlet",
                    "importance": "Ensures complete vaporization, protects compressor"
                },
                "subcooling": {
                    "definition": "Temperature below saturation temperature for given pressure",
                    "measurement": "Saturation temperature minus actual temperature",
                    "typical-range": "10-15°F at condenser outlet",
                    "importance": "Ensures liquid refrigerant to expansion device"
                }
            }
        },
        "refrigerant-types": {
            "title": "Refrigerant Classifications and Properties",
            "common-refrigerants": [
                {
                    "type": "R-410A",
                    "classification": "HFC blend",
                    "applications": ["Residential AC", "Heat pumps", "Light commercial"],
                    "properties": {
                        "ozone-depletion": "Zero",
                        "global-warming": "High (2088 GWP)",
                        "pressure": "Higher than R-22",
                        "temperature-glide": "Minimal"
                    },
                    "handling": "Requires recovery, cannot be vented"
                },
                {
                    "type": "R-22",
                    "classification": "HCFC",
                    "status": "Phased out for new equipment (2010)",
                    "applications": ["Existing systems only", "Service replacement"],
                    "properties": {
                        "ozone-depletion": "Low but present",
                        "global-warming": "Medium (1810 GWP)",
                        "pressure": "Standard reference"
                    },
                    "handling": "Requires recovery, limited availability"
                },
                {
                    "type": "R-32",
                    "classification": "HFC",
                    "applications": ["New residential systems", "Mini-splits"],
                    "properties": {
                        "ozone-depletion": "Zero",
                        "global-warming": "Lower (675 GWP)",
                        "efficiency": "Higher than R-410A",
                        "flammability": "Mildly flammable (A2L)"
                    },
                    "handling": "Special safety precautions due to flammability"
                },
                {
                    "type": "R-134a",
                    "classification": "HFC",
                    "applications": ["Automotive AC", "Some commercial refrigeration"],
                    "properties": {
                        "ozone-depletion": "Zero",
                        "global-warming": "High (1430 GWP)",
                        "pressure": "Lower than R-410A"
                    },
                    "handling": "Standard recovery procedures"
                }
            ],
            "safety-classifications": {
                "toxicity": {
                    "A": "Lower toxicity",
                    "B": "Higher toxicity"
                },
                "flammability": {
                    "1": "No flame propagation",
                    "2L": "Lower flammability",
                    "2": "Flammable",
                    "3": "Higher flammability"
                }
            }
        },
        "system-components": {
            "title": "Refrigeration System Components",
            "compressors": {
                "types": [
                    {
                        "type": "Reciprocating",
                        "operation": "Piston-driven compression",
                        "applications": ["Residential AC", "Small commercial"],
                        "advantages": ["Simple design", "Easy service", "Cost effective"],
                        "maintenance": "Check oil level, valve operation, electrical connections"
                    },
                    {
                        "type": "Scroll",
                        "operation": "Orbital motion compression",
                        "applications": ["Residential/commercial AC", "Heat pumps"],
                        "advantages": ["Quiet operation", "High efficiency", "Fewer moving parts"],
                        "maintenance": "Monitor discharge temperature, check electrical connections"
                    },
                    {
                        "type": "Rotary",
                        "operation": "Rotating vane compression",
                        "applications": ["Window units", "Small split systems"],
                        "advantages": ["Compact size", "Smooth operation"],
                        "maintenance": "Check oil circulation, monitor pressures"
                    }
                ]
            },
            "expansion-devices": {
                "types": [
                    {
                        "type": "Thermostatic Expansion Valve (TXV)",
                        "operation": "Modulates based on superheat",
                        "advantages": ["Precise control", "Adapts to load changes", "Protects compressor"],
                        "adjustment": "Superheat setting via adjustment screw",
                        "troubleshooting": "Check superheat, sensing bulb location, valve operation"
                    },
                    {
                        "type": "Fixed Orifice",
                        "operation": "Fixed restriction, constant opening",
                        "advantages": ["Simple design", "Low cost", "Reliable"],
                        "limitations": ["No load adaptation", "Requires proper charge"],
                        "troubleshooting": "Check for blockage, verify proper sizing"
                    },
                    {
                        "type": "Electronic Expansion Valve (EEV)",
                        "operation": "Electronically controlled modulation",
                        "advantages": ["Precise control", "Multiple sensors", "Diagnostic capability"],
                        "applications": ["Variable speed systems", "Heat pumps"],
                        "troubleshooting": "Check sensor inputs, control signals, valve operation"
                    }
                ]
            }
        },
        "refrigerant-handling": {
            "title": "Safe Refrigerant Handling Procedures",
            "epa-regulations": {
                "section-608": {
                    "purpose": "Stratospheric ozone protection",
                    "requirements": ["Technician certification", "Proper recovery", "Leak repair"],
                    "penalties": "Up to $37,500 per violation"
                },
                "certification-types": [
                    {
                        "type": "Type I",
                        "scope": "Small appliances (less than 5 lbs)",
                        "examples": ["Household refrigerators", "Window AC units"]
                    },
                    {
                        "type": "Type II",
                        "scope": "High-pressure appliances",
                        "examples": ["Residential/commercial AC", "Heat pumps"]
                    },
                    {
                        "type": "Type III",
                        "scope": "Low-pressure appliances",
                        "examples": ["Centrifugal chillers"]
                    },
                    {
                        "type": "Universal",
                        "scope": "All types of equipment",
                        "benefit": "Most comprehensive certification"
                    }
                ]
            },
            "recovery-procedures": {
                "equipment-required": ["EPA-certified recovery unit", "Recovery tank", "Manifold gauges", "Hoses"],
                "safety-steps": [
                    "Verify recovery unit certification",
                    "Check tank certification and capacity",
                    "Connect gauges and hoses properly",
                    "Operate according to manufacturer instructions",
                    "Monitor pressures throughout process",
                    "Verify complete recovery (vacuum hold test)"
                ],
                "completion-criteria": {
                    "vacuum-level": "System must reach and hold specified vacuum",
                    "time-requirement": "Hold vacuum for specified time period",
                    "leak-test": "No pressure rise indicates complete recovery"
                }
            },
            "charging-procedures": {
                "preparation": [
                    "Verify system evacuation",
                    "Check refrigerant type compatibility",
                    "Calculate proper charge amount",
                    "Ensure proper tools and safety equipment"
                ],
                "methods": [
                    {
                        "method": "Liquid charging",
                        "application": "Initial charge, large amounts",
                        "procedure": "Charge into liquid line with system off",
                        "safety": "Never liquid charge into suction line"
                    },
                    {
                        "method": "Vapor charging",
                        "application": "Topping off, small amounts",
                        "procedure": "Charge into suction line with system running",
                        "monitoring": "Watch pressures and temperatures"
                    },
                    {
                        "method": "Weighing in",
                        "application": "Precise charging",
                        "equipment": "Electronic scale",
                        "accuracy": "Most precise method available"
                    }
                ]
            },
            "leak-detection": {
                "methods": [
                    {
                        "method": "Electronic leak detector",
                        "sensitivity": "Very high (0.1 oz/year)",
                        "advantages": ["Fast detection", "Precise location"],
                        "limitations": ["Requires calibration", "Affected by wind"]
                    },
                    {
                        "method": "Soap solution",
                        "sensitivity": "Moderate (1-2 oz/year)",
                        "advantages": ["Visual confirmation", "Inexpensive"],
                        "applications": ["Accessible joints", "Verification"]
                    },
                    {
                        "method": "UV dye",
                        "sensitivity": "High with UV light",
                        "advantages": ["Permanent marking", "Multiple leak detection"],
                        "procedure": "Inject dye, operate system, inspect with UV light"
                    }
                ],
                "repair-requirements": {
                    "commercial": "Leaks >30% annual charge must be repaired",
                    "industrial": "Leaks >20% annual charge must be repaired",
                    "timeline": "30 days for initial repair attempt"
                }
            }
        }
    },

    "repair-techniques": {
        "title": "HVAC Repair Techniques and Component Replacement",
        "description": "Comprehensive guide to repair procedures and component replacement",
        "icon": "🔧",
        "general-repair-principles": {
            "title": "General Repair Guidelines",
            "safety-first": [
                "Always follow lockout/tagout procedures",
                "Verify power is off before beginning work",
                "Use proper PPE for all repair activities",
                "Check for gas leaks before and after repairs",
                "Ensure proper ventilation during repairs"
            ],
            "documentation": {
                "before-repair": ["Take photos of wiring connections", "Document system settings", "Record operating pressures/temperatures"],
                "during-repair": ["Note part numbers and specifications", "Document any additional issues found"],
                "after-repair": ["Test all safety systems", "Verify proper operation", "Update service records"]
            },
            "quality-assurance": [
                "Use only manufacturer-approved parts",
                "Follow torque specifications",
                "Perform leak tests after refrigerant work",
                "Test all electrical connections",
                "Verify system performance meets specifications"
            ]
        },
        "electrical-component-replacement": {
            "title": "Electrical Component Replacement Procedures",
            "contactors-relays": {
                "common-failures": ["Burned contacts", "Coil failure", "Mechanical wear", "Overheating"],
                "replacement-steps": [
                    "Turn off power and verify with meter",
                    "Take photo of wire connections",
                    "Label wires before disconnecting",
                    "Remove mounting screws",
                    "Install new contactor with same specifications",
                    "Reconnect wires per photo/diagram",
                    "Test operation before closing panels"
                ],
                "specifications": "Match voltage, amperage, and pole configuration exactly",
                "testing": "Check coil resistance and contact continuity"
            },
            "capacitors": {
                "types": [
                    {
                        "type": "Start capacitor",
                        "function": "Provides starting torque for single-phase motors",
                        "characteristics": "High microfarad rating, short duty cycle",
                        "failure-symptoms": ["Motor won't start", "Humming noise", "Tripped breaker"]
                    },
                    {
                        "type": "Run capacitor",
                        "function": "Improves motor efficiency during operation",
                        "characteristics": "Lower microfarad rating, continuous duty",
                        "failure-symptoms": ["Reduced efficiency", "Motor overheating", "High amp draw"]
                    },
                    {
                        "type": "Dual capacitor",
                        "function": "Combines start and run functions",
                        "applications": ["Condenser fan and compressor"],
                        "failure-symptoms": ["One or both motors affected"]
                    }
                ],
                "replacement-procedure": [
                    "Turn off power and discharge capacitor safely",
                    "Note wire terminal connections (C, HERM, FAN)",
                    "Remove mounting bracket",
                    "Match microfarad rating and voltage exactly",
                    "Install new capacitor with proper orientation",
                    "Reconnect wires to correct terminals",
                    "Test motor operation"
                ],
                "safety-warning": "Always discharge capacitors before handling - can retain charge even when power is off"
            },
            "motors": {
                "condenser-fan-motors": {
                    "common-failures": ["Bearing wear", "Winding failure", "Shaft damage", "Capacitor issues"],
                    "replacement-steps": [
                        "Remove fan blade (note rotation direction)",
                        "Disconnect electrical connections",
                        "Remove motor mounting bolts",
                        "Install new motor with same specifications",
                        "Reinstall fan blade in correct direction",
                        "Reconnect electrical per wiring diagram",
                        "Test rotation direction and operation"
                    ],
                    "specifications": "Match horsepower, voltage, RPM, and rotation"
                },
                "blower-motors": {
                    "types": ["PSC (Permanent Split Capacitor)", "ECM (Electronically Commutated)", "Variable speed"],
                    "replacement-considerations": [
                        "Match airflow requirements",
                        "Verify mounting configuration",
                        "Check electrical compatibility",
                        "Program ECM motors if required"
                    ],
                    "installation-tips": [
                        "Balance blower wheel after installation",
                        "Check belt tension and alignment",
                        "Verify proper clearances",
                        "Test all speed taps"
                    ]
                }
            }
        },
        "mechanical-component-replacement": {
            "title": "Mechanical Component Replacement",
            "compressor-replacement": {
                "preparation": [
                    "Recover refrigerant completely",
                    "Disconnect electrical connections",
                    "Remove refrigerant lines",
                    "Document oil type and quantity"
                ],
                "installation-steps": [
                    "Install new compressor with proper orientation",
                    "Connect refrigerant lines with new fittings",
                    "Add proper amount and type of oil",
                    "Install filter drier",
                    "Evacuate system thoroughly",
                    "Charge with proper refrigerant amount",
                    "Test operation and check for leaks"
                ],
                "critical-points": [
                    "Never energize compressor without proper oil",
                    "Ensure proper evacuation before charging",
                    "Check rotation direction on 3-phase units",
                    "Monitor operating pressures during startup"
                ]
            },
            "heat-exchanger-replacement": {
                "evaporator-coils": {
                    "access-requirements": "May require significant disassembly",
                    "considerations": [
                        "Match coil capacity and configuration",
                        "Verify refrigerant line connections",
                        "Check condensate drain requirements",
                        "Ensure proper airflow patterns"
                    ],
                    "installation-tips": [
                        "Use proper brazing techniques",
                        "Purge with nitrogen during brazing",
                        "Test for leaks before final assembly",
                        "Verify condensate drainage"
                    ]
                },
                "condenser-coils": {
                    "outdoor-considerations": ["Weather protection during installation", "Proper refrigerant line routing"],
                    "performance-factors": [
                        "Coil face area and fin density",
                        "Refrigerant circuiting",
                        "Fan motor compatibility",
                        "Clearance requirements"
                    ]
                }
            },
            "expansion-device-replacement": {
                "txv-replacement": {
                    "procedure": [
                        "Recover refrigerant from system",
                        "Remove old valve and sensing bulb",
                        "Install new valve with proper orientation",
                        "Position sensing bulb correctly",
                        "Insulate sensing bulb properly",
                        "Evacuate and recharge system",
                        "Adjust superheat setting"
                    ],
                    "sensing-bulb-location": "Suction line, 4-6 inches from evaporator outlet, insulated",
                    "adjustment": "Turn clockwise to increase superheat, counterclockwise to decrease"
                },
                "orifice-replacement": {
                    "sizing": "Must match system capacity and operating conditions",
                    "installation": [
                        "Ensure proper flow direction",
                        "Use appropriate removal tools",
                        "Check for debris in line",
                        "Install with correct orientation"
                    ]
                }
            }
        },
        "refrigerant-system-repairs": {
            "title": "Refrigerant System Repair Procedures",
            "leak-repair": {
                "preparation": [
                    "Locate leak precisely",
                    "Clean area around leak",
                    "Determine repair method",
                    "Gather appropriate materials"
                ],
                "repair-methods": [
                    {
                        "method": "Brazing",
                        "applications": ["Copper tubing", "Permanent repairs"],
                        "procedure": "Clean, flux, heat, and braze with proper rod",
                        "safety": "Use nitrogen purge, proper ventilation"
                    },
                    {
                        "method": "Mechanical fittings",
                        "applications": ["Temporary repairs", "Accessible locations"],
                        "types": ["Compression fittings", "Flare fittings"],
                        "limitations": "Not suitable for all pressures/temperatures"
                    },
                    {
                        "method": "Sealants",
                        "applications": ["Very small leaks", "Emergency repairs"],
                        "caution": "Use only approved HVAC sealants",
                        "limitations": "Temporary solution only"
                    }
                ],
                "post-repair-testing": [
                    "Pressure test repair area",
                    "Evacuate system if opened",
                    "Recharge to proper level",
                    "Monitor for 24-48 hours",
                    "Document repair in service records"
                ]
            },
            "system-contamination": {
                "moisture-removal": {
                    "causes": ["System opened to atmosphere", "Failed filter drier", "Leak repairs"],
                    "symptoms": ["Ice formation", "Acid formation", "Reduced capacity"],
                    "removal-procedure": [
                        "Install oversized filter drier",
                        "Evacuate to deep vacuum",
                        "Hold vacuum for extended period",
                        "Replace filter drier again if necessary",
                        "Test acid levels in oil"
                    ]
                },
                "acid-contamination": {
                    "causes": ["Compressor burnout", "Moisture in system", "Overheating"],
                    "cleanup-procedure": [
                        "Replace compressor and filter drier",
                        "Flush system with approved solvent",
                        "Install acid cleanup filter drier",
                        "Run system and monitor oil",
                        "Replace filter drier until oil tests clean"
                    ],
                    "testing": "Use acid test kit on compressor oil"
                }
            }
        },
        "preventive-replacement": {
            "title": "Preventive Component Replacement",
            "scheduled-replacements": [
                {
                    "component": "Air filters",
                    "frequency": "1-3 months depending on usage",
                    "importance": "Maintains airflow and indoor air quality"
                },
                {
                    "component": "Filter driers",
                    "frequency": "Every 2-3 years or after system opening",
                    "importance": "Prevents moisture and acid damage"
                },
                {
                    "component": "Belts",
                    "frequency": "Annually or when showing wear",
                    "importance": "Prevents unexpected failures"
                },
                {
                    "component": "Contactors",
                    "frequency": "Every 5-7 years or when contacts show wear",
                    "importance": "Prevents electrical failures"
                }
            ],
            "inspection-criteria": {
                "visual-inspection": ["Corrosion", "Physical damage", "Loose connections", "Wear patterns"],
                "performance-testing": ["Electrical readings", "Pressure measurements", "Temperature readings"],
                "replacement-triggers": ["Out-of-specification readings", "Visible damage", "Age-based replacement"]
            }
        }
    },

    "case-studies": {
        "title": "Real-World HVAC Troubleshooting Case Studies",
        "description": "Practical scenarios and solutions from field experience",
        "icon": "📋",
        "no-cooling-scenarios": {
            "title": "No Cooling Troubleshooting Cases",
            "case-1": {
                "scenario": "Residential AC unit not cooling, fan running but compressor not starting",
                "symptoms": ["Indoor temperature rising", "Condenser fan operating", "No compressor operation", "Normal thermostat operation"],
                "diagnostic-steps": [
                    "Check electrical supply to outdoor unit",
                    "Measure voltage at contactor",
                    "Test contactor coil and contacts",
                    "Check compressor windings",
                    "Verify capacitor operation"
                ],
                "findings": "Defective run capacitor - measured 15 μF instead of rated 45 μF",
                "solution": "Replaced dual run capacitor with exact OEM specification",
                "root-cause": "Capacitor failure due to age and heat exposure",
                "prevention": "Recommend capacitor replacement every 5-7 years as preventive maintenance"
            },
            "case-2": {
                "scenario": "Commercial rooftop unit short cycling, inadequate cooling",
                "symptoms": ["Unit starts and stops frequently", "High head pressure", "Reduced airflow", "Overheating compressor"],
                "diagnostic-steps": [
                    "Monitor operating pressures",
                    "Check condenser coil condition",
                    "Verify refrigerant charge",
                    "Test high pressure switch",
                    "Inspect condenser fan operation"
                ],
                "findings": "Severely blocked condenser coil reducing heat rejection",
                "solution": "Thoroughly cleaned condenser coil and checked refrigerant charge",
                "root-cause": "Lack of regular maintenance allowing debris accumulation",
                "prevention": "Implement quarterly condenser coil cleaning schedule"
            },
            "case-3": {
                "scenario": "Heat pump not cooling, heating mode works fine",
                "symptoms": ["No cooling in summer mode", "Normal heating operation", "Reversing valve energized", "Proper refrigerant pressures in heat mode"],
                "diagnostic-steps": [
                    "Check reversing valve operation",
                    "Test solenoid coil resistance",
                    "Verify pilot pressure",
                    "Listen for valve movement",
                    "Check for refrigerant leaks"
                ],
                "findings": "Reversing valve stuck in heating position due to contamination",
                "solution": "Replaced reversing valve and filter drier, evacuated and recharged system",
                "root-cause": "System contamination from previous compressor failure",
                "prevention": "Proper system cleanup after compressor failures"
            }
        },
        "electrical-failure-scenarios": {
            "title": "Electrical System Failure Cases",
            "case-1": {
                "scenario": "Furnace blower runs continuously, no heating",
                "symptoms": ["Blower motor runs constantly", "No gas ignition", "Thermostat calling for heat", "Normal gas supply"],
                "diagnostic-steps": [
                    "Check thermostat wiring",
                    "Test control board inputs/outputs",
                    "Verify limit switch operation",
                    "Check ignition sequence",
                    "Test flame sensor"
                ],
                "findings": "Thermostat wire short causing continuous G (fan) signal",
                "solution": "Repaired damaged thermostat wire and verified proper operation",
                "root-cause": "Wire damage from rodent activity in attic",
                "prevention": "Install wire protection and seal entry points"
            },
            "case-2": {
                "scenario": "AC unit trips breaker immediately upon startup",
                "symptoms": ["Breaker trips instantly", "No component operation", "High amp draw on startup", "Recent electrical work"],
                "diagnostic-steps": [
                    "Check for short circuits",
                    "Test individual component resistance",
                    "Verify proper wiring connections",
                    "Check compressor windings",
                    "Test contactor operation"
                ],
                "findings": "Compressor winding short to ground",
                "solution": "Replaced compressor, filter drier, and performed acid cleanup",
                "root-cause": "Compressor failure due to electrical surge",
                "prevention": "Install surge protection device"
            },
            "case-3": {
                "scenario": "Heat pump auxiliary heat not operating",
                "symptoms": ["Inadequate heating in cold weather", "Heat pump running normally", "Backup heat not energizing", "High heating costs"],
                "diagnostic-steps": [
                    "Check outdoor temperature sensor",
                    "Test auxiliary heat contactors",
                    "Verify thermostat programming",
                    "Check heat strip elements",
                    "Test defrost control operation"
                ],
                "findings": "Defective outdoor temperature sensor reading incorrect temperature",
                "solution": "Replaced outdoor temperature sensor and calibrated system",
                "root-cause": "Sensor failure due to moisture infiltration",
                "prevention": "Ensure proper sensor sealing and protection"
            }
        },
        "refrigerant-system-scenarios": {
            "title": "Refrigerant System Problem Cases",
            "case-1": {
                "scenario": "AC cooling but ice formation on evaporator coil",
                "symptoms": ["Ice buildup on indoor coil", "Reduced airflow", "Low suction pressure", "High superheat initially, then low"],
                "diagnostic-steps": [
                    "Check airflow across evaporator",
                    "Measure superheat and subcooling",
                    "Test expansion valve operation",
                    "Verify refrigerant charge",
                    "Check for restrictions"
                ],
                "findings": "Dirty air filter causing reduced airflow and low evaporator temperature",
                "solution": "Replaced air filter, defrosted coil, and verified proper operation",
                "root-cause": "Lack of regular filter maintenance",
                "prevention": "Implement monthly filter inspection schedule"
            },
            "case-2": {
                "scenario": "Heat pump low heating capacity, high electric bills",
                "symptoms": ["Insufficient heating", "Frequent auxiliary heat operation", "Normal cooling operation", "High superheat in heating mode"],
                "diagnostic-steps": [
                    "Check refrigerant charge",
                    "Test expansion valve operation",
                    "Verify outdoor coil condition",
                    "Check for refrigerant leaks",
                    "Monitor defrost operation"
                ],
                "findings": "Low refrigerant charge due to small leak in outdoor coil",
                "solution": "Repaired leak, evacuated system, and recharged to proper level",
                "root-cause": "Coil damage from lawn equipment",
                "prevention": "Install protective barriers around outdoor unit"
            },
            "case-3": {
                "scenario": "Commercial chiller high head pressure and temperature",
                "symptoms": ["High condensing pressure", "High discharge temperature", "Reduced capacity", "Compressor cycling on high pressure"],
                "diagnostic-steps": [
                    "Check condenser water flow",
                    "Test cooling tower operation",
                    "Verify water treatment",
                    "Check for non-condensables",
                    "Test purge unit operation"
                ],
                "findings": "Scale buildup in condenser tubes reducing heat transfer",
                "solution": "Chemically cleaned condenser tubes and improved water treatment",
                "root-cause": "Inadequate water treatment program",
                "prevention": "Implement comprehensive water treatment and monitoring"
            }
        },
        "complex-system-scenarios": {
            "title": "Complex Multi-System Problem Cases",
            "case-1": {
                "scenario": "Building with multiple zones having uneven temperatures",
                "symptoms": ["Some zones too hot, others too cold", "Constant thermostat adjustments", "High energy consumption", "Occupant complaints"],
                "diagnostic-steps": [
                    "Check damper operation in each zone",
                    "Verify airflow measurements",
                    "Test zone control sensors",
                    "Check ductwork for leaks",
                    "Verify system balancing"
                ],
                "findings": "Improperly balanced system with blocked dampers and duct leaks",
                "solution": "Rebalanced system, repaired duct leaks, and calibrated zone controls",
                "root-cause": "Poor initial installation and lack of commissioning",
                "prevention": "Proper system commissioning and regular balancing verification"
            },
            "case-2": {
                "scenario": "Hospital HVAC system with humidity control issues",
                "symptoms": ["High humidity in critical areas", "Condensation problems", "Mold growth concerns", "Patient comfort complaints"],
                "diagnostic-steps": [
                    "Monitor humidity levels throughout facility",
                    "Check dehumidification equipment",
                    "Verify outside air ventilation",
                    "Test building envelope integrity",
                    "Check reheat system operation"
                ],
                "findings": "Oversized cooling system short cycling, inadequate dehumidification",
                "solution": "Installed variable speed drives and enhanced dehumidification controls",
                "root-cause": "System oversizing during original design",
                "prevention": "Proper load calculations and equipment sizing"
            }
        },
        "diagnostic-lessons": {
            "title": "Key Diagnostic Lessons from Case Studies",
            "systematic-approach": [
                "Always follow logical troubleshooting sequence",
                "Document findings at each step",
                "Don't assume - verify with measurements",
                "Consider multiple potential causes",
                "Think about system interactions"
            ],
            "common-mistakes": [
                "Jumping to conclusions without proper diagnosis",
                "Replacing components without understanding root cause",
                "Ignoring safety procedures under time pressure",
                "Not considering environmental factors",
                "Failing to verify repair effectiveness"
            ],
            "best-practices": [
                "Use proper test equipment and calibrate regularly",
                "Take before and after measurements",
                "Communicate findings clearly to customers",
                "Recommend preventive measures",
                "Follow up to ensure lasting solutions"
            ],
            "troubleshooting-tips": [
                "Start with simple, obvious checks first",
                "Use manufacturer diagnostic procedures",
                "Consider recent changes or service work",
                "Look for patterns in failure modes",
                "Don't overlook basic maintenance issues"
            ]
        }
    },

    "preventive-maintenance": {
        "title": "Preventive Maintenance Schedules and Procedures",
        "description": "Comprehensive maintenance programs to prevent failures and optimize performance",
        "icon": "🔧",
        "maintenance-philosophy": {
            "title": "Preventive Maintenance Principles",
            "benefits": [
                "Reduces unexpected breakdowns and emergency calls",
                "Extends equipment life and maintains warranty coverage",
                "Improves energy efficiency and reduces operating costs",
                "Maintains indoor air quality and occupant comfort",
                "Identifies potential problems before they become major issues"
            ],
            "cost-analysis": {
                "preventive-cost": "$1 spent on preventive maintenance",
                "reactive-cost": "$3-5 saved in reactive repairs",
                "energy-savings": "5-15% reduction in energy consumption",
                "equipment-life": "25-50% extension of equipment lifespan"
            },
            "program-elements": [
                "Regular inspection schedules",
                "Systematic component replacement",
                "Performance monitoring and trending",
                "Documentation and record keeping",
                "Staff training and certification"
            ]
        },
        "residential-maintenance": {
            "title": "Residential HVAC Maintenance Schedules",
            "monthly-tasks": {
                "homeowner-tasks": [
                    {
                        "task": "Check and replace air filters",
                        "frequency": "Monthly or as needed",
                        "importance": "Maintains airflow and indoor air quality",
                        "procedure": "Remove old filter, check size, install new filter with airflow arrow pointing toward unit"
                    },
                    {
                        "task": "Clear debris from outdoor unit",
                        "frequency": "Monthly during operating season",
                        "importance": "Ensures proper airflow and heat transfer",
                        "procedure": "Remove leaves, grass, and debris from around condenser unit, maintain 2-foot clearance"
                    },
                    {
                        "task": "Check thermostat operation",
                        "frequency": "Monthly",
                        "importance": "Ensures proper system control",
                        "procedure": "Test heating and cooling modes, verify temperature accuracy, check battery if applicable"
                    }
                ]
            },
            "seasonal-maintenance": {
                "spring-startup": [
                    "Test cooling system operation",
                    "Clean condenser coil",
                    "Check refrigerant levels",
                    "Inspect electrical connections",
                    "Lubricate motors and bearings",
                    "Test safety controls",
                    "Check condensate drain"
                ],
                "fall-preparation": [
                    "Test heating system operation",
                    "Inspect heat exchanger",
                    "Check gas connections and pressure",
                    "Test ignition system",
                    "Inspect venting system",
                    "Check belt tension and condition",
                    "Test carbon monoxide detectors"
                ]
            },
            "annual-professional-service": {
                "cooling-system": [
                    "Measure refrigerant pressures and temperatures",
                    "Check superheat and subcooling",
                    "Test compressor amp draw",
                    "Inspect and clean evaporator coil",
                    "Check ductwork for leaks",
                    "Calibrate thermostat",
                    "Test safety switches and controls"
                ],
                "heating-system": [
                    "Perform combustion analysis",
                    "Inspect heat exchanger for cracks",
                    "Check gas pressure and flow",
                    "Test flame sensor and ignition",
                    "Inspect venting and flue",
                    "Check blower motor and wheel",
                    "Test limit switches and rollout switches"
                ]
            }
        },
        "commercial-maintenance": {
            "title": "Commercial HVAC Maintenance Programs",
            "daily-checks": [
                "Monitor system operation and alarms",
                "Check building temperature and humidity",
                "Verify proper equipment operation",
                "Document any unusual conditions",
                "Check filter differential pressure"
            ],
            "weekly-tasks": [
                "Inspect belts for wear and proper tension",
                "Check motor amp draws",
                "Verify damper operation",
                "Test emergency systems",
                "Check water treatment systems"
            ],
            "monthly-maintenance": [
                "Replace or clean air filters",
                "Lubricate motors and bearings",
                "Check refrigerant levels",
                "Inspect electrical connections",
                "Test safety controls and alarms",
                "Check condensate drains",
                "Verify control system operation"
            ],
            "quarterly-service": [
                "Clean condenser and evaporator coils",
                "Inspect ductwork and insulation",
                "Check building automation system",
                "Test backup power systems",
                "Perform vibration analysis",
                "Check water treatment chemistry",
                "Inspect roof and equipment supports"
            ],
            "annual-overhaul": [
                "Comprehensive system inspection",
                "Replace wear components",
                "Perform infrared thermography",
                "Test and calibrate all controls",
                "Update preventive maintenance procedures",
                "Review energy consumption trends",
                "Plan capital improvements"
            ]
        },
        "component-specific-maintenance": {
            "title": "Component-Specific Maintenance Procedures",
            "compressors": {
                "reciprocating": {
                    "monthly": ["Check oil level and condition", "Monitor operating pressures", "Listen for unusual noises"],
                    "quarterly": ["Check valve operation", "Test unloading systems", "Inspect suction and discharge lines"],
                    "annually": ["Change oil and filter", "Check piston and cylinder wear", "Test safety controls"]
                },
                "scroll": {
                    "monthly": ["Monitor discharge temperature", "Check electrical connections", "Verify proper operation"],
                    "quarterly": ["Check mounting and vibration", "Inspect refrigerant lines", "Test capacity control"],
                    "annually": ["Comprehensive electrical testing", "Check scroll wear indicators", "Verify refrigerant charge"]
                },
                "screw": {
                    "weekly": ["Check oil level and pressure", "Monitor separator pressure drop", "Verify cooling water flow"],
                    "monthly": ["Check oil filter condition", "Monitor vibration levels", "Test capacity control"],
                    "annually": ["Change oil and filters", "Inspect rotors and housing", "Overhaul oil system"]
                }
            },
            "heat-exchangers": {
                "air-cooled-condensers": {
                    "monthly": ["Clean coil surfaces", "Check fan operation", "Inspect for damage"],
                    "quarterly": ["Check fan motor amp draw", "Inspect fan blades", "Verify proper airflow"],
                    "annually": ["Pressure test coil", "Check refrigerant distribution", "Inspect mounting and supports"]
                },
                "water-cooled-condensers": {
                    "monthly": ["Check water flow and temperature", "Monitor pressure drop", "Test water treatment"],
                    "quarterly": ["Clean tube surfaces", "Check for scale buildup", "Inspect water boxes"],
                    "annually": ["Eddy current testing", "Chemical cleaning if needed", "Pressure test tubes"]
                },
                "evaporators": {
                    "monthly": ["Check coil condition", "Verify proper drainage", "Monitor superheat"],
                    "quarterly": ["Clean coil surfaces", "Check for ice formation", "Inspect insulation"],
                    "annually": ["Pressure test coil", "Check refrigerant distribution", "Verify capacity"]
                }
            },
            "controls-and-electrical": {
                "thermostats": {
                    "monthly": ["Check temperature accuracy", "Test all modes", "Verify programming"],
                    "annually": ["Calibrate sensors", "Update software", "Replace batteries"]
                },
                "contactors-and-relays": {
                    "quarterly": ["Check contact condition", "Test coil operation", "Verify proper operation"],
                    "annually": ["Replace if showing wear", "Check electrical connections", "Test under load"]
                },
                "motors": {
                    "monthly": ["Check amp draw", "Listen for unusual noises", "Verify proper operation"],
                    "quarterly": ["Lubricate bearings", "Check belt tension", "Inspect connections"],
                    "annually": ["Megger test windings", "Check bearing condition", "Verify rotation"]
                }
            }
        },
        "maintenance-documentation": {
            "title": "Maintenance Documentation and Record Keeping",
            "required-records": [
                "Equipment inventory and specifications",
                "Maintenance schedules and procedures",
                "Service history and repairs",
                "Performance data and trends",
                "Parts inventory and usage",
                "Energy consumption records",
                "Warranty information"
            ],
            "documentation-benefits": [
                "Tracks equipment performance trends",
                "Identifies recurring problems",
                "Supports warranty claims",
                "Helps plan replacement schedules",
                "Demonstrates compliance",
                "Assists in troubleshooting"
            ],
            "digital-tools": {
                "cmms-systems": {
                    "features": ["Work order management", "Preventive maintenance scheduling", "Inventory tracking", "Cost analysis"],
                    "benefits": ["Automated scheduling", "Historical data analysis", "Mobile access", "Reporting capabilities"]
                },
                "iot-monitoring": {
                    "sensors": ["Temperature", "Pressure", "Vibration", "Energy consumption"],
                    "benefits": ["Real-time monitoring", "Predictive maintenance", "Remote diagnostics", "Automated alerts"]
                }
            }
        },
        "energy-efficiency-maintenance": {
            "title": "Energy Efficiency Through Maintenance",
            "efficiency-impacts": [
                {
                    "component": "Dirty air filters",
                    "efficiency-loss": "5-15%",
                    "maintenance": "Regular replacement",
                    "frequency": "Monthly to quarterly"
                },
                {
                    "component": "Dirty coils",
                    "efficiency-loss": "10-25%",
                    "maintenance": "Regular cleaning",
                    "frequency": "Quarterly to annually"
                },
                {
                    "component": "Refrigerant charge",
                    "efficiency-loss": "5-20%",
                    "maintenance": "Proper charging",
                    "frequency": "Annual verification"
                },
                {
                    "component": "Belt slippage",
                    "efficiency-loss": "2-5%",
                    "maintenance": "Proper tensioning",
                    "frequency": "Quarterly inspection"
                }
            ],
            "optimization-procedures": [
                "Calibrate control systems regularly",
                "Optimize operating schedules",
                "Maintain proper refrigerant charge",
                "Keep heat transfer surfaces clean",
                "Ensure proper airflow",
                "Monitor and trend energy consumption"
            ]
        },
        "maintenance-safety": {
            "title": "Safety in Maintenance Operations",
            "safety-procedures": [
                "Follow lockout/tagout procedures",
                "Use proper personal protective equipment",
                "Test for hazardous atmospheres",
                "Ensure proper ventilation",
                "Have emergency procedures in place",
                "Maintain first aid and safety equipment"
            ],
            "hazard-identification": [
                "Electrical hazards from live circuits",
                "Chemical hazards from refrigerants",
                "Physical hazards from rotating equipment",
                "Thermal hazards from hot surfaces",
                "Fall hazards from elevated work",
                "Confined space hazards"
            ],
            "emergency-procedures": [
                "Refrigerant leak response",
                "Electrical accident procedures",
                "Fire emergency response",
                "Medical emergency procedures",
                "Equipment failure response",
                "Communication protocols"
            ]
        }
    },

    // Troubleshooting Methodology
    'troubleshooting-methodology': {
        'systematic-approach': {
            title: 'Systematic Troubleshooting Methodology',
            description: 'Comprehensive problem-solving approach for HVAC systems',
            icon: 'fas fa-search',
            phases: {
                'phase1-preparation': {
                    title: 'Phase 1: Preparation and Safety',
                    steps: [
                        {
                            step: 'Gather customer information',
                            details: 'Symptoms, duration, recent changes, maintenance history',
                            importance: 'Provides initial diagnostic direction'
                        },
                        {
                            step: 'Review system documentation',
                            details: 'Wiring diagrams, service manuals, previous service records',
                            importance: 'Understanding system design and history'
                        },
                        {
                            step: 'Perform safety assessment',
                            details: 'Power isolation, gas leak check, PPE verification',
                            importance: 'Ensures safe working conditions'
                        },
                        {
                            step: 'Prepare tools and equipment',
                            details: 'Multimeter, gauges, thermometer, safety equipment',
                            importance: 'Efficient diagnosis requires proper tools'
                        }
                    ]
                },
                'phase2-observation': {
                    title: 'Phase 2: Initial Observation and Assessment',
                    steps: [
                        {
                            step: 'Visual inspection',
                            details: 'Look for obvious damage, loose connections, wear signs',
                            checklist: ['Electrical connections', 'Refrigerant lines', 'Ductwork', 'Components']
                        },
                        {
                            step: 'Listen for abnormal sounds',
                            details: 'Grinding, squealing, clicking, rattling noises',
                            significance: 'Often indicates specific component failures'
                        },
                        {
                            step: 'Check for unusual odors',
                            details: 'Burning, gas, refrigerant, musty smells',
                            action: 'May require immediate safety response'
                        },
                        {
                            step: 'Observe system operation',
                            details: 'Startup sequence, cycling behavior, performance',
                            note: 'Document normal vs abnormal operation'
                        }
                    ]
                },
                'phase3-systematic-testing': {
                    title: 'Phase 3: Systematic Testing and Measurement',
                    approach: 'Follow logical sequence from power source to end components',
                    steps: [
                        {
                            step: 'Electrical system verification',
                            tests: ['Voltage at disconnect', 'Control circuit continuity', 'Component resistance'],
                            tools: 'Multimeter, clamp meter'
                        },
                        {
                            step: 'Mechanical system assessment',
                            tests: ['Belt tension', 'Motor operation', 'Fan performance'],
                            tools: 'Belt tension gauge, tachometer'
                        },
                        {
                            step: 'Refrigeration system analysis',
                            tests: ['Pressure readings', 'Temperature measurements', 'Superheat/subcooling'],
                            tools: 'Manifold gauges, thermometer'
                        },
                        {
                            step: 'Airflow and ductwork evaluation',
                            tests: ['Static pressure', 'Airflow measurement', 'Filter condition'],
                            tools: 'Manometer, anemometer'
                        }
                    ]
                },
                'phase4-analysis': {
                    title: 'Phase 4: Data Analysis and Diagnosis',
                    process: [
                        {
                            step: 'Compare measurements to specifications',
                            action: 'Use manufacturer data and industry standards',
                            documentation: 'Record all readings and deviations'
                        },
                        {
                            step: 'Identify patterns and relationships',
                            analysis: 'How symptoms relate to measurements',
                            consideration: 'Multiple causes may create similar symptoms'
                        },
                        {
                            step: 'Develop hypothesis',
                            approach: 'Most likely cause based on evidence',
                            validation: 'Test hypothesis with additional measurements'
                        },
                        {
                            step: 'Isolate root cause',
                            method: 'Eliminate variables systematically',
                            confirmation: 'Verify diagnosis before proceeding to repair'
                        }
                    ]
                },
                'phase5-solution': {
                    title: 'Phase 5: Solution Implementation',
                    steps: [
                        {
                            step: 'Plan repair approach',
                            considerations: ['Safety requirements', 'Part availability', 'Customer approval'],
                            documentation: 'Estimate time and cost'
                        },
                        {
                            step: 'Execute repair safely',
                            protocol: 'Follow manufacturer procedures',
                            safety: 'Maintain lockout/tagout throughout'
                        },
                        {
                            step: 'Test repair effectiveness',
                            verification: 'Confirm problem resolution',
                            measurement: 'Re-test all affected parameters'
                        },
                        {
                            step: 'System performance validation',
                            testing: 'Full operational cycle',
                            documentation: 'Record final measurements and settings'
                        }
                    ]
                }
            },
            'best-practices': {
                'documentation': {
                    importance: 'Critical for quality service and liability protection',
                    requirements: ['All measurements', 'Symptoms observed', 'Tests performed', 'Parts replaced', 'Final settings']
                },
                'customer-communication': {
                    timing: 'Keep customer informed throughout process',
                    content: ['Findings explanation', 'Repair options', 'Cost estimates', 'Prevention recommendations']
                },
                'quality-assurance': {
                    verification: 'Double-check all work before completion',
                    testing: 'Operate system through complete cycle',
                    cleanup: 'Leave work area clean and organized'
                }
            }
        }
    },

    // Central Air Conditioning Systems
    'central-air': {
        'cooling': {
            steps: [
                {
                    title: 'Pre-Work Safety Assessment',
                    description: 'Critical safety evaluation before any HVAC work',
                    icon: 'fas fa-exclamation-triangle',
                    content: {
                        type: 'checklist',
                        items: [
                            'Verify all electrical power is OFF at breaker panel',
                            'Check for gas odors - evacuate if detected',
                            'Ensure adequate lighting and ventilation in work area',
                            'Confirm you have proper PPE: safety glasses, gloves, non-slip footwear',
                            'Identify emergency shutoffs for gas, water, and electricity',
                            'Have emergency contact numbers available',
                            'Check that carbon monoxide detectors are functional',
                            'Ensure someone knows you are working on HVAC equipment'
                        ]
                    }
                },
                {
                    title: 'Pre-Work Safety Assessment',
                    description: 'Critical safety evaluation before any HVAC work',
                    icon: 'fas fa-exclamation-triangle',
                    content: {
                        type: 'checklist',
                        items: [
                            'Verify all electrical power is OFF at breaker panel',
                            'Check for gas odors - evacuate if detected',
                            'Ensure adequate lighting and ventilation in work area',
                            'Confirm you have proper PPE: safety glasses, gloves, non-slip footwear',
                            'Identify emergency shutoffs for gas, water, and electricity',
                            'Have emergency contact numbers available',
                            'Check that carbon monoxide detectors are functional',
                            'Ensure someone knows you are working on HVAC equipment'
                        ]
                    }
                },
                {
                    title: 'Initial System Assessment',
                    description: 'Comprehensive system evaluation and safety checks',
                    icon: 'fas fa-search',
                    content: {
                        type: 'checklist',
                        items: [
                            'Verify thermostat is set to COOL mode and below room temperature',
                            'Check main electrical panel - ensure AC breaker is ON',
                            'Inspect outdoor unit for power and operation',
                            'Listen for unusual sounds (grinding, squealing, banging)',
                            'Check for visible refrigerant leaks around outdoor unit',
                            'Verify indoor unit blower is operating'
                        ]
                    }
                },
                {
                    title: 'Air Filter and Airflow Analysis',
                    description: 'Critical airflow components that affect 80% of cooling issues',
                    icon: 'fas fa-filter',
                    content: {
                        type: 'question',
                        question: 'What is the condition of your air filter?',
                        options: [
                            { value: 'clean', text: 'Clean/Recently replaced (within 1-3 months)' },
                            { value: 'dirty', text: 'Visibly dirty but not completely blocked' },
                            { value: 'very-dirty', text: 'Heavily soiled or completely blocked' },
                            { value: 'unknown', text: 'Haven\'t checked in over 6 months' }
                        ]
                    }
                },
                {
                    title: 'Refrigerant System Evaluation',
                    description: 'Check for proper refrigerant levels and system pressures',
                    icon: 'fas fa-thermometer-half',
                    content: {
                        type: 'checklist',
                        items: [
                            'Check for ice formation on indoor evaporator coils',
                            'Measure supply air temperature (should be 15-20°F below return air)',
                            'Inspect outdoor coils for dirt, debris, or damage',
                            'Check refrigerant lines for proper insulation',
                            'Look for oil stains indicating refrigerant leaks',
                            'Verify outdoor fan motor operation and blade condition'
                        ]
                    }
                },
                {
                    title: 'Electrical System Diagnostics',
                    description: 'Comprehensive electrical component testing',
                    icon: 'fas fa-bolt',
                    content: {
                        type: 'question',
                        question: 'Which electrical components have you verified?',
                        options: [
                            { value: 'all-working', text: 'All components appear to be functioning' },
                            { value: 'some-issues', text: 'Some components not working properly' },
                            { value: 'major-issues', text: 'Multiple electrical problems detected' },
                            { value: 'not-checked', text: 'Haven\'t performed electrical checks' }
                        ]
                    }
                },
                {
                    title: 'Performance Testing and Measurements',
                    description: 'Quantitative system performance evaluation',
                    icon: 'fas fa-chart-line',
                    content: {
                        type: 'question',
                        question: 'What is the temperature differential between supply and return air?',
                        options: [
                            { value: 'normal', text: '15-20°F difference (normal operation)' },
                            { value: 'low', text: '10-14°F difference (reduced efficiency)' },
                            { value: 'very-low', text: 'Less than 10°F difference (poor performance)' },
                            { value: 'unknown', text: 'Haven\'t measured temperatures' }
                        ]
                    }
                }
            ],
            diagnoses: {
                'dirty-filter-blockage': {
                    condition: (responses) => responses['what-is-the-condition-of-your-air-filter?'] === 'very-dirty' || responses['what-is-the-condition-of-your-air-filter?'] === 'unknown',
                    title: 'Severe Air Filter Blockage',
                    description: 'Heavily soiled air filter is restricting airflow and causing system inefficiency. This is the most common cause of AC problems.',
                    steps: [
                        'IMMEDIATELY turn off the system to prevent damage',
                        'Locate the air filter (typically in return air duct or near indoor unit)',
                        'Remove and inspect the filter - note the size (e.g., 16x25x1)',
                        'Replace with a new filter of identical dimensions',
                        'Ensure airflow arrow points toward the unit/ductwork',
                        'Check that filter fits snugly with no air gaps',
                        'Turn system back on and monitor for 30 minutes',
                        'Schedule filter replacement every 1-3 months depending on usage'
                    ]
                },
                'refrigerant-leak': {
                    condition: (responses) => responses['what-is-the-temperature-differential-between-supply-and-return-air?'] === 'very-low',
                    title: 'Refrigerant System Issue',
                    description: 'Low temperature differential indicates possible refrigerant leak or system undercharge.',
                    steps: [
                        'DO NOT attempt to add refrigerant yourself',
                        'Check for ice formation on indoor coils (if present, turn off system)',
                        'Look for oil stains around outdoor unit connections',
                        'Check refrigerant line insulation for damage',
                        'Contact EPA-certified HVAC technician for refrigerant service',
                        'Expect technician to perform leak detection and pressure testing',
                        'Repair any leaks before adding refrigerant',
                        'System may need evacuation and recharge'
                    ]
                },
                'electrical-malfunction': {
                    condition: (responses) => responses['which-electrical-components-have-you-verified?'] === 'major-issues',
                    title: 'Electrical System Malfunction',
                    description: 'Multiple electrical issues detected requiring professional diagnosis.',
                    steps: [
                        'Turn off power at main breaker for safety',
                        'Check and reset any tripped breakers',
                        'Inspect visible wiring for damage or burning',
                        'DO NOT attempt electrical repairs yourself',
                        'Contact licensed HVAC technician immediately',
                        'Provide technician with specific symptoms observed',
                        'May require capacitor, contactor, or motor replacement'
                    ]
                },
                'condenser-coil-blockage': {
                    condition: (responses) => responses['what-is-the-temperature-differential-between-supply-and-return-air?'] === 'low',
                    title: 'Condenser Coil Cleaning Required',
                    description: 'Dirty outdoor coils are reducing heat transfer efficiency.',
                    steps: [
                        'Turn off power to outdoor unit',
                        'Remove debris within 2-3 feet of outdoor unit',
                        'Gently spray coils with garden hose (low pressure)',
                        'Use coil cleaner for heavy buildup (follow manufacturer instructions)',
                        'Allow coils to dry completely before restoring power',
                        'Trim vegetation to maintain proper clearance',
                        'Schedule annual professional coil cleaning'
                    ]
                }
            }
        },
        'heating': {
            steps: [
                {
                    title: 'Heat Pump Safety and Mode Check',
                    description: 'Verify proper heat pump operation and safety systems',
                    icon: 'fas fa-shield-alt',
                    content: {
                        type: 'checklist',
                        items: [
                            'Set thermostat to HEAT mode, 5°F above room temperature',
                            'Check that heat pump outdoor unit is running',
                            'Verify auxiliary/emergency heat settings',
                            'Listen for unusual noises during operation',
                            'Check for ice buildup on outdoor coils',
                            'Ensure outdoor unit has proper clearance'
                        ]
                    }
                },
                {
                    title: 'Defrost Cycle Assessment',
                    description: 'Evaluate automatic defrost system operation',
                    icon: 'fas fa-snowflake',
                    content: {
                        type: 'question',
                        question: 'How does the outdoor unit handle frost/ice buildup?',
                        options: [
                            { value: 'normal-defrost', text: 'Automatically defrosts every 30-90 minutes' },
                            { value: 'excessive-ice', text: 'Heavy ice buildup that doesn\'t clear' },
                            { value: 'no-defrost', text: 'No defrost cycle observed' },
                            { value: 'frequent-defrost', text: 'Defrost cycles too frequently' }
                        ]
                    }
                }
            ],
            diagnoses: {
                'defrost-system-failure': {
                    condition: (responses) => responses['how-does-the-outdoor-unit-handle-frost/ice-buildup?'] === 'excessive-ice',
                    title: 'Defrost System Malfunction',
                    description: 'Heat pump defrost system is not operating properly, causing ice buildup.',
                    steps: [
                        'Turn off heat pump to prevent damage',
                        'Switch to auxiliary/emergency heat temporarily',
                        'Allow ice to melt naturally (do not use hot water)',
                        'Check defrost sensor and control board',
                        'Contact HVAC technician for defrost system repair',
                        'May require defrost timer, sensor, or reversing valve replacement'
                    ]
                }
            }
        },
        'airflow': {
            steps: [
                {
                    title: 'Ductwork and Vents Inspection',
                    description: 'Comprehensive airflow system evaluation',
                    icon: 'fas fa-wind',
                    content: {
                        type: 'checklist',
                        items: [
                            'Check all supply vents for obstructions',
                            'Verify return air vents are not blocked',
                            'Inspect visible ductwork for disconnections',
                            'Look for duct damage or collapsed sections',
                            'Check dampers are in proper position',
                            'Measure airflow at multiple vents'
                        ]
                    }
                }
            ]
        }
    },

    // Gas Furnace Systems
    'furnace': {
        'heating': {
            steps: [
                {
                    title: 'Gas Furnace Safety Inspection',
                    description: 'Critical safety checks before any diagnosis',
                    icon: 'fas fa-shield-alt',
                    content: {
                        type: 'checklist',
                        items: [
                            'CRITICAL: If you smell gas, evacuate immediately and call gas company from outside',
                            'Check for gas odors around furnace, gas line, and meter',
                            'Verify furnace area is clear of combustible materials (minimum 3-foot clearance)',
                            'Inspect venting system for blockages, damage, or disconnections',
                            'Check that furnace access panels are properly secured',
                            'Ensure adequate combustion air supply (check air intake vents)',
                            'Verify carbon monoxide detectors are functional and have fresh batteries',
                            'Test gas shutoff valve operation (should turn easily)',
                            'Check for proper grounding of electrical components',
                            'Ensure emergency gas shutoff tool is accessible',
                            'Verify no storage of flammable materials near furnace',
                            'Check that furnace filter access is clear and unobstructed'
                        ]
                    }
                },
                {
                    title: 'Ignition System Evaluation',
                    description: 'Assess furnace ignition and flame characteristics',
                    icon: 'fas fa-fire',
                    content: {
                        type: 'question',
                        question: 'What type of ignition system does your furnace have?',
                        options: [
                            { value: 'electronic', text: 'Electronic ignition (no pilot light)' },
                            { value: 'pilot-light', text: 'Standing pilot light' },
                            { value: 'hot-surface', text: 'Hot surface igniter' },
                            { value: 'unknown', text: 'Not sure about ignition type' }
                        ]
                    }
                },
                {
                    title: 'Heat Exchanger and Combustion Analysis',
                    description: 'Critical safety component inspection',
                    icon: 'fas fa-search',
                    content: {
                        type: 'checklist',
                        items: [
                            'Visually inspect heat exchanger for cracks or corrosion',
                            'Check flame pattern and color (should be blue)',
                            'Verify proper draft through venting system',
                            'Listen for unusual combustion sounds',
                            'Check for soot or corrosion around heat exchanger',
                            'Ensure proper clearances around furnace'
                        ]
                    }
                }
            ],
            diagnoses: {
                'ignition-failure': {
                    condition: (responses) => responses['what-type-of-ignition-system-does-your-furnace-have?'] === 'electronic',
                    title: 'Electronic Ignition System Failure',
                    description: 'Electronic ignition components may need replacement or adjustment.',
                    steps: [
                        'Check electrical connections to ignition system',
                        'Verify gas supply valve is fully open',
                        'Clean ignition sensor with fine steel wool',
                        'Check for proper flame sensor operation',
                        'Contact technician if igniter glows but no flame appears',
                        'May require igniter, flame sensor, or control board replacement'
                    ]
                },
                'heat-exchanger-concern': {
                    condition: (responses) => true, // Always include this critical safety check
                    title: 'Heat Exchanger Safety Check Required',
                    description: 'Heat exchanger integrity is critical for safe operation and carbon monoxide prevention.',
                    steps: [
                        'IMMEDIATELY shut down furnace if cracks are visible',
                        'Do not operate furnace with damaged heat exchanger',
                        'Schedule immediate professional inspection',
                        'Consider carbon monoxide testing',
                        'Heat exchanger replacement may be required',
                        'Evaluate furnace age and efficiency for replacement decision'
                    ]
                }
            }
        }
    },

    // Heat Pump Systems
    'heat-pump': {
        'cooling': {
            // Inherit from central-air cooling with heat pump specific additions
            steps: [
                {
                    title: 'Heat Pump Mode Verification',
                    description: 'Ensure proper cooling mode operation',
                    icon: 'fas fa-sync-alt',
                    content: {
                        type: 'checklist',
                        items: [
                            'Verify thermostat is set to COOL mode',
                            'Check that reversing valve is in cooling position',
                            'Confirm outdoor unit fan direction (should blow air up/out)',
                            'Listen for reversing valve operation when switching modes',
                            'Check refrigerant line temperatures (suction line should be cold)'
                        ]
                    }
                }
            ]
        },
        'heating': {
            // Reference the heating steps defined above
            steps: [] // Will be populated from central-air heating steps
        }
    },

    // Boiler Systems
    'boiler': {
        'heating': {
            steps: [
                {
                    title: 'Boiler Safety and Pressure Check',
                    description: 'Critical safety systems and pressure evaluation',
                    icon: 'fas fa-gauge-high',
                    content: {
                        type: 'checklist',
                        items: [
                            'CRITICAL: Check boiler pressure gauge (should be 12-15 PSI when cold)',
                            'WARNING: If pressure exceeds 30 PSI, shut down immediately',
                            'Verify safety relief valve is not leaking or weeping',
                            'Inspect for water leaks around boiler, piping, and connections',
                            'Check that circulator pumps are operating when heat is called',
                            'Verify thermostat calls for heat properly',
                            'Listen for unusual noises: banging, whistling, or grinding sounds',
                            'Ensure proper electrical grounding of boiler and pumps',
                            'Check that boiler room has adequate ventilation',
                            'Verify emergency shutoff switches are accessible and labeled',
                            'Test low water cutoff safety device (if equipped)',
                            'Ensure no combustible materials are stored near boiler',
                            'Check that pressure relief valve discharge pipe drains safely'
                        ]
                    }
                },
                {
                    title: 'Water System and Circulation',
                    description: 'Hydronic system performance evaluation',
                    icon: 'fas fa-water',
                    content: {
                        type: 'question',
                        question: 'How is the hot water circulation in your heating system?',
                        options: [
                            { value: 'good', text: 'All zones heat evenly and quickly' },
                            { value: 'uneven', text: 'Some areas heat better than others' },
                            { value: 'slow', text: 'Takes a long time to heat up' },
                            { value: 'no-heat', text: 'No heat in some or all zones' }
                        ]
                    }
                }
            ],
            diagnoses: {
                'low-water-pressure': {
                    condition: (responses) => true, // Pressure check is always critical
                    title: 'Boiler Water Pressure Issue',
                    description: 'Improper water pressure can cause heating problems and system damage.',
                    steps: [
                        'Check pressure gauge reading when system is cold',
                        'If pressure is below 12 PSI, system needs water',
                        'Locate and slowly open water feed valve',
                        'Fill to 12-15 PSI, then close feed valve',
                        'If pressure drops quickly, check for leaks',
                        'Contact technician if frequent pressure loss occurs'
                    ]
                },
                'circulation-problem': {
                    condition: (responses) => responses['how-is-the-hot-water-circulation-in-your-heating-system?'] === 'uneven',
                    title: 'Hydronic Circulation Issues',
                    description: 'Uneven heating indicates circulation pump or zone valve problems.',
                    steps: [
                        'Check that all zone valves are operating',
                        'Verify circulator pumps are running when heat is called',
                        'Bleed air from radiators or baseboard units',
                        'Check for closed or stuck zone dampers',
                        'May require pump replacement or zone valve repair',
                        'Consider system balancing by HVAC professional'
                    ]
                }
            }
        }
    },

    // Window Unit Systems
    'window-unit': {
        'cooling': {
            steps: [
                {
                    title: 'Window Unit Basic Inspection',
                    description: 'Essential checks for window AC units',
                    icon: 'fas fa-window-maximize',
                    content: {
                        type: 'checklist',
                        items: [
                            'Check that unit is properly plugged in and getting power',
                            'Verify settings on unit controls',
                            'Inspect air filter (usually behind front grille)',
                            'Check that outdoor portion has adequate clearance',
                            'Listen for unusual noises or vibrations',
                            'Ensure unit is level and properly supported'
                        ]
                    }
                }
            ],
            diagnoses: {
                'window-unit-maintenance': {
                    condition: (responses) => true,
                    title: 'Window Unit Maintenance Required',
                    description: 'Regular maintenance will restore efficiency and extend unit life.',
                    steps: [
                        'Clean or replace air filter monthly during use',
                        'Clean condenser coils on outdoor side',
                        'Straighten any bent coil fins carefully',
                        'Check and clean condensate drain',
                        'Ensure proper window seal around unit',
                        'Consider professional service if problems persist'
                    ]
                }
            }
        }
    },

    // Mini Split Systems
    'mini-split': {
        'cooling': {
            steps: [
                {
                    title: 'Mini Split System Check',
                    description: 'Ductless system evaluation',
                    icon: 'fas fa-home',
                    content: {
                        type: 'checklist',
                        items: [
                            'Check remote control batteries and settings',
                            'Verify indoor unit air filters are clean',
                            'Inspect outdoor unit for debris or damage',
                            'Check refrigerant line insulation',
                            'Ensure proper drainage from indoor unit',
                            'Verify all indoor units are responding to controls'
                        ]
                    }
                }
            ]
        }
    }
};
