const multer = require("multer");
const path = require("path");

const tmpDir = path.join(__dirname, "../tmp");

const storage = multer.diskStorage({
  destination: tmpDir,
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${req.user._id}${ext}`);
  },
});

const upload = multer({ storage });

module.exports = upload;
