const fs = require('fs');

let content = fs.readFileSync('src/components/AboutSection.tsx', 'utf8');

// Replace standard localTheme ternaries with static tailwind classes
// e.g. ${localTheme === 'dark' ? 'text-white' : 'text-gray-900'} -> text-gray-900 dark:text-white
content = content.replace(/\$\{localTheme === 'dark' \? '([^']+)' : '([^']+)'\}/g, (match, darkClass, lightClass) => {
  // If the darkClass is like "text-white" and lightClass is "text-gray-900"
  // we want: text-gray-900 dark:text-white
  
  // Need to handle multiple classes in each side.
  // We'll map the dark classes to have 'dark:' prefix, and keep light classes as is.
  let darkParts = darkClass.split(' ').map(c => c.trim()).filter(Boolean);
  let lightParts = lightClass.split(' ').map(c => c.trim()).filter(Boolean);
  
  // Filter out any existing 'dark:' prefixes in lightClass if any (shouldn't be, but just in case)
  let cleanLight = lightParts.filter(c => !c.startsWith('dark:')).join(' ');
  
  // Only add 'dark:' to classes that don't already have it
  let cleanDark = darkParts.map(c => c.startsWith('dark:') ? c : `dark:${c}`).join(' ');
  
  return `${cleanLight} ${cleanDark}`;
});

// Write it back
fs.writeFileSync('src/components/AboutSection.tsx', content);
console.log('AboutSection fixed');
