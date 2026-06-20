const fs = require('fs');

let content = fs.readFileSync('src/components/AboutSection.tsx', 'utf8');

// The messed up container in AboutSection:
const badContainer1 = "rounded-[2.5rem] p-8 md:p-12 space-y-10 shadow-2xl bg-gray-900 text-white shadow-blue-900/10 dark:bg-slate-900/40 dark:border dark:border-slate-800 dark:text-white dark:shadow-slate-950/20";

const badContainer2 = "rounded-[2.5rem] p-8 md:p-12 space-y-8 shadow-sm border bg-white/40 backdrop-blur-[35px] border border-white/40 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)] text-slate-900 dark:bg-slate-900/20 dark:border-slate-850 dark:text-white dark:shadow-slate-950/20";

const goodGlassContainer = "rounded-[2.5rem] p-8 md:p-12 space-y-8 bg-white/40 backdrop-blur-[35px] border border-white/40 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)] dark:bg-slate-900/40 dark:border-white/20 dark:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.2)] relative overflow-hidden";

content = content.replace(badContainer1, goodGlassContainer);
// there are 2 badContainer2
content = content.split(badContainer2).join(goodGlassContainer);

fs.writeFileSync('src/components/AboutSection.tsx', content);
console.log('Fixed glass containers');
