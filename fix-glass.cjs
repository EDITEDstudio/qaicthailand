const fs = require('fs');

const files = [
  'src/App.tsx',
  'src/components/InfoSections.tsx',
  'src/components/DiagnosticQuiz.tsx'
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  // Replace light mode card backgrounds with glassmorphism
  content = content.replace(/'bg-white border border-gray-100 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500\/5'/g, 
    "'bg-white/40 backdrop-blur-[35px] border border-white/40 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)] hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/5'");

  content = content.replace(/'bg-white border border-gray-150\/50'/g, 
    "'bg-white/40 backdrop-blur-[35px] border border-white/40 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)]'");

  content = content.replace(/'bg-gray-50 border border-gray-100'/g, 
    "'bg-white/30 backdrop-blur-[30px] border border-white/40 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)]'");

  content = content.replace(/"bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm"/g, 
    '"bg-white/40 backdrop-blur-[35px] border border-white/40 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)] rounded-2xl overflow-hidden"');

  fs.writeFileSync(file, content);
});
console.log('Done replacing glass backgrounds');
