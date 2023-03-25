const { verify } = require("jsonwebtoken");
const { HttpError } = require("../helpers/httpError");
const { User } = require("../models/userModel");

const authMiddleware = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") next(new HttpError(401, "Not authorized"));

  if (!token) next(new HttpError(401, "Please, provide a token"));

  try {
    const user = await User.findOne({ token });

    const verifiedToken = verify(user.token, process.env.JWT_SECRET);

    req.user = verifiedToken;

    next();
  } catch (err) {
    next(new HttpError(401, "Not authorized"));
  }
};

module.exports = {
  authMiddleware,
};
