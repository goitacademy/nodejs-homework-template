
const multer = require("multer");
const path = require("path");
const fs = require("fs/promises");

const tempDir = path.join(__dirname, "../", "temp");


const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname)
    }
  
});

const upLoad = multer({
  storage: multerConfig,
})


module.exports = upLoad;