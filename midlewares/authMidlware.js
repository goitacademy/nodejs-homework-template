var jwt = require("jsonwebtoken");
const { User } = require("../model/userModel");
const { NotAuthorizedError } = require("../helpers/errors");

const authMidleware = async (req, res, next) => {
  const [tokenType, token] = await req.headers["authorization"].split(" ");
  console.log(tokenType, token);

  if (!token) {
    next(new NotAuthorizedError("Not authorized"));
  }
  try {
    const dbUserToken = await User.findOne({ token });
    if (dbUserToken.token != token) {
      next(new NotAuthorizedError("Not authorized"));
    }
    const user = jwt.decode(token, process.env.JWT_SECRET);
    req.token = token;
    req.user = user;

    next();
  } catch (err) {
    next(new NotAuthorizedError("Not authorized - Invalid token"));
  }
};

module.exports = {
  authMidleware,
};
