// const fs = require("fs").promises;
const multer = require("multer");
const path = require("path");
const { nanoid } = require("nanoid");

const multerConfig = multer.diskStorage({
  destination: path.join(__dirname, "../", "temp"),
  filename: (req, file, cb) => {
    const [fileName, extension] = file.originalname.split(".");
    // console.log("extension", extension !== "jpg");
    if (
      extension === "jpeg" ||
      extension === "jpg" ||
      extension === "png" ||
      extension === "bmp"
    ) {
      cb(null, ` ${nanoid()}${file.originalname}`);
    } else {
      cb(
        new Error(
          `Invalid upload: fieltype of ${fileName} should be .jpeg,.jpg,.png,.bmp format `
        ),
        false
      );
    }
  },
});
// const fileFilterAvatar = (req, file, cb) => {
//   if (
//     file.mimetype === "image/png" ||
//     file.mimetype === "image/jpg" ||
//     file.mimetype === "image/jpeg"
//   ) {
//     cb(null, true);
//   } else {
//     cb(null, false);
//     return cb(new Error("Invalid upload: fieltype should be .jpeg format "));
//   }
// };

const upload = multer({
  storage: multerConfig,
});
module.exports = { upload };
