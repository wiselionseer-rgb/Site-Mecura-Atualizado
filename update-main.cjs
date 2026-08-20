const fs = require('fs');
let code = fs.readFileSync('src/main.tsx', 'utf8');
code = `import { registerSW } from 'virtual:pwa-register';\n` + code;
code += `\nregisterSW({ immediate: true });\n`;
fs.writeFileSync('src/main.tsx', code);
