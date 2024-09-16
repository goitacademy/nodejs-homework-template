const jwt = require("jsonwebtoken");

const { User } = require("../models/user");

const { HttpError } = require("../helpers");

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;

  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    console.log("перевірка bearer");
    next(HttpError(401));
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    console.log("id--->", id);
    console.log("token--->", token);
    const user = await User.findById(id);
    console.log("user--->", user);
    if (!user || !token) {
      console.log(
        "перевірка чи є user або token--->",
        "user:",
        user,
        "user.token:",
        token
      );
      next(HttpError(401));
    }

    req.user = user;
    console.log("коли є user--->", user);
    next();
  } catch {
    console.log("catch - не пройшов перевірку user");
    next(HttpError(401));
  }
};

module.exports = authenticate;
