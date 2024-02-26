const jwt = require("jsonwebtoken");
const { User } = require("../service/schemas/user.schema");
require("dotenv").config();

const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const token = authHeader.split(" ")[1];

    const verify = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: verify.id });

    if (!user || user.token !== token) {
      return res.status(401).json({ message: "Not authorized" });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Not authorized", error });
  }
};

module.exports = verifyToken;
