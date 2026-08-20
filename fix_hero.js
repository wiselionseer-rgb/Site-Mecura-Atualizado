const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const heroRegex = /<h1 className="text-\[18vw\].*?<\/h1>[\s\S]*?(<div className="w-full flex justify-end md:-mt-12">)/;
const replacement = `<h1 className="text-[17vw] md:text-[14vw] leading-[1.0] tracking-tight font-display uppercase m-0 flex flex-col items-start mix-blend-difference">
                <span className="block overflow-hidden pb-2 md:pb-4">
                  <motion.span initial={{y:"100%"}} animate={{y:0}} transition={{duration:1.4, ease:[0.16,1,0.3,1]}} className="block text-transparent [-webkit-text-stroke:2px_rgba(255,255,255,0.7)] md:[-webkit-text-stroke:3px_rgba(255,255,255,0.7)] hover:text-white transition-colors duration-700">
                    ME
                  </motion.span>
                </span>
                <span className="block overflow-hidden pl-[5vw] md:pl-[10vw] pb-2 md:pb-4 -mt-4 md:-mt-12">
                  <motion.span 
                    initial={{y:"100%"}} 
                    animate={{y:0}} 
                    transition={{duration:1.4, delay:0.1, ease:[0.16,1,0.3,1]}} 
                    className="block text-white"
                  >
                    CURA<span className="text-accent">.</span>
                  </motion.span>
                </span>
             </h1>
             $1`;

let newCode = code;

// First let's remove the garbage left by awk.
// The garbage is after </h1> and before <div className="w-full flex justify-end md:-mt-12">
const toReplace = code.substring(code.indexOf('<h1 className="text-[18vw]'), code.indexOf('<div className="w-full flex justify-end md:-mt-12">'));

newCode = code.replace(toReplace, `<h1 className="text-[18vw] md:text-[14vw] leading-[0.95] tracking-tight font-display uppercase m-0 flex flex-col items-start relative z-20">
                <span className="block overflow-hidden pt-4 pb-2 md:pt-8 md:pb-6 -mt-4 md:-mt-8">
                  <motion.span initial={{y:"100%"}} animate={{y:0}} transition={{duration:1.4, ease:[0.16,1,0.3,1]}} className="block text-transparent [-webkit-text-stroke:3px_rgba(255,255,255,0.9)] hover:text-white transition-colors duration-700">
                    ME
                  </motion.span>
                </span>
                <span className="block overflow-hidden pl-[4vw] md:pl-[8vw] pt-4 pb-2 md:pt-8 md:pb-6 -mt-4 md:-mt-12">
                  <motion.span 
                    initial={{y:"100%"}} 
                    animate={{y:0}} 
                    transition={{duration:1.4, delay:0.1, ease:[0.16,1,0.3,1]}} 
                    className="block text-white"
                  >
                    CURA<span className="text-accent">.</span>
                  </motion.span>
                </span>
             </h1>
             `);

fs.writeFileSync('src/App.tsx', newCode);
