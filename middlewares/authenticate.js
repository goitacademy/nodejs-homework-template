const jwt = require("jsonwebtoken");

const { User } = require("../models");
const { HttpError } = require("../helpers");
const SECRET_KEY = process.env.SECRET_KEY;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  // масив містить певну кількість елементів, і нам потрібно розбити їх на окремі змінні
  //для зручності подальшої обробки даних, ми беремо bearer, token.
  if (bearer !== "bearer") {
    next(HttpError(401));
    //next перериває ф-цію
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.token || user.token !== token) {
      next(HttpError(401));
    }
    req.user = user;
    next();
  } catch {
    next(HttpError(401));
  }

  console.log('====================================');
  console.log("user ====>", user);
  console.log("token====>", token);
  console.log('====================================');
};

module.exports = authenticate;
