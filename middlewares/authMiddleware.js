const jwt = require("jsonwebtoken");
const { SEKRET_KEY } = process.env;
const { handleError } = require("../utils/handleError");

const { User } = require("../schemas/mongooseSchemas/user");

const authMiddleware = async (req, res, next) => {
  const { authorization = "" } = req.headers;

  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    next(handleError(401));
  }

  try {
    const { id } = jwt.verify(token, SEKRET_KEY);

    const user = await User.findById(id);
    if (!user || !user.token || user.token !== token) {
      next(handleError(401));
    }
    req.user = user;
    next();
  } catch {
    next(handleError(401));
  }
};

module.exports = authMiddleware;
