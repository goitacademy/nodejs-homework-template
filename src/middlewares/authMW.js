const jwt = require("jsonwebtoken");
const { User } = require("../db/usersSchema.js");

const authMW = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({
      message: "Not authorized",
    });
  }
  const [tokenType, token] = req.headers.authorization.split(" ");
  if (!token) {
    return res.status(401).json({
      message: "Not authorized",
    });
  }
  try {
    const user = jwt.decode(token, process.env.SECRET);
    if (!(await User.findOne({ _id: user._id, token: token }))) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }
    req.userId = user._id;
    next();
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  authMW,
};
