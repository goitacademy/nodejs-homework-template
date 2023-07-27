const multer = require("multer");
const path = require("path");

const tempStoragePath = path.join(__dirname, "../", "temp");

const multerConfig = multer.diskStorage({
  destination: tempStoragePath,
  filename: (req, file, cb) => {
    const { _id } = req.user;
    cb(null, `${_id}_${file.originalname}`);
  },
});

const upload = multer({
  storage: multerConfig,
});

module.exports = upload;
