import { copyFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');
const distDir = join(rootDir, 'dist');

if (!existsSync(distDir)) {
  console.error('dist folder not found. Run "npm run build" first.');
  process.exit(1);
}

copyFileSync(
  join(rootDir, 'manifest.json'),
  join(distDir, 'manifest.json')
);

const iconsDir = join(distDir, 'icons');
if (!existsSync(iconsDir)) {
  mkdirSync(iconsDir, { recursive: true });
}

const sizes = [16, 48, 128];
sizes.forEach(size => {
  const srcPath = join(rootDir, 'public', 'icons', `icon${size}.png`);
  const destPath = join(iconsDir, `icon${size}.png`);
  if (existsSync(srcPath)) {
    copyFileSync(srcPath, destPath);
  }
});

console.log('Extension build complete! Load the "dist" folder in Chrome.');
