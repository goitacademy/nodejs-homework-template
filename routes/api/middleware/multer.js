const multer = require("multer");

const storage = multer.diskStorage({
  destination: "tmp/",
  filename: (req, file, cb) => cb(null, file.originalname),
  limits: { fileSize: 1048576 },
});

module.exports = storage;
