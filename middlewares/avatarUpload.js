const multer = require("multer");
const path = require("path");

const tmpDir = path.join(__dirname, "../", "tmp");

const multerConfig = multer.diskStorage({
  destination: tmpDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
    // const uniquePreffix = `${Date.now()}_${Math.round(Math.random() * 1E9)}`;
    // const filename = `${uniquePreffix}_${file.originalname}`;
    // cb(null, filename);
  }, 
});

const upload = multer({
  storage: multerConfig,
});

module.exports = upload;
