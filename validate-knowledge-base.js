const fs = require('fs');
const path = require('path');

function validateKnowledgeBase(kb) {
  let errors = [];
  // Validate safety-protocols
  if (!kb['safety-protocols'] || typeof kb['safety-protocols'] !== 'object') {
    errors.push('Missing or invalid safety-protocols section.');
  } else {
    for (const [key, section] of Object.entries(kb['safety-protocols'])) {
      if (!section.title) errors.push(`safety-protocols.${key} missing title`);
      if (!Array.isArray(section.procedures)) errors.push(`safety-protocols.${key} missing procedures array`);
      if (!Array.isArray(section.tags)) errors.push(`safety-protocols.${key} missing tags array`);
      if (!section.difficulty) errors.push(`safety-protocols.${key} missing difficulty`);
      if (!Array.isArray(section.references)) errors.push(`safety-protocols.${key} missing references array`);
    }
  }
  // Validate troubleshooting
  if (!kb.troubleshooting || typeof kb.troubleshooting !== 'object') {
    errors.push('Missing or invalid troubleshooting section.');
  } else {
    for (const [key, flow] of Object.entries(kb.troubleshooting)) {
      if (!flow.title) errors.push(`troubleshooting.${key} missing title`);
      if (!Array.isArray(flow.systemTypes)) errors.push(`troubleshooting.${key} missing systemTypes array`);
      if (!Array.isArray(flow.steps)) errors.push(`troubleshooting.${key} missing steps array`);
      if (!Array.isArray(flow.safetyWarnings)) errors.push(`troubleshooting.${key} missing safetyWarnings array`);
      if (!Array.isArray(flow.tags)) errors.push(`troubleshooting.${key} missing tags array`);
      if (!flow.difficulty) errors.push(`troubleshooting.${key} missing difficulty`);
    }
  }
  return errors;
}

function main() {
  const kbPath = path.join(__dirname, 'data', 'hvac-knowledge-base.json');
  let kbRaw;
  try {
    kbRaw = fs.readFileSync(kbPath, 'utf-8');
  } catch (e) {
    console.error('Could not read knowledge base file:', e.message);
    process.exit(1);
  }
  let kb;
  try {
    kb = JSON.parse(kbRaw);
  } catch (e) {
    console.error('Invalid JSON:', e.message);
    process.exit(1);
  }
  const errors = validateKnowledgeBase(kb);
  if (errors.length) {
    console.error('Knowledge base validation failed:');
    errors.forEach(err => console.error(' -', err));
    process.exit(1);
  } else {
    console.log('Knowledge base validation passed.');
  }
}

if (require.main === module) {
  main();
}
