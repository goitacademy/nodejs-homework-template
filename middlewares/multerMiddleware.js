// middlewares/multerMiddleware.js
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../tmp"));
    // cb(null, path.join(__dirname, '../public/avatars'))
  },
  filename: function (req, file, cb) {
    const { Id } = req.user;
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const { name } = path.parse(file.originalname);
    cb(
      null,
      uniqueSuffix + "-_-" + Id + "-_-" + name + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

module.exports = {
  upload,
};
