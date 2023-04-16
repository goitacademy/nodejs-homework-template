const jwt = require("jsonwebtoken");
const { checkUserById } = require("../models/user");
const jwtSecret = process.env.JWT_SECRET;

const auth = async (req, res, next) => {
  const token = req.headers.authorization;
  
  if (!token) {
    return res.status(401).send("No token provided");
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    
    const userFound = await checkUserById(decoded.id);
   
    if (userFound && token == userFound.token) {
      req.user = userFound;
      next();
    } else {
      res.status(401).send("Not authorized");
    }
  } catch(err) {
    return res.status(500).send(err);
  }
};

module.exports = auth;
