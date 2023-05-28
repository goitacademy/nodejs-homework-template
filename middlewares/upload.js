const multer = require("multer");
const path = require("path");

const tmpPath = path.join(__dirname, "../", "tmp");

const multerConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tmpPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  limits: {
    fileSize: 2048,
  },
});

const upload = multer({
  storage: multerConfig,
  fileFilter: function fileFilter(req, file, cb) {
    if (file.mimetype.includes("image")) {
      cb(null, true);
    } else {
      const err = new Error();
      err.status = 400;
      err.message = "Wrong format";
      cb(err);
    }
  },
});

module.exports = upload;
