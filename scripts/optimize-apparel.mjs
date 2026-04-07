import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const INPUT_DIR = path.resolve('public/product-marketing');
const MAX_WIDTH = 1600;
const WEBP_QUALITY = 80;

const files = fs.readdirSync(INPUT_DIR).filter(f => /\.(png|jpe?g)$/i.test(f));

console.log(`Found ${files.length} files to optimize\n`);

let totalOriginal = 0;
let totalOptimized = 0;

for (const file of files) {
  const inputPath = path.join(INPUT_DIR, file);
  // Rename tique -> toque during conversion
  let baseName = file.replace(/\.(png|jpe?g)$/i, '');
  if (baseName === 'tique') baseName = 'toque';
  const outputPath = path.join(INPUT_DIR, `${baseName}.webp`);

  const originalSize = fs.statSync(inputPath).size;
  totalOriginal += originalSize;

  try {
    await sharp(inputPath)
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: WEBP_QUALITY })
      .toFile(outputPath);

    const newSize = fs.statSync(outputPath).size;
    totalOptimized += newSize;
    const savings = ((1 - newSize / originalSize) * 100).toFixed(1);
    console.log(`✓ ${file} → ${baseName}.webp  (${(originalSize/1024/1024).toFixed(1)}MB → ${(newSize/1024).toFixed(0)}KB, -${savings}%)`);
  } catch (err) {
    console.error(`✗ ${file}: ${err.message}`);
  }
}

// Remove original PNGs after successful conversion
for (const file of files) {
  const inputPath = path.join(INPUT_DIR, file);
  fs.unlinkSync(inputPath);
  console.log(`Deleted original: ${file}`);
}

console.log(`\n========================================`);
console.log(`Total original: ${(totalOriginal/1024/1024).toFixed(1)} MB`);
console.log(`Total optimized: ${(totalOptimized/1024/1024).toFixed(1)} MB`);
console.log(`Savings: ${((1 - totalOptimized/totalOriginal) * 100).toFixed(1)}%`);
