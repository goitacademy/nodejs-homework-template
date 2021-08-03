const HTTP_CODES = require("../helpers/httpStatusCodes");
const jwt = require("jsonwebtoken");
const User = require("../model/users");

const jwtTokenMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res
      .status(HTTP_CODES.BAD_REQUEST)
      .json({ error: "Token is not provided" });
  }
  try {
    const { JWT_SECRET_KEY } = process.env;
    jwt.verify(token, JWT_SECRET_KEY);
    const user = jwt.decode(token);
    const existingUser = await User.findOne({ token });
    if (!existingUser.token) {
      return res
        .status(HTTP_CODES.BAD_REQUEST)
        .json({ error: "User is not sigin" });
    }
    req.user = user;

    next();
  } catch (e) {
    res.status(HTTP_CODES.BAD_REQUEST).json({ error: "Token is invalid" });
  }
};

module.exports = jwtTokenMiddleware;