const { User } = require("../models/userModel");
const { NotAuthorizedError } = require("../helpers/errors");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  const [tokenType, token] = req.headers.authorization.split(" ");
  console.log(tokenType);
  if (!token) {
    next(new NotAuthorizedError("Give me a token, mazafaka!!!"));
  }
  try {
    const userDecode = jwt.decode(token, process.env.JWT_SECRET);
    console.log(userDecode._id);
    const user = await User.findById(userDecode._id);
    if (!user || !user.token) {
      throw new NotAuthorizedError("Not authorized");
    }
    req.user = user;
    next();
  } catch (error) {
    if (error.message === "Invalid sugnature") {
      error.status = 401;
    }
    next(error);
  }
};

module.exports = auth;
