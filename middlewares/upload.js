const multer = require("multer");
const path = require("path");

const tempDir = path.join(__dirname, "../", "tmp");

const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    const { _id } = req.user;
    cb(null, `Original_Avatar_${_id}.jpg`);
  },
});

const upload = multer({
  storage: multerConfig,
});

module.exports = upload;
