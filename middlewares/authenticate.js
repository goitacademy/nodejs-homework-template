const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { HttpError } = require("../helpers");
const SECRET_KEY = process.env.SECRET_KEY;

const authenticate = async (req, res, next) => {
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
 req.user = user;
    next();
  } catch {
    next(HttpError(401));
  }
};

module.exports = authenticate;
