const multer = require("multer");
const path = require("path");
const uploadDir = path.join(process.cwd(), "tmp");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, uploadDir);
  },
  filename: (req, file, callback) => {
    const extension = file.originalname.split(".").pop();
    callback(null, `${Date.now()}.${extension}`);
  },
});
const upload = multer({ storage });

module.exports = upload;
