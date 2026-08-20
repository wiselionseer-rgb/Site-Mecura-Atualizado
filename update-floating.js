const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const floatingCode = `
function FloatingWhatsApp() {
  return (
    <a 
      href="https://wa.me/5566996280883" 
      target="_blank" 
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 md:bottom-10 md:right-10 w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(37,211,102,0.3)] hover:scale-110 hover:shadow-[0_0_30px_rgba(37,211,102,0.5)] transition-all duration-300 z-50 group"
      aria-label="Fale conosco pelo WhatsApp"
    >
      <MessageCircle className="w-7 h-7" />
      <span className="absolute right-full mr-4 bg-surface-elevated text-white text-xs font-sans px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-border">
        Fale conosco
      </span>
    </a>
  );
}
`;

code = code.replace('export default function App() {', floatingCode + '\nexport default function App() {');
code = code.replace('<Footer />', '<Footer />\n      <FloatingWhatsApp />');

fs.writeFileSync('src/App.tsx', code);
