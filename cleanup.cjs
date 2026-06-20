const fs = require('fs');

const walkSync = function(dir, filelist) {
  let files = fs.readdirSync(dir);
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
components.push('src/App.tsx');

components.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  // Fix `hover: bg-white/40...` or `focus: bg-white/40...`
  content = content.replace(/(hover|focus):\s+(bg-white\/40 backdrop-blur-\[35px\][^"']*(?:'|"))/g, (match, prefix, rest) => {
     // If it's a focus or hover state, it might not even make sense to have glassmorphism applied as a pseudo-class entirely
     // Let's just remove the pseudo-class and the space if it was an error
     return `${prefix}:${rest}`;
  });

  // Fix `/10` or `/20` orphaned after glassmorphism
  content = content.replace(/\]\s+\/(10|20|30|40|50|60|70|80|90)\s+/g, '] ');

  // Fix double spaces
  content = content.replace(/  +/g, ' ');

  // Fix `border ` with nothing after it
  content = content.replace(/border\s+(?=")/g, 'border-transparent"');
  content = content.replace(/border\s+(?=')/g, "border-transparent'");

  fs.writeFileSync(file, content);
});
console.log('Cleanup done');
