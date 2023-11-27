// middlewares\authentificate.js

const jwt = require('jsonwebtoken');
const { User } = require('../service/schemas/userSchema');

const authenticate = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log('Authorization Header:', authHeader);

  
    if (typeof authHeader === "undefined") {
      console.log('Error: Undefined token');
      return res.status(401).send({ message: "Error: token sent incorrectly" });
    }
  
    const [bearer, token] = authHeader.split(" ", 2);
    console.log('Bearer:', bearer);
    console.log('Token:', token);
  
    if (bearer !== "Bearer") {
      console.log('Error: Token has not a Bearer type');
      return res.status(401).send({ message: "Token has not a Bearer type" });
    }
  
    jwt.verify(token, process.env.JWT_SECRET, async (err, decode) => {
      if (err) {
        console.log('Error: Invalid token', err);
        return res.status(401).send({ message: "ошибка верификации токена" });
      }
  
      try {
        req.user = decode;
  
        const user = await User.findById(decode.userId).exec(); // Виправив id на userId
  
        if (user === null) {
          console.log('Error: User not found');  // Помилка тут !!!!
          return res.status(401).send({ message: "User not found" });
        }
        console.log('Received token:', token);
        console.log('User token:', user.token);
        
        if (!user.token || user.token !== token) {
          console.log('Error: Token mismatch');
          return res.status(401).send({ message: "Несоответствие токенов при сравнении" });
        }
  
        req.user = { id: user._id, name: user.name };
  
        next();
      } catch (error) {
        next(error);
      }
    });
  };
  
  module.exports = authenticate;