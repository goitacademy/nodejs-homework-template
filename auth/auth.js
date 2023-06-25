const jwt = require("jsonwebtoken");
const { getUserByEmail } = require("../controllers/userController");

const jwtSecretKey = process.env.JWT_SECRET_KEY;

const auth = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    jwt.verify(token, jwtSecretKey);
    req.user = jwt.decode(token);

    try {
      const user = await getUserByEmail(req.user.email);
      if (!user) {
        return res.status(401).json({ message: "Not authorized" });
      }
    } catch (error) {
      return res.status(401).json({ message: "Not authorized" });
    }

    next();
  } catch (error) {
    res.status(401).json({ message: "Not authorized" });
  }
};

module.exports = auth;