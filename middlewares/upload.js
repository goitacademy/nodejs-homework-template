const multer = require("multer");
const path = require("path");
const Jimp = require("jimp");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dirPath = path.resolve(__dirname, "../tmp");
    cb(null, dirPath);
  },
  filename: function (req, file, cb) {
    cb(null, Math.random() + file.originalname);
  },
});

const upload = multer({ storage });

async function resizeAvatar(req, res, next) {
  const { path } = req.file;

  try {
    const avatar = await Jimp.read(path);
    const resizedAvatar = avatar.resize(250, 250);
    await resizedAvatar.writeAsync(path);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
  next();
}

module.exports = { upload, resizeAvatar };
