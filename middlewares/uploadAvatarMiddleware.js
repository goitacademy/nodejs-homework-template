const multer = require("multer");
const path = require("path");
const { nanoid } = require("nanoid");

const storage = multer.diskStorage({
  destination: path.join(__dirname, "../public/avatars"),
  filename: function (req, file, cb) {
    const [filename, extention] = file.originalname.split(".");
    cb(null, `${filename}-${nanoid(6)}.${extention}`);
  },
});

const uploadAvatarMiddleware = multer({ storage });

module.exports = uploadAvatarMiddleware;
