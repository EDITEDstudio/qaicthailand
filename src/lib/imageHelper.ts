/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Automatically converts a Google Drive share link to a direct hotlink URL.
 * Supports file paths (/file/d/FILE_ID) and query parameters (?id=FILE_ID).
 */
export const formatGoogleDriveUrl = (url: string): string => {
  if (!url) return '';
  
  // Clean potential whitespace
  const trimmed = url.trim();

  // Look for Google Drive file ID patterns:
  // - drive.google.com/file/d/FILE_ID/view...
  // - drive.google.com/open?id=FILE_ID
  // - docs.google.com/file/d/FILE_ID/edit...
  const fileIdMatch = trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  
  if (fileIdMatch && fileIdMatch[1]) {
    const fileId = fileIdMatch[1];
    return `https://lh3.googleusercontent.com/d/${fileId}`;
  }
  
  return trimmed;
};

/**
 * Compresses an image file from the local machine and converts it to a lightweight Base64 string.
 * Resizes the image to a maximum of 800px on the longest edge at 70% JPEG quality.
 */
export const compressAndConvertImage = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        const MAX_SIZE = 800;
        
        if (width > height) {
          if (width > MAX_SIZE) {
            height *= MAX_SIZE / width;
            width = MAX_SIZE;
          }
        } else {
          if (height > MAX_SIZE) {
            width *= MAX_SIZE / height;
            height = MAX_SIZE;
          }
        }
        
        canvas.width = width;
        canvas.height = height;
        
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          // Convert to base64 with jpeg format and 0.7 quality to minimize size (typically ~30KB-80KB)
          const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
          resolve(compressedBase64);
        } else {
          resolve(e.target?.result as string);
        }
      };
      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };
      img.src = e.target?.result as string;
    };
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
    reader.readAsDataURL(file);
  });
};
