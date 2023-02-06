const { HttpError } = require("../helpers/helpers");
const jwt = require("jsonwebtoken");
const {User} = require("../models/user");
const path = require("path");
const multer = require("multer");

function validateBody(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return next(HttpError(400, error.message));
    }

    return next();
  };
}

async function auth(req, res, next) {

  const authHeader = req.headers.authorization || "";
  const [type, token] = authHeader.split(" ");

  if (type !== "Bearer") {
    throw HttpError(401, "token type is not valid");
  }

  if (!token) {
    throw HttpError(401, "no token provided");
  }

  try {
    const { id } = jwt.verify(token,process.env.JWT_SECRET);
    const user = await User.findById(id);
    console.log("user", user)
    req.user = user;
  } catch (error) {
    if (error.name === "TokenExpiredError" || error.name === "JsonWebTokenError") {
      throw HttpError(401, "jwt token is not valid");
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
  // limits: {},
});

module.exports = {
  validateBody,
  auth,
  upload,
};