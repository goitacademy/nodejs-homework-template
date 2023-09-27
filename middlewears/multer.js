const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const diskPath = path.join(process.cwd(), "tmp");
    cb(null, diskPath);
  },
  filename: function (req, file, cb) {
    const timeStem = new Date().toISOString().replace(/:/g, '-');
    cb(null, timeStem + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
