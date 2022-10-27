const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

const saveFile = path.resolve("./tmp");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, saveFile);
  },
  filename: (req, file, cb) => {
    const [, extension] = file.originalname.split(".");
    cb(null, `${uuidv4()}.${extension}`);
  },
});

const upload = multer({ storage });

module.exports = {
  upload,
};
