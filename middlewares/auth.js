const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECRET_KEY = process.env.SECRET;

const { User } = require("../models/userModels");

const auth = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  try {
    if (bearer !== "Bearer") {
      return res.json({
        status: "401 Unauthorized",
        code: 401,
        message: "Not authorized",
      });
    }

    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);

    if (!user) {
      return res.json({
        status: "401 Unauthorized",
        code: 401,
        message: "Not authorized",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.message === "Invalid signature") {
      error.status = 401;
    }
    next(error);
  }
};

module.exports = { auth };
