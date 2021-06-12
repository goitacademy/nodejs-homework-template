const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const { HttpCodes, Limits } = require("./constants");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "tmp");
  },
  filename: function (req, file, cb) {
    cb(null, `${uuidv4()}-${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: Limits.imageSize },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.includes("image")) {
      cb(null, true);
      return;
    }

    const error = new Error("Wrong avatar format!");
    error.status = HttpCodes.BAD_REQUEST;
    cb(error);
  },
});

module.exports = upload;
