const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const deployDir = path.join(root, 'deploy');
const buildDir = path.join(root, 'build');

function copyRecursive(src, dest) {
  const stats = fs.statSync(src);
  if (stats.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
      copyRecursive(path.join(src, entry.name), path.join(dest, entry.name));
    }
    return;
  }
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
}

if (!fs.existsSync(buildDir)) {
  throw new Error('Build-Ordner nicht gefunden. Bitte erst react-scripts build ausführen.');
}

for (const entry of fs.readdirSync(deployDir, { withFileTypes: true })) {
  copyRecursive(path.join(deployDir, entry.name), path.join(buildDir, entry.name));
}

console.log('Deploy-Dateien für Apache/PHP wurden in den Build-Ordner kopiert.');
