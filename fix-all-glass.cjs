const fs = require('fs');
const path = require('path');

const walkSync = function(dir, filelist) {
  files = fs.readdirSync(dir);
  filelist = filelist || [];
  files.forEach(function(file) {
    if (fs.statSync(dir + '/' + file).isDirectory()) {
      filelist = walkSync(dir + '/' + file, filelist);
    }
    else {
      if (file.endsWith('.tsx')) {
        filelist.push(dir + '/' + file);
      }
    }
  });
  return filelist;
};

const components = walkSync('src/components');
components.push('src/App.tsx'); // Include App.tsx

components.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  // We want to turn classNames that represent white cards into glassmorphism cards.
  // We'll replace occurrences of "bg-white " (with trailing space) followed by anything inside a className string.
  // Actually, replace `bg-white` if it's accompanied by `border-gray-100` or `p-4`, `p-6`, etc. inside className="..."
  // The simplest way is to match `bg-white` and replace it, but we need to remove the solid border-gray-X so it doesn't conflict.
  
  content = content.replace(/className="([^"]*)bg-white([^"]*)"/g, (match, prefix, suffix) => {
    // If it already has backdrop-blur, skip
    if (match.includes('backdrop-blur')) return match;
    // Skip small buttons or icons if they don't have large padding
    if (!match.includes('p-') && !match.includes('border') && !match.includes('rounded')) return match;
    
    // Remove solid border colors if present to allow glass borders
    let cleanSuffix = suffix.replace(/border-gray-[0-9]{3}(\/[0-9]{2})?/g, '').trim();
    let cleanPrefix = prefix.replace(/border-gray-[0-9]{3}(\/[0-9]{2})?/g, '').trim();
    
    // We add glass classes and dark mode variants!
    // Since dark variants might already exist for text, that's fine.
    // Ensure we only add dark bg if not present
    let glassClass = 'bg-white/40 backdrop-blur-[35px] border border-white/40 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)] dark:bg-slate-900/40 dark:border-white/20 dark:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.2)]';
    
    // clean up any duplicate dark:bg-
    cleanSuffix = cleanSuffix.replace(/dark:bg-[^\s]+/g, '');
    cleanPrefix = cleanPrefix.replace(/dark:bg-[^\s]+/g, '');
    
    return `className="${cleanPrefix ? cleanPrefix + ' ' : ''}${glassClass}${cleanSuffix ? ' ' + cleanSuffix : ''}"`;
  });

  // Handle template strings: className={`... bg-white ...`}
  content = content.replace(/className=\{`([^`]*?)bg-white([^`]*?)`\}/g, (match, prefix, suffix) => {
    if (match.includes('backdrop-blur')) return match;
    if (!match.includes('p-') && !match.includes('border') && !match.includes('rounded')) return match;
    
    let cleanSuffix = suffix.replace(/border-gray-[0-9]{3}(\/[0-9]{2})?/g, '').trim();
    let cleanPrefix = prefix.replace(/border-gray-[0-9]{3}(\/[0-9]{2})?/g, '').trim();
    
    let glassClass = 'bg-white/40 backdrop-blur-[35px] border border-white/40 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)] dark:bg-slate-900/40 dark:border-white/20 dark:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.2)]';
    
    cleanSuffix = cleanSuffix.replace(/dark:bg-[^\s]+/g, '');
    cleanPrefix = cleanPrefix.replace(/dark:bg-[^\s]+/g, '');
    
    return `className={\`${cleanPrefix ? cleanPrefix + ' ' : ''}${glassClass}${cleanSuffix ? ' ' + cleanSuffix : ''}\`}`;
  });

  fs.writeFileSync(file, content);
});
console.log('Done applying heavy glassmorphism');
