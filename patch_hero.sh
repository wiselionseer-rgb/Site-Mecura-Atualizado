#!/bin/bash
awk '
/className="text-\[22vw\] md:text-\[16vw\]/ {
print "             <h1 className=\"text-[18vw] md:text-[13vw] leading-[0.95] tracking-tighter font-display uppercase m-0 flex flex-col\">"
print "                <span className=\"block overflow-hidden pt-4 pb-2 md:pt-8 md:pb-6 -mt-4 md:-mt-8\">"
print "                  <motion.span initial={{y:\"100%\"}} animate={{y:0}} transition={{duration:1.4, ease:[0.16,1,0.3,1]}} className=\"block text-transparent [-webkit-text-stroke:2px_rgba(255,255,255,0.8)] md:[-webkit-text-stroke:4px_rgba(255,255,255,0.8)] hover:text-white transition-colors duration-700\">"
print "                    ME"
print "                  </motion.span>"
print "                </span>"
print "                <span className=\"block overflow-hidden pl-[10vw] md:pl-[20vw] pt-4 pb-2 md:pt-8 md:pb-6 -mt-4 md:-mt-8\">"
print "                  <motion.span "
print "                    initial={{y:\"100%\"}} "
print "                    animate={{y:0}} "
print "                    transition={{duration:1.4, delay:0.1, ease:[0.16,1,0.3,1]}} "
print "                    className=\"block text-text-primary drop-shadow-2xl\""
print "                  >"
print "                    CURA<span className=\"text-accent\">.</span>"
print "                  </motion.span>"
print "                </span>"
print "             </h1>"
next
}
/span className="block overflow-hidden pt-4/ { skip=1; next }
/Me/ && skip { next }
/<\/span>/ && skip { skip=0; next }
/<span className="block overflow-hidden pl-\[5vw\]/ { skip2=1; next }
/CURA<span/ && skip2 { next }
/<\/span>/ && skip2 { skip2=0; next }
/<\/h1>/ && !skip && !skip2 { next }
{ print }
' src/App.tsx > src/App.tmp && mv src/App.tmp src/App.tsx
