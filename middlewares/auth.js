const jwt = require("jsonwebtoken");
const User = require("../models/user.js");

const dotenv = require("dotenv");
dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET;

const auth = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const token = authorization.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "Not authorized" });
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);

    if (!user || user.token !== token) {
      return res.status(401).json({ message: "Not authorized" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Not authorized" });
  }
};
module.exports = auth;
