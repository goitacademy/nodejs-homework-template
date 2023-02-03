const { CustomError } = require("../helpers");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
const multer = require("multer");
const path = require("path");
const Jimp = require("jimp");

function validateBody(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return next(new CustomError(400, error.message));
    }
    return next();
  };
}

async function auth(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const [type, token] = authHeader.split(" ");

  if (type !== "Bearer") {
    return next(new CustomError(401, "Token type is not valid"));
  }
  if (!token) {
    return next(new CustomError(401, "No token provided"));
  }

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(id);

    req.user = user;
  } catch (error) {
    if (
      error.name === "TokenExpiredError" ||
      error.name === "JsonWebTokenError"
    ) {
      return next(new CustomError(401, "Not authorized"));
    }
    throw error;
  }

  next();
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, "../tmp"));
  },
  filename: function (req, file, cb) {
    cb(null, Math.random() + file.originalname);
  },
});

const upload = multer({
  storage,
});

async function resizeAvatar(req, res, next) {
  const { path } = req.file;
  try {
    const avatar = await Jimp.read(path);
    const resizingAvatar = avatar.resize(250, 250);

    await resizingAvatar.writeAsync(path);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }

  next();
}
module.exports = {
  validateBody,
  auth,
  upload,
  resizeAvatar,
};
