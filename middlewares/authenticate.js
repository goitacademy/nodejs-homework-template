const jwt = require("jsonwebtoken");

const { User } = require("../models");
const { HttpError } = require("../helpers");
const SECRET_KEY = process.env.SECRET_KEY;

const authenticate = async (req, res, next) => {
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
    req.user = user;
    next();
  } catch {
    next(HttpError(401));
  }
};

module.exports = authenticate;
