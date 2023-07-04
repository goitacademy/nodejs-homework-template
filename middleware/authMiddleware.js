const { HttpError } = require("../helpers");

const jwt = require("jsonwebtoken");
const User = require("../models/user.js");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    const user = await User.findOne({ _id: decoded._id, token });
    if (!user) {
      throw new HttpError(401, "Not authorized");
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authMiddleware;
