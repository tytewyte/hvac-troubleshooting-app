# HVAC PDF Knowledge Integration Guide

## How to Extract Knowledge from "Mastering HVAC Repair A Comprehensive Step-by-Step Course"

This guide will help you systematically extract procedures from your PDF and integrate them into the HVAC agent's knowledge base.

### 1. Knowledge Base Structure

The knowledge base is organized as:

```text
System Type → Problem Category → Steps/Diagnoses
```

**System Types:**

- `central-air` - Central air conditioning
- `heat-pump` - Heat pump systems  
- `furnace` - Gas/oil furnaces
- `boiler` - Hot water/steam boilers
- `window-unit` - Window AC units
- `mini-split` - Ductless mini-split systems

**Problem Categories:**

- `cooling` - AC and cooling issues
- `heating` - Heating problems
- `airflow` - Ventilation and airflow
- `electrical` - Electrical components

### 2. Step Format

Each diagnostic step follows this structure:

```javascript
{
    title: 'Step Name',
    description: 'Brief explanation of what this step accomplishes',
    icon: 'fas fa-icon-name', // Font Awesome icon
    content: {
        type: 'checklist' | 'question',
        // For checklist:
        items: ['Item 1', 'Item 2', ...]
        // For question:
        question: 'Question text?',
        options: [
            { value: 'option-key', text: 'Display text' }
        ]
    }
}
```

### 3. Diagnosis Format

Each diagnosis includes:

```javascript
'diagnosis-key': {
    condition: (responses) => /* logic to match user responses */,
    title: 'Problem Title',
    description: 'Detailed problem explanation',
    steps: [
        'Step 1 instruction',
        'Step 2 instruction',
        // ... more steps
    ]
}
```

### 4. PDF Extraction Process

#### Step 1: Identify Procedures by System Type

1. Open your PDF and locate sections for each HVAC system type
2. Look for troubleshooting flowcharts or step-by-step procedures
3. Note any safety warnings or critical checks

#### Step 2: Extract Diagnostic Steps

For each procedure in the PDF:

1. **Safety Checks** - Always include as first step
   - Gas leak detection
   - Electrical safety
   - Proper tool usage

2. **Initial Assessment** - Basic system verification
   - Power checks
   - Thermostat settings
   - Visual inspection

3. **Component Testing** - Specific component checks
   - Filters, coils, fans
   - Electrical components
   - Refrigerant system

4. **Performance Measurement** - Quantitative tests
   - Temperature readings
   - Pressure measurements
   - Airflow testing

#### Step 3: Create Diagnosis Logic

For each problem identified in the PDF:

1. **Identify Symptoms** - What user responses indicate this problem?
2. **Create Condition Logic** - Write JavaScript condition to match responses
3. **Extract Repair Steps** - Copy step-by-step repair instructions from PDF
4. **Add Safety Notes** - Include any warnings from the PDF

### 5. Example Integration

Here's how to add a new procedure from your PDF:

#### From PDF: "Furnace Won't Ignite"

```javascript
// Add to furnace → heating → steps
{
    title: 'Gas Supply and Ignition Check',
    description: 'Verify gas supply and ignition system operation',
    icon: 'fas fa-fire',
    content: {
        type: 'question',
        question: 'What happens when the furnace tries to start?',
        options: [
            { value: 'no-ignition', text: 'No ignition attempt at all' },
            { value: 'igniter-glows', text: 'Igniter glows but no flame' },
            { value: 'flame-starts-stops', text: 'Flame starts then goes out' },
            { value: 'normal-operation', text: 'Normal ignition and operation' }
        ]
    }
}

// Add corresponding diagnosis
'gas-valve-failure': {
    condition: (responses) => responses['what-happens-when-the-furnace-tries-to-start?'] === 'igniter-glows',
    title: 'Gas Valve or Supply Issue',
    description: 'Igniter is working but gas is not reaching the burners.',
    steps: [
        'Check that main gas valve to house is fully open',
        'Verify furnace gas valve is in ON position',
        'Listen for gas valve clicking when igniter glows',
        'Check for gas odor at furnace (if present, evacuate immediately)',
        'Contact gas company to verify gas pressure',
        'May require gas valve replacement by licensed technician'
    ]
}
```

### 6. Priority Areas to Extract

Focus on these high-impact areas from your PDF:

#### High Priority

1. **Safety procedures** - Gas leaks, electrical hazards, carbon monoxide
2. **Common problems** - Filter issues, thermostat problems, basic maintenance
3. **Diagnostic flowcharts** - Step-by-step troubleshooting sequences

#### Medium Priority

1. **Seasonal maintenance** - Pre-season checkups, winterization
2. **Performance optimization** - Efficiency improvements, system tuning
3. **Component replacement** - When and how to replace common parts

#### Lower Priority

1. **Advanced diagnostics** - Refrigerant charging, complex electrical
2. **Installation procedures** - New system installation
3. **Code compliance** - Building codes and regulations

### 7. Testing Your Additions

After adding new knowledge:

1. **Test the diagnostic flow** - Walk through the steps as a user would
2. **Verify condition logic** - Ensure diagnoses trigger correctly
3. **Check safety warnings** - Make sure critical safety info is prominent
4. **Validate repair steps** - Ensure instructions are clear and safe

### 8. File Locations

- **Main knowledge base**: `hvac-knowledge-base.js`
- **Application logic**: `hvac-agent.js`
- **User interface**: `hvac-agent.html`
- **Styling**: `hvac-styles.css`

### 9. Adding New System Types

To add a completely new system type:

1. Add system card to HTML (hvac-agent.html around line 37-62)
2. Add system to knowledge base structure
3. Update `getSystemDisplayName()` function
4. Create diagnostic steps and diagnoses for the new system

### 10. Best Practices

- **Keep safety first** - Always include safety checks as first steps
- **Use clear language** - Write for homeowners, not technicians
- **Include measurements** - Provide specific values when possible
- **Reference professional help** - Know when to recommend calling a technician
- **Test thoroughly** - Verify each diagnostic path works correctly

---

## Quick Reference: Common PDF Sections to Look For

- **Troubleshooting Charts** → Convert to diagnostic steps
- **Safety Warnings** → Include in first step of each procedure  
- **Symptom Lists** → Use for question options
- **Repair Procedures** → Convert to diagnosis steps
- **Maintenance Schedules** → Add to preventive care sections
- **Tool Requirements** → Include in step descriptions
- **Performance Specifications** → Use for measurement steps
