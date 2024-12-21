const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure the uploads directory exists
function ensureUploadDirectory() {
  const uploadPath = path.join(__dirname, '../uploads'); // Adjusted path
  // Here create new folder is that is not there 
  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath); 
  } 
  return uploadPath;
}

// Multer configuration with validation
function configureMulter() {
  const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
      callBack(null, ensureUploadDirectory()); 
    },
    filename: (req, file, callBack) => {
        //File upload
      const today = new Date().toISOString().split('T')[0]; 
        //File naming 
      const uniqueName = `${today}-${file.originalname}`;   
      callBack(null, uniqueName);
    },
  });

  // Validate file type and size
  const fileFilter = (req, file, callBack) => {
    const allowedTypes = /jpg|jpeg|png|pdf/; // extensions are alloud
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
      callBack(null, true); // Accept the file
    } else {
      callBack(new Error('Only .jpg, .jpeg, .png, .pdf files are allowed!'));
    }
  };

  return multer({
    storage,
    fileFilter,
    limits: { fileSize: 20 * 1024 * 1024 }, // 20MB limit
  });
}

module.exports = {
  upload: configureMulter(),
  ensureUploadDirectory,
};