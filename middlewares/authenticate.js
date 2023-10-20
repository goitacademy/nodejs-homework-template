const jwt = require("jsonwebtoken");
const { HttpError } = require("../helpers/HttpError");
const { ctrlWrapper } = require("../decorators/ctrl.Wrapper");
const { User } = require("../models/user");
const { JWT_SECRET } = process.env;

const authenticate = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      throw new HttpError(401, "Not authorized");
    }

    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer") {
      throw new HttpError(401, "Not authorized");
    }

    const { userId } = jwt.verify(token, JWT_SECRET);

    const user = await User.findById(userId);

    if (!user || !user.token || user.token !== token) {
      throw new HttpError(401, "Not authorized");
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = ctrlWrapper(authenticate);
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTMxZjAwYWNmNjhhYjIyZGE5NzBkYjEiLCJpYXQiOjE2OTc3NzE1NzEsImV4cCI6MTY5NzgxNDc3MX0.fvE_E8uQ6Y9VrTdaJXgJ43OKOe0ZzCqkbtkXpVzJTSY
