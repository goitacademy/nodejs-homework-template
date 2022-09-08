const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve("./tmp"));
  },
  filename: (req, file, cb) => {
    const [, extension] = file.originalname.split(".");
    cb(null, `${uuidv4}.${extension}`);
  },
});

const upload = multer({ storage });

module.exports = {
  upload,
};
