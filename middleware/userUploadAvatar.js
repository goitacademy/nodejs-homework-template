const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const avatarsFolder = "../public/avatars";
    if (!fs.existsSync(avatarsFolder)) {
      console.log("jestem tutaj w");
      fs.mkdirSync(avatarsFolder);
    }
    cb(null, "../public/avatars");
  },
  filename: (req, file, cb) => {
    cb(null, "avatar" + req.user._id + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

module.exports = upload.single("avatar");
