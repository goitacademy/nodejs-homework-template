const multer = require("multer");
const path = require("path");

const dirToTmp = path.join(__dirname, "../", "tmp");

const multerConfig = multer.diskStorage({
  destination: dirToTmp,
  filename: (req, file, cd) => {
    cd(null, file.originalname);
  },
});
const upload = multer({
  storage: multerConfig,
});

module.exports = upload;
