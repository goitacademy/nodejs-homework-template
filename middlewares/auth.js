const jwt = require("jsonwebtoken");
const { RequestError } = require("../helpers");
const User = require("../models/user");

const { TOKEN_KEY } = process.env;

const auth = async (req, res, next) => {
  try {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer") {
      throw RequestError(401, "Not authorized");
    }
    try {
      const { id } = jwt.verify(token, TOKEN_KEY);
      const user = await User.findById(id);
      if (!user || !user.token) {
        throw RequestError(401, "Not authorized");
      }
      req.user = user;
      next();
    } catch (error) {
      throw RequestError(401, "Not authorized");
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { auth };
