const jwt = require("jsonwebtoken");
const User = require("../models/users");
const jwtSecret = process.env.JWT_SECRET;

const authenticate = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");

    const decoded = jwt.verify(token, jwtSecret);

    const user = await User.findOne({ _id: decoded.userId });

    if (!user) {
      throw new Error();
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Not authorized" });
  }
};

module.exports = authenticate;
