const fs = require('fs');

let content = fs.readFileSync('src/components/TrainingSection.tsx', 'utf8');

// Add import
if (!content.includes('createPortal')) {
    content = content.replace("import React, { useState } from 'react';", "import React, { useState } from 'react';\nimport { createPortal } from 'react-dom';");
}

// Wrap modal in createPortal
const modalStart = "  <AnimatePresence>\n  {selectedCourse && (\n  <div className=\"fixed inset-0 z-[100] flex items-center justify-center p-4\">";
const newModalStart = "  <AnimatePresence>\n  {selectedCourse && createPortal(\n  <div className=\"fixed inset-0 z-[100] flex items-center justify-center p-4\">";

const modalEnd = "  </motion.div>\n  </div>\n  )}\n  </AnimatePresence>";
const newModalEnd = "  </motion.div>\n  </div>\n  , document.body)}\n  </AnimatePresence>";

if(content.includes(modalStart)) {
    content = content.replace(modalStart, newModalStart);
    content = content.replace(modalEnd, newModalEnd);
    fs.writeFileSync('src/components/TrainingSection.tsx', content);
    console.log('Fixed training modal with createPortal');
} else {
    console.log('Could not find modal start');
}
