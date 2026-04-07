import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const INPUT_DIR = path.resolve('public/image-assets');
const OUTPUT_DIR = path.resolve('public/image-assets-optimized');
const MAX_WIDTH = 1600;
const WEBP_QUALITY = 80;

// Create output directory
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const files = fs.readdirSync(INPUT_DIR);
const imageFiles = files.filter(f => /\.(jpe?g|png)$/i.test(f));
const webpFiles = files.filter(f => /\.webp$/i.test(f));

console.log(`Found ${imageFiles.length} JPG/PNG files to convert`);
console.log(`Found ${webpFiles.length} WebP files to copy/optimize\n`);

let totalOriginal = 0;
let totalOptimized = 0;

// Convert JPG/PNG to WebP
for (const file of imageFiles) {
  const inputPath = path.join(INPUT_DIR, file);
  const baseName = file.replace(/\.(jpe?g|png)$/i, '');
  const outputPath = path.join(OUTPUT_DIR, `${baseName}.webp`);

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

// Copy existing WebP files (resize if oversized)
for (const file of webpFiles) {
  const inputPath = path.join(INPUT_DIR, file);
  const outputPath = path.join(OUTPUT_DIR, file);

  const originalSize = fs.statSync(inputPath).size;
  totalOriginal += originalSize;

  try {
    await sharp(inputPath)
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: WEBP_QUALITY })
      .toFile(outputPath);

    const newSize = fs.statSync(outputPath).size;
    totalOptimized += newSize;
    console.log(`✓ ${file} (kept webp, ${(originalSize/1024).toFixed(0)}KB → ${(newSize/1024).toFixed(0)}KB)`);
  } catch (err) {
    console.error(`✗ ${file}: ${err.message}`);
  }
}

console.log(`\n========================================`);
console.log(`Total original: ${(totalOriginal/1024/1024).toFixed(1)} MB`);
console.log(`Total optimized: ${(totalOptimized/1024/1024).toFixed(1)} MB`);
console.log(`Savings: ${((1 - totalOptimized/totalOriginal) * 100).toFixed(1)}%`);
console.log(`Output: ${OUTPUT_DIR}`);
