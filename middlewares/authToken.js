const jwt = require("jsonwebtoken");
const { User } = require("../models/user");

const { SECRET_KEY } = process.env;

const authToken = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (bearer !== "Bearer" || !user || !user.token) {
      return res.status(401).json({
        status: "error",
        code: 401,
        message: "Not authorized",
      });
    } else {
      req.user = user;
      next();
    }
  } catch (error) {
    if (
      error.message === "invalid signature" ||
      error.message === "invalid token"
    ) {
      error.status = 401;
    }
    next(error);
  }
};

module.exports = authToken;
