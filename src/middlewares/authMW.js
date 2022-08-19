const jwt = require("jsonwebtoken");
const { User } = require("../db/usersSchema.js");

const authMW = async (req, res, next) => {
  const [tokenType, token] = req.headers.authorization.split(" ");
  if (!token) {
    next(new Error("no token"));
  }
  try {
    const user = jwt.decode(token, process.env.SECRET);
    if (!(await User.findOne({ _id: user._id, token: token }))) {
      next(new Error("wrong user"));
    }
    req.userId = user._id;
    console.log(user._id);
    next();
  } catch (err) {
    next(new Error("wrong token"));
  }
};

module.exports = {
  authMW,
};
