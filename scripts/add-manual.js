const fs = require('fs');
const path = require('path');
const readline = require('readline');

const uploadsDir = path.join(__dirname, '..', 'uploads');
const manualsDir = path.join(__dirname, '..', 'public', 'manuals');
const manualsJsonPath = path.join(__dirname, '..', 'public', 'sample-manuals.json');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const askQuestion = (query) => {
  return new Promise(resolve => rl.question(query, resolve));
};

async function processFiles() {
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
    console.log('Created `uploads` directory. Please add your manual files there and run the script again.');
    return;
  }

  const files = fs.readdirSync(uploadsDir).filter(f => f !== '.gitkeep');

  if (files.length === 0) {
    console.log('No files found in the `uploads` directory. Please add files to upload.');
    return;
  }

  const manuals = JSON.parse(fs.readFileSync(manualsJsonPath, 'utf-8'));

  for (const file of files) {
    console.log(`\n--- Processing: ${file} ---`);
    const title = await askQuestion('Enter manual title: ');
    const category = await askQuestion('Enter category (e.g., equipment-manuals, technical-guides): ');
    const subcategory = await askQuestion('Enter subcategory (e.g., Furnaces, Electrical): ');
    const description = await askQuestion('Enter a brief description: ');

    const sourcePath = path.join(uploadsDir, file);
    const destPath = path.join(manualsDir, file);

    fs.renameSync(sourcePath, destPath);

    const stats = fs.statSync(destPath);

    const newManual = {
      id: (manuals.length + 1).toString(),
      title,
      category,
      subcategory,
      description,
      fileName: file,
      fileSize: stats.size,
      fileType: 'application/pdf', // Defaulting, could be improved
      url: `/manuals/${file}`,
      uploadDate: new Date().toISOString(),
      isPublic: true
    };

    manuals.unshift(newManual); // Add to the beginning of the list
    console.log(`Added '${title}' to the library.`);
  }

  fs.writeFileSync(manualsJsonPath, JSON.stringify(manuals, null, 2));
  console.log('\nSuccessfully updated the manuals library!');
}

processFiles().finally(() => rl.close());
