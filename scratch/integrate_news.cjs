const fs = require('fs');

const appPath = '/Users/macintosh/Desktop/qaic-thailand/src/App.tsx';
let content = fs.readFileSync(appPath, 'utf8');

// 1. Replace activeTab state definition
content = content.replace(
  `useState<'assess' | 'standards' | 'training' | 'verify' | 'org' | 'profile' | 'quote'>('assess')`,
  `useState<'assess' | 'standards' | 'training' | 'verify' | 'org' | 'profile' | 'quote' | 'news'>('assess')`
);

// 2. Replace URL tabParam checks
content = content.replace(
  `['assess', 'standards', 'training', 'verify', 'org', 'profile', 'quote']`,
  `['assess', 'standards', 'training', 'verify', 'org', 'profile', 'quote', 'news']`
);

// 3. Add to tabs array
content = content.replace(
  `{ id: 'training', labelTH: 'การฝึกอบรม', labelEN: 'Training', icon: GraduationCap },`,
  `{ id: 'training', labelTH: 'การฝึกอบรม', labelEN: 'Training', icon: GraduationCap },\n\t{ id: 'news', labelTH: 'ข่าวสารประชาสัมพันธ์', labelEN: 'News & PR', icon: FileText },`
);

// 4. Desktop Nav News Button
const profileIdx = content.indexOf(`onClick={() => setActiveTab('profile')}`);
if (profileIdx === -1) {
  console.error("Could not find profile button in desktop nav!");
  process.exit(1);
}
const btnStartIdx = content.lastIndexOf('<button', profileIdx);
if (btnStartIdx === -1) {
  console.error("Could not find start of profile button!");
  process.exit(1);
}

const newsBtnText = `  <button 
  onClick={() => setActiveTab('news')} 
  className={\`text-[10px] font-bold uppercase tracking-widest transition-colors cursor-pointer \${activeTab === 'news' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-750 dark:text-gray-600 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-400'}\`}
  >
  {t('ข่าวสาร', 'News')}
  </button>\n`;

content = content.substring(0, btnStartIdx) + newsBtnText + content.substring(btnStartIdx);

// 5. Mobile Nav News Button
const profileMobileIdx = content.indexOf(`onClick={() => { setActiveTab('profile'); setMobileMenuOpen(false); }}`);
if (profileMobileIdx === -1) {
  console.error("Could not find profile button in mobile nav!");
  process.exit(1);
}
const mBtnStartIdx = content.lastIndexOf('<button', profileMobileIdx);
if (mBtnStartIdx === -1) {
  console.error("Could not find start of mobile profile button!");
  process.exit(1);
}

const mobileNewsBtnText = `  <button 
  onClick={() => { setActiveTab('news'); setMobileMenuOpen(false); }}
  className={\`text-left text-3xl font-display font-bold transition-colors cursor-pointer \${activeTab === 'news' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-white/40 dark:text-slate-500 hover:text-gray-900 dark:text-white dark:hover:text-white'}\`}
  >
  {t('ข่าวสารประชาสัมพันธ์', 'News & PR')}
  </button>\n`;

content = content.substring(0, mBtnStartIdx) + mobileNewsBtnText + content.substring(mBtnStartIdx);

// 6. Mount NewsSection Component
const trainingRenderIdx = content.indexOf(`activeTab === 'training'`);
if (trainingRenderIdx === -1) {
  console.error("Could not find training tab renderer!");
  process.exit(1);
}
const trainingClosingIdx = content.indexOf(')}', trainingRenderIdx);
if (trainingClosingIdx === -1) {
  console.error("Could not find closing brackets of training tab renderer!");
  process.exit(1);
}
const insertPos = trainingClosingIdx + 2;

const newsRenderText = `\n  {activeTab === 'news' && (
  <motion.div 
  key="news"
  initial={{ opacity: 0, scale: 0.98 }}
  animate={{ opacity: 1, scale: 1 }}
  exit={{ opacity: 0, scale: 1.02 }}
  transition={{ duration: 0.3 }}
  >
  <NewsSection settings={settings} />
  </motion.div>
  )}`;

content = content.substring(0, insertPos) + newsRenderText + content.substring(insertPos);

fs.writeFileSync(appPath, content, 'utf8');
console.log("Successfully integrated News & PR navigation into App.tsx!");
