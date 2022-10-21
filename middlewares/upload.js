const multer = require("multer");
const path = require("path");
const { nanoid } = require("nanoid");

const tmpDir = path.join(__dirname, "..", "tmp");

const multerConfig = multer.diskStorage({
  destination: tmpDir,

  filename: (req, file, cb) => {
    const fileExt = file.originalname.split(".").pop();
    const newName = nanoid();
    const newFile = `${newName}.${fileExt}`;
    cb(null, newFile);
  },
});

const upload = multer({
  storage: multerConfig,
});

module.exports = upload;
