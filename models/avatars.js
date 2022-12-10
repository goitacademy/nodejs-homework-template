const multer = require("multer");
const path = require("path");

const destinationPath = path.resolve("./public/avatars");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, destinationPath);
  },
  filename: (req, file, cb) => {
    const [fileName, ext] = file.originalname.split(".");
    cb(null, `${fileName}.${ext}`);
  },
});
const upload = multer({ storage: storage });

const uploadController = (req, res, next) => {
  return res.status(200).json({ status: "200 OK" });
};

module.exports = { upload, uploadController };
