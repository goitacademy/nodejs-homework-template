const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

const DIRECTORY = path.resolve("./tmp");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIRECTORY);
  },
  filename: (req, file, cb) => {
    const [, extension] = file.originalname.split(".");
    const newName = `${uuidv4()}.${extension}`;
    cb(null, newName);
    req.avatar = file;
    req.avatarName = newName;
  },
});

const uploadMiddleware = multer({ storage });

module.exports = {
  uploadMiddleware,
};
