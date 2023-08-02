const multer = require("multer");
const path = require("path");
const Jimp = require("jimp");

const tempDir = path.join(__dirname, "../", "temp");

const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
  limits: {
      fileSize: 2048,
      
  },
});




const upload = multer({
  storage: multerConfig,
});


module.exports = upload;