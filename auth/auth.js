const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;

const { getUserById } = require("../controllers/users");

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      throw new Error("No token provided");
    }

    const decodedToken = jwt.verify(token, jwtSecret);
    const { id } = decodedToken;

    const user = await getUserById(id);

    if (!user) {
      throw new Error("Not authorized");
    }

    req.user = user;

    next();
  } catch (error) {
    res.status(401).json({ message: error.message || "Not authorized" });
  }
};

module.exports = auth;
