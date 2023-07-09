const jwt = require("jsonwebtoken");
const { JWT_STRING } = process.env;
// const JWT_STRING = "2M6vwnlAxDyBdJBCJYYYv0q";

const User = require("../models/User");

const checkToken = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    res.status(401).json({ message: "Not authorized" });
  } else {
    try {
      const { id } = jwt.verify(token, JWT_STRING);
      const user = await User.findById(id);
      if (!user || !user.token || user.token !== token) {
        res.status(401).json({ message: "Not authorized" });
      } else {
        req.user = user;
        next();
      }
    } catch (error) {
      res.status(401).json({ message: "Not authorized" });
    }
  }
};

module.exports = checkToken;
