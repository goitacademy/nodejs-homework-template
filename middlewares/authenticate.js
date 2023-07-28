const jwt = require("jsonwebtoken");

const HttpError = require("../utils/HttpError");

const {User} = require('../models/user');

const { SECRET_KEY } = process.env;


const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;

  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer" || !token) {
    next(HttpError(401, "Not authorized"));
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);

    if(!user) {
        next(HttpError(401, "Not authorized"));
    }
    
    next();

    } catch {
        next(HttpError(401, "Not authorized"));
  };
};

module.exports = authenticate;
