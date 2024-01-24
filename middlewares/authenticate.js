const jwt = require("jsonwebtoken");

const { User } = require("../models/user");

const { HttpError } = require("../helpers");

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  console.log("Authorization Header:", authorization);
  console.log("Bearer:", bearer);
  console.log("Token:", token);

  if (bearer !== "Bearer") {
    next(HttpError(401, "Not authorized"));
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY);

    console.log("SECRET_KEY:", process.env.SECRET_KEY);

    const user = await User.findById(id);

    console.log("User Token:", user ? user.token : "User not found");
    console.log("Received Token:", token);

    if (!user || !user.token || user.token !== token) {
      // console.log("Tokenclear mismatch or user not authorized");

      next(HttpError(401, "Not authorized"));
    }
    req.user = user;
    next();
  } catch (error) {
    // console.error("Error verifying token:", error);

    next(HttpError(401, "Not authorized"));
  }
};

module.exports = authenticate;
