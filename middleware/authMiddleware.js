const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const path = require("path");
const { User } = require("../db/userModel");

dotenv.config({ path: path.join(__dirname, "../.env") });

const authMiddleware = async (req, res, next) => {
  const [tokenType, token] = req.headers.authorization.split(" ");
  console.log(req.file);
  if (!token) {
    next(
      res.status(401).json({
        message: "Please, provide a token",
      })
    );
  }
  try {
    const user = await jwt.decode(token, process.env.SECRET);
    const userById = await User.findOne({ _id: user._id });
    req.token = token;
    req.user = userById;
    req.userId = user._id;
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Not authorized",
    });
  }
};

module.exports = {
  authMiddleware,
};
