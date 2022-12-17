const multer = require("multer");

const uploadFile = (distName) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, distName);
    },
    filename: (req, file, cb) => {
      const [fileName, ext] = file.originalname.split(".");
      cb(null, `${fileName}.${ext}`);
    },
  });
  const upload = multer({ storage: storage });
  return upload;
};

module.exports = uploadFile;
