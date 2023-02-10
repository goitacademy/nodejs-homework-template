const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");
const { User } = require("../models/UsersModel");
const { JWT_SECRET } = process.env;

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization || "";

  const [typeBearer, token] = authHeader.split(" ");

  try {
    if (typeBearer !== "Bearer") {
      throw new Unauthorized("Not authorizated");
    }

    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(id);

    if (!user || !user.token) {
      throw new Unauthorized("Not authorized");
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.message === "Invalid sugnature") {
      error.status(401);
    }
    next(error);
  }
};

module.exports = {
  auth,
};
