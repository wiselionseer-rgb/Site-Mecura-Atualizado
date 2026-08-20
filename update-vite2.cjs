const fs = require('fs');
let code = fs.readFileSync('vite.config.ts', 'utf8');

const updatedStr = `icons: [
            {
              src: 'favicon.svg',
              sizes: '192x192',
              type: 'image/svg+xml'
            },
            {
              src: 'favicon.svg',
              sizes: '512x512',
              type: 'image/svg+xml'
            }
          ]`;
code = code.replace(/icons: \[[\s\S]*?\]/, updatedStr);
fs.writeFileSync('vite.config.ts', code);
