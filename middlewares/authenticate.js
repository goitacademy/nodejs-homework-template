const { httpError } = require("../helpers");
const jwt = require("jsonwebtoken");
const  User  = require("../models/user");

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  console.log('req.user', req.user)
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  // console.log('token', token)
  if (bearer !== "Bearer") {
    next(httpError(401, "Not authorized"));
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    console.log('id', id)
    const user = await User.findById(id);

    if (!user || !user.token || user.token !== token) {
      console.log('user', !token)
      next(httpError(401, "Not authorized"));
    }
    console.log('user', !token)
    req.user = user;
    next();
  } catch {
    next(httpError(401, "Not authorized"));
  }
};
module.exports = authenticate;
