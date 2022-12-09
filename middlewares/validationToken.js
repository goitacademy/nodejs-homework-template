const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const validationToken = async (req, res, next) => {
  const authHeader = req.headers.authorization || " ";
  const [bearer, token] = authHeader.split(" ");

  if (bearer === "Bearer" && token) {
    try {
      const { id } = jwt.verify(token, SECRET_KEY);
      const user = await User.findById(id);
      if (!user) {
        throw new Error();
      }
      req.user = user;
      next();
    } catch (error) {
      if (error.message === "Invalid sugnature") {
        error.status = 401;
      }
      error.message = "Not authorized";
      error.status = 401;
      next(error);
    }
  }
};

module.exports = validationToken;
