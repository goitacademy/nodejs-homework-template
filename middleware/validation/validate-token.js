const jwt = require("jsonwebtoken");
const HttpError = require("../../helpers/HttpError");
const { ctrlWrapper } = require("../../decorators/index");
const User = require("../../models/users");

const validToken = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer" || !token) {
    throw HttpError(401);
  }

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(id);
    if (!user || !user.token) {
      throw HttpError(401);
    }
    req.user = user;
    next();
  } catch (error) {
    throw HttpError(401, error.message);
  }
};

module.exports = { validToken: ctrlWrapper(validToken) };
