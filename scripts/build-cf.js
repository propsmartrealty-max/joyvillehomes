/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const nextDir = path.join(rootDir, '.next');
const publicDir = path.join(rootDir, 'public');
const serverAppDir = path.join(nextDir, 'server', 'app');

console.log('⚡ [Cloudflare Pages Packager] Assembling edge static bundle...');

// 0. Self-healing: compile Next.js if .next/server/app is not present
if (!fs.existsSync(serverAppDir)) {
  console.log('⚡ [Cloudflare Pages Packager] Pre-compiled assets not found. Running Next.js build...');
  execSync('node scripts/compile_blogs.js', { stdio: 'inherit', cwd: rootDir });
  execSync('npx next build', { stdio: 'inherit', cwd: rootDir });
}

// 1. Reset dist directory
if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true, force: true });
}
fs.mkdirSync(distDir, { recursive: true });

// 2. Copy public assets first (headers, redirects, images, robots, icons)
if (fs.existsSync(publicDir)) {
  fs.cpSync(publicDir, distDir, { recursive: true, force: true });
  console.log('✅ Synchronized public/ base assets, _headers, and _redirects');
}

// 3. Copy Next.js static chunks (_next/static)
const nextStaticDir = path.join(nextDir, 'static');
const distNextStaticDir = path.join(distDir, '_next', 'static');
if (fs.existsSync(nextStaticDir)) {
  fs.mkdirSync(path.dirname(distNextStaticDir), { recursive: true });
  fs.cpSync(nextStaticDir, distNextStaticDir, { recursive: true });
  console.log('✅ Copied _next/static to dist/_next/static/');
}

// 4. Walk .next/server/app and extract HTML/XML/JSON pages (overwriting public fallbacks)
let pageCount = 0;

function safeWriteFile(target, content) {
  try {
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, content);
  } catch {
    // Skip collisions
  }
}

function processServerDirectory(dir, routePrefix = '') {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (!entry.name.startsWith('_') && entry.name !== 'api' && !entry.name.endsWith('.segments')) {
        processServerDirectory(fullPath, path.join(routePrefix, entry.name));
      }
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      const content = fs.readFileSync(fullPath);
      const baseName = entry.name.replace(/\.html$/, '');

      if (baseName === 'index') {
        const dest = path.join(distDir, routePrefix, 'index.html');
        safeWriteFile(dest, content);
      } else {
        const destDir = path.join(distDir, routePrefix, baseName, 'index.html');
        const destFile = path.join(distDir, routePrefix, `${baseName}.html`);
        safeWriteFile(destDir, content);
        safeWriteFile(destFile, content);
      }
      pageCount++;
    } else if (entry.isFile() && entry.name.endsWith('.body')) {
      const content = fs.readFileSync(fullPath);
      const targetName = entry.name.replace(/\.body$/, '');
      const dest = path.join(distDir, routePrefix, targetName);
      safeWriteFile(dest, content);
      pageCount++;
    }
  }
}

processServerDirectory(serverAppDir);
console.log(`✅ Extracted ${pageCount} pre-rendered routes (HTML, XML, JSON)`);

// 5. Keep public/sitemap.xml synchronized with generated dist/sitemap.xml
const distSitemap = path.join(distDir, 'sitemap.xml');
if (fs.existsSync(distSitemap)) {
  fs.copyFileSync(distSitemap, path.join(publicDir, 'sitemap.xml'));
  console.log('✅ Synchronized public/sitemap.xml from compiled edge bundle');
}

// 6. Ensure root index.html exists
if (fs.existsSync(path.join(distDir, 'index.html'))) {
  console.log('✅ Verified root index.html present');
}

console.log(`🎉 Cloudflare Pages edge distribution ready in dist/ (Total files ready for edge)`);
