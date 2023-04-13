const jwt = require("jsonwebtoken");
const { checkUserById } = require("../models/user");
const jwtSecret = process.env.JWT_SECRET;

const auth = async (req, res, next) => {
  const token = req.headers.authorization;
  console.log("token", token);
  if (!token) {
    return res.status(401).send("No token provided");
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    console.log("decoded", decoded);
    const userFound = await checkUserById(decoded.id);
    console.log("userFound", userFound.token);
    if (userFound && token == userFound.token) {
      req.user = userFound;
      next();
    } else {
      res.status(401).send("Not authorized");
    }
  } catch (err) {
    return res.status(500).send(err);
  }
};

module.exports = auth;
