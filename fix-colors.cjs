const fs = require('fs');

const files = [
  'src/App.tsx',
  'src/components/InfoSections.tsx',
  'src/components/DiagnosticQuiz.tsx'
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  // Replace text-gray-X with dark variants if they don't have them
  // Use regex lookahead to ensure we don't duplicate
  
  content = content.replace(/text-gray-900(?!\s+dark:text-)/g, 'text-gray-900 dark:text-white');
  content = content.replace(/text-gray-800(?!\s+dark:text-)/g, 'text-gray-800 dark:text-slate-100');
  content = content.replace(/text-gray-700(?!\s+dark:text-)/g, 'text-gray-700 dark:text-slate-200');
  content = content.replace(/text-gray-600(?!\s+dark:text-)/g, 'text-gray-800 dark:text-slate-300'); // the user wanted dark gray for light text
  content = content.replace(/text-gray-500(?!\s+dark:text-)/g, 'text-gray-700 dark:text-slate-400');
  content = content.replace(/text-gray-400(?!\s+dark:text-)/g, 'text-gray-600 dark:text-slate-500');

  // Replace backgrounds with glassmorphism
  // For InfoSections & DiagnosticQuiz
  // E.g. bg-white -> isDarkMode ? glass dark : glass light
  // Wait, if it's already using isDarkMode, we can't just blindly replace.
  
  fs.writeFileSync(file, content);
});
console.log('Done replacing colors');
