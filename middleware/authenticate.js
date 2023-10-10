const jwt = require("jsonwebtoken");

const { User } = require("../models/user");
const { HttpError } = require("../helpers");
const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    console.log("❌ Error auth 1");
    next(HttpError(401));
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    console.log("ID from token: ", id, "\nToken: ", token);

    const user = await User.findById(id);

    console.log("USER bio: ", user);

    if (!user || !user.token || user.token !== token) {
      console.log("❌ Error auth 2");
      next(HttpError(401));
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("❌ Error auth 3: ", error.message);
    next(HttpError(401));
  }
};

module.exports = authenticate;
