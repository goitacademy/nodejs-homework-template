const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const jwtVerify = promisify(jwt.verify);

const jwtSecret = process.env.JWT_SECRET;
const { getUserById } = require("../controllers/users");

const authenticate = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).send("No token provided");
  }

  try {
    const { id } = await jwtVerify(token, jwtSecret);
    const user = await getUserById(id);

    if (!user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Not authorized" });
  }
};

module.exports = authenticate;
