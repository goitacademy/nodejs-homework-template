const jwt = require("jsonwebtoken");

const { User } = require("../models/user");
const HttpError = require("../helpers/HttpError.js");

function auth(req, res, next) {
    
  const authHeader = req.headers.authorization;
 
  if (typeof authHeader === "undefined") {
    throw HttpError(401, "Not authorized");
  }

  const [bearer, token] = authHeader.split(" ", 2);

  if (bearer !== "Bearer") {
    throw HttpError(401, "Not authorized");
    
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decode) => {
    if (err) {
      throw HttpError(401, "Not authorized");
    }
    try {
      const user = await User.findById(decode.id);
   
      if (user === null) {
        throw HttpError(401, "Not authorized");
      }
  
      if (user.token !== token) {
        throw HttpError(401, "Not authorized");
      }
      
      if (user.verify === false) {
        return res.status(401).send({ message: "Your account is not verified" });
      }
      req.user = {
        id: decode.id
      };
  
      next();
    } catch (err) { next(HttpError(401, "Not authorized")); }
   
  });
}

module.exports = auth;