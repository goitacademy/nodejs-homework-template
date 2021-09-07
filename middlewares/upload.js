const multer = require("multer"); 
const path = require("path"); //paths to folders

const tempDir = path.join(process.cwd(), "temp");  //path to temp file
// How to save the file
const storageSettings = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  limits: {
    fileSize: 10000,
  },
});

// Middleware for reading the file
const upload = multer({
  storage: storageSettings,
});

module.exports = upload;