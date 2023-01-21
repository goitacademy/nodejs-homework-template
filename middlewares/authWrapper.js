const { User } = require("../model");

const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const authWrapper = async (req, res, next) => {
  const { autorization = "" } = req.headers;
  const [bearer, token] = autorization.split(" ");
  try {
    if (bearer !== "Bearer") {
      throw new Unauthorized("Not authorized");
    }
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user) {
      throw new Unauthorized("Not authorized");
    }
    req.user = user;
    next();
  } catch (error) {
    if ((error.message = "Invalid sugnature")) {
      error.status = 401;
    }
    next(error);
  }
};

module.exports = authWrapper;
