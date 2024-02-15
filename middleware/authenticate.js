const jwt = require("jsonwebtoken");
const User = require("../schemas/users.schema");

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  try {
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new Error("Not authorized");
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({ _id: decoded.userId, token });

    if (!user) {
      throw new Error("Not authorized");
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: error.message || "Not authorized" });
  }
};

module.exports = authenticateToken;
