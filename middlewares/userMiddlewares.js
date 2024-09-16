const jwt = require("jsonwebtoken");
const multer = require('multer');
const path = require('path');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const { userDataValidator } = require('../utils/userValidators');
const User = require('../models/userModel')

const tmpDir = path.join(__dirname, "../", "tmp");

const multerConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tmpDir)
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
  limits: {
    fileSize: 2048
  }
})

exports.upload = multer({
  storage: multerConfig
});

exports.checkCreateUserData = catchAsync(async (req, res, next) => {
  try {
    const { error, value } = userDataValidator(req.body);

    if (error) throw new AppError(400, 'Bad Request');

    req.body = value;

    next();
  } catch (error) {
    next(error);
  }
});

exports.auth = catchAsync(async (req, res, next) => {
  try {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");

    if (bearer !== "Bearer") {
      throw new AppError(401, 'Not authorized');
    }

    const { id } = jwt.verify(token, process.env.SECRET_KEY);

    const user = await User.findById(id);

    if (!user || !user.token) {
      throw new AppError(401, 'Not authorized');
    }

    req.user = user;

    next();
  } catch (error) {
    if (error.message === "invalid signature") {
      error.status = 401;
    }
    next(error);
  }
});