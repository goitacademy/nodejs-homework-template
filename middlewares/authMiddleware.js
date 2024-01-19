const serverConfig = require("../config/serverConfig");

const jwt = require("jsonwebtoken");
const SECRET_KEY = serverConfig.SECRET_KEY;
const handleError = require("../utils/handleError");

const { User } = require("../schemas/mongooseSchemas/userSchema");

const authMiddleware = async (req, res, next) => {
  const { authorization = "" } = req.headers;

  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    next(handleError(401));
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY);

    const user = await User.findById(id);
    if (!user || !user.token || user.token !== token) {
      throw new Error("Invalid token");
    }
    req.user = user;
    next();
  } catch (error) {
    next(handleError(401, error.message));
  }
};

module.exports = authMiddleware;
