const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const diskPath = path.join(process.cwd(), "public/avatars/");
    cb(null, diskPath);
  },
  filename: function (req, file, cb) {
    const timeStem = new Date().toISOString().replace(/:/g, '-');
    console.log(file.originalname)
    cb(null, timeStem + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
