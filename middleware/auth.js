const jwt = require("jsonwebtoken");
const jwtSecret =
  "4715aed3c946f7b0a38e6b534a9583628d84e96d10fbc04700770d572af3dce43625dd";
require("dotenv").config();
const User = require("../models/User");

const userAuth = async (req, res, next) => {
  const { auth = "" } = req.headers;
  const [bearer, token] = auth.split(" ");
  if (bearer !== "Bearer") {
    next(
      res.status(401).json({ message: "Not authorized, token not available" })
    );
  }
  try {
    const { id } = jwt.verify(token, jwtSecret);
    const user = await User.findById(id);
    if (!user || !user.token || user.token !== token) {
      next(
        res.status(401).json({ message: "Not authorized, token not available" })
      );
    }
    req.user = user;
    next();
  } catch (error) {
    next(
      res.status(401).json({ message: "Not authorized, token not available" })
    );
  }
};
module.exports = userAuth;
