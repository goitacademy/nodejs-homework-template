const path = require("path");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join("./tmp"));
  },
  filename: (req, file, cb) => {
    const [, extinsion] = file.originalname.split(".");
    const fileName = uuidv4();
    cb(null, `${fileName}.${extinsion}`);
  },
});

const uploadMiddleware = multer({
  storage: storage,
});

module.exports = { uploadMiddleware };
