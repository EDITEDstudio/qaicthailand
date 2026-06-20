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

components.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  // Text color mapping
  content = content.replace(/text-gray-900(?!\s+dark:text-)/g, 'text-gray-900 dark:text-white');
  content = content.replace(/text-gray-800(?!\s+dark:text-)/g, 'text-gray-800 dark:text-slate-100');
  content = content.replace(/text-gray-700(?!\s+dark:text-)/g, 'text-gray-700 dark:text-slate-200');
  content = content.replace(/text-gray-600(?!\s+dark:text-)/g, 'text-gray-800 dark:text-slate-300'); 
  content = content.replace(/text-gray-500(?!\s+dark:text-)/g, 'text-gray-700 dark:text-slate-400');
  content = content.replace(/text-gray-400(?!\s+dark:text-)/g, 'text-gray-600 dark:text-slate-500');

  // Fix glassmorphism for light mode (replace bg-white and bg-gray-50 borders)
  // We should be careful to only replace text box backgrounds, not arbitrary things.
  // But since the user said "ในหน้าหลักส่วนไหนที่เป้นช่องข้อความปรับให้เป็นเอฟเฟค Glassmorphism ให้หมด",
  // Let's replace common container classes:
  
  content = content.replace(/'bg-white border border-gray-100/g, 
    "'bg-white/40 backdrop-blur-[35px] border border-white/40 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)]");

  content = content.replace(/'bg-white border border-gray-150\/50'/g, 
    "'bg-white/40 backdrop-blur-[35px] border border-white/40 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)]'");

  content = content.replace(/'bg-gray-50 border border-gray-100'/g, 
    "'bg-white/30 backdrop-blur-[30px] border border-white/40 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)]'");

  content = content.replace(/"bg-white border border-gray-100 /g, 
    '"bg-white/40 backdrop-blur-[35px] border border-white/40 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)] ');

  content = content.replace(/className="bg-white border /g, 
    'className="bg-white/40 backdrop-blur-[35px] border border-white/40 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)] ');

  // Add dark variants for background if missing (for boxes without dynamic strings)
  content = content.replace(/className="bg-white\/40 backdrop-blur-\[35px\] border border-white\/40 shadow-\[inset_0_1.5px_0_rgba\(255,255,255,0.4\)\]([^"]*)"/g, (match, rest) => {
    if (!rest.includes('dark:bg-')) {
      return `className="bg-white/40 backdrop-blur-[35px] border border-white/40 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)] dark:bg-slate-900/40 dark:border-white/20 dark:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.2)]${rest}"`;
    }
    return match;
  });

  fs.writeFileSync(file, content);
});
console.log('Done replacing colors and glass across all components');
