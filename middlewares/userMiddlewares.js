const jwt = require("jsonwebtoken");
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const { userDataValidator } = require('../utils/userValidators');
const User = require('../models/userModel')

const checkCreateUserData = catchAsync(async (req, res, next) => {
  try {
    const { error, value } = userDataValidator(req.body);
    if (error) throw new AppError(400, 'Bad Request');
    req.body = value;
    next();
  } catch (error) {
    next(error);
  }
});

const auth = catchAsync(async (req, res, next) => {
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

module.exports = {
  checkCreateUserData,
  auth
};