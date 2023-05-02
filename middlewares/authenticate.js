const jwt = require("jsonwebtoken");
<<<<<<< HEAD
=======

>>>>>>> 22513394b068499e24accb9e01491fc86a886f58
const { User } = require("../models");
const { HttpError } = require("../helpers");
const SECRET_KEY = process.env.SECRET_KEY;

const authenticate = async (req, res, next) => {
<<<<<<< HEAD
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return next(HttpError(401, "Authorization header missing"));
    }
    const [bearer, token] = authorizationHeader.split(" ");
    // масив містить певну кількість елементів, і нам потрібно розбити їх на окремі змінні
    //для зручності подальшої обробки даних, ми беремо bearer, token.
    if (bearer !== "Bearer" || !token) {
      return next(HttpError(401, "Not authorized"));
      //next перериває ф-цію
    }
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);

    if (!user || !user.token || user.token !== token) {
      next(HttpError(401));
    }
=======
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  // масив містить певну кількість елементів, і нам потрібно розбити їх на окремі змінні
  //для зручності подальшої обробки даних, ми беремо bearer, token.
  if (bearer !== "bearer" || !token) {
    next(HttpError(401, "Not authorized"));
    //next перериває ф-цію
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    //
    console.log("user =====>", user);
    console.log("user.token =====>", user.token);
    console.log("token =====>", token);

    if (!user ){
      next(HttpError(401));
    }
    if( !user.token ) {
 //
 console.log("3===>");
 //
    }
    if( user.token !== token){
 //
 console.log("4===>");
 //
    }
>>>>>>> 22513394b068499e24accb9e01491fc86a886f58
    req.user = user;
    next();
  } catch {
    next(HttpError(401));
  }
};

module.exports = authenticate;
