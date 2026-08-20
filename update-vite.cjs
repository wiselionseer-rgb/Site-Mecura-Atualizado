const fs = require('fs');
let code = fs.readFileSync('vite.config.ts', 'utf8');

const pwaImport = `import { VitePWA } from 'vite-plugin-pwa';\n`;
code = pwaImport + code;

const pluginsStr = `plugins: [
      react(), 
      tailwindcss(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.svg', 'apple-touch-icon.png', 'masked-icon.svg'],
        manifest: {
          name: 'Instituto Mecura',
          short_name: 'Mecura',
          description: 'Facilitando o acesso seguro, legal e humanizado ao tratamento com Cannabis Medicinal.',
          theme_color: '#0a0a0a',
          background_color: '#0a0a0a',
          display: 'standalone',
          icons: [
            {
              src: 'pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png'
            },
            {
              src: 'pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png'
            }
          ]
        }
      })
    ],`;

code = code.replace(/plugins: \[react\(\), tailwindcss\(\)\],/, pluginsStr);

fs.writeFileSync('vite.config.ts', code);
