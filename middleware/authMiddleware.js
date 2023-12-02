const jwt = require("jsonwebtoken");
const User = require("../models/user");
const multer = require("multer");
const path = require("path");
const secretKey = process.env.JSECRET_KEY || "default-secret-key";
const uploadPath = process.env.AVATAR_UPLOAD_PATH || './public/avatars';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, uploadPath)); // Папка для збереження аватарок
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + Date.now() + ext); // Унікальне ім'я для кожного файлу
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // Обмеження розміру файлу до 5 МБ
  },
});

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, secretKey);
    const user = await User.findOne({ _id: decoded.userId, token });

    if (!user) {
      throw new Error("Not authorized");
    }

    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    console.error(error.message);
    res.status(401).json({ message: "Not authorized" });
  }
};
module.exports = { authMiddleware, upload };