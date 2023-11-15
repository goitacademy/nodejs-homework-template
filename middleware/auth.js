const jwt = require("jsonwebtoken");
const { User } = require("../model/user");

const { SECRET_KEY } = process.env;

const authMiddleware = async (req, res, next) => {
  try {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer") {
      const unauthorizedError = new Error("Not authorized");
      unauthorizedError.status = 401;
      throw unauthorizedError;
    }
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.token || user.token !== token) {
      const unauthorizedError = new Error("Not authorized");
      unauthorizedError.status = 401;
      throw unauthorizedError;
    }
    req.user = user;
    next();
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ message: error.message });
  }
};

module.exports = { authMiddleware };
