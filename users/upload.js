const multer = require("multer");
const path = require("path");

const tempDir = path.join(__dirname, "../../", "tmp");

const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  dest: path.join(__dirname, "tmp"),
});

// const upload = multer({
//   // Odkomentuj, zeby zapisywać pliki na dysku
//   // dest: path.join(__dirname, 'tmp'),
//   limits: {
//       fieldSize: 1048576
//   }
// });
module.exports = upload;
