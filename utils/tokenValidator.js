const jwt = require("jsonwebtoken");
const { KEY } = process.env;
const User = require("../models/user");
const httpErr = require("./HTTPErr");

const validateToken = async (req, res, next) => {
  try {
    const token =
      req.headers.authorization?.startsWith("Bearer") &&
      req.headers.authorization.split(" ")[1];

    if (!token) {
      throw httpErr(401, "Not authorized");
    }

    let decoded = "";

    try {
      decoded = jwt.verify(token, KEY);
    } catch (error) {
      throw httpErr(401, "Not authorized");
    }

    const currentUser = await User.findById(decoded.id);

    if (!currentUser || currentUser.token !== token) {
      throw httpErr(401, "Not authorized");
    }

    req.user = currentUser;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = validateToken;
