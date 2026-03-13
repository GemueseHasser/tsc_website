const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');
const imageExts = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif', '.svg']);

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function generateManifest(folderName) {
  const folderPath = path.join(publicDir, folderName);
  ensureDir(folderPath);

  const files = fs.readdirSync(folderPath, { withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter((name) => imageExts.has(path.extname(name).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, 'de', { numeric: true, sensitivity: 'base' }));

  fs.writeFileSync(
    path.join(folderPath, 'images.json'),
    JSON.stringify(files, null, 2) + '\n',
    'utf8'
  );

  console.log(`Manifest für ${folderName} erstellt (${files.length} Bilder).`);
}

generateManifest('presse');
generateManifest('vereinssee');
