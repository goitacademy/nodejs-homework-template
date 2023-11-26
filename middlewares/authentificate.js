// middlewares\authentificate.js

const jwt = require('jsonwebtoken');
const { User } = require('../service/schemas/userSchema');

const authenticate = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log('Authorization Header:', authHeader);

  
    if (typeof authHeader === "undefined") {
      console.log('Error: Undefined token');
      return res.status(401).send({ message: "Invalid token" });
    }
  
    const [bearer, token] = authHeader.split(" ", 2);
    console.log('Bearer:', bearer);
    console.log('Token:', token);
  
    if (bearer !== "Bearer") {
      return res.status(401).send({ message: "token has not a Bearer type" });
    }
  
    jwt.verify(token, process.env.JWT_SECRET, async (err, decode) => {
      if (err) {
        return res.status(401).send({ message: "Invalid token" });
      }
  
      try {
        req.user = decode;
  
        const user = await User.findById(decode.id).exec();
  
        if (user === null) {
          return res.status(401).send({ message: "Invalid token" });
        }
        console.log('Received token:', token);
        console.log('User token:', user.token);
        
        if (user.token !== token) {
          return res.status(401).send({ message: "Invalid token" });
        }
  
        req.user = { id: user._id, name: user.name };
  
        next();
      } catch (error) {
        next(error);
      }
    });
  };
  
  module.exports = authenticate;