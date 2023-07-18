const { User } = require("../models/user");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const userAuth = asyncHandler(async (req, res, next) => {
  const { SECRET_KEY } = process.env;
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  try {
    if (bearer !== "Bearer") {
      return res.status(401).json({ message: "Not authorized" });
    }

    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);

    if (!user || !user.token) {
      return res.status(401).json({ message: "Not authorized" });
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = userAuth;
