const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { SECRET_KEY } = process.env;
const authMiddleware = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer") {
      return res.status(401).json({ message: "Not authorized" });
    }
    const decodedToken = jwt.verify(token, SECRET_KEY);
    const userId = decodedToken.id;
    const User = mongoose.model("User");
    const user = await User.findById(userId);
    if (!user || user.token !== token) {
      return res.status(401).json({ message: "Not authorized" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Not authorized" });
  }
};

module.exports = authMiddleware;
