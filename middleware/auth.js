const jwt = require("jsonwebtoken");

const { User } = require("../models/user");
const HttpError = require("../helpers/HttpError.js");

function auth(req, res, next) {
    
  const authHeader = req.headers.authorization;
 
  if (typeof authHeader === "undefined") {
    next(HttpError(401, "Not authorized"));
  }

  const [bearer, token] = authHeader.split(" ", 2);

  if (bearer !== "Bearer") {
    next(HttpError(401, "Not authorized"));
    return;
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decode) => {
    if (err) {
      next(HttpError(401, "Not authorized"));
    }

    const user = await User.findById(decode.id);
   
    if (user === null) {
      next(HttpError(401, "Not authorized"));
    }

    if (user.token !== token) {
      next(HttpError(401, "Not authorized"));
    }

    req.user = {
      id: decode.id
    };

    next();
  });
}

module.exports = auth;