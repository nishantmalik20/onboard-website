import fs from 'fs';
import path from 'path';

const SRC_DIR = path.resolve('src');

// Recursively find all .jsx/.js/.tsx files
function findFiles(dir, ext = ['.jsx', '.js', '.tsx']) {
  let results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) results.push(...findFiles(full, ext));
    else if (ext.some(e => entry.name.endsWith(e))) results.push(full);
  }
  return results;
}

const files = findFiles(SRC_DIR);
let totalChanges = 0;

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  const original = content;

  // Replace /image-assets/filename.jpg → /image-assets/filename.webp
  // Replace /image-assets/filename.jpeg → /image-assets/filename.webp
  // Replace /image-assets/filename.png → /image-assets/filename.webp
  content = content.replace(/\/image-assets\/([^'"]+)\.(jpe?g|png)/g, (match, name, ext) => {
    return `/image-assets/${name}.webp`;
  });

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    const changes = (content.match(/\/image-assets\//g) || []).length;
    console.log(`Updated: ${path.relative(process.cwd(), file)}`);
    totalChanges++;
  }
}

console.log(`\nDone. Updated ${totalChanges} files.`);
