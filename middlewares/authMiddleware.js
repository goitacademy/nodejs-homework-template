/*
 * Middleware that helps to take token out of Authorization header
 * 1. Checking for valid token (that is not expired)
 * 2. Take out the ID from the token, find the USER with that ID and
 * attaches that user to the req.user
 */
const { User } = require("../models");
const createError = require("http-errors");
const jwt = require("jsonwebtoken");

require("dotenv").config();
const { SECRET_KEY } = process.env;

const authMiddleware = async (req, res, next) => {
  // 1. getting the content from the Authorization header, and default value empty string
  const { authorization = "" } = req.headers;

  // 2. deviding two words by " ", and destructirisation of bearer and token
  const [bearer, token] = authorization.split(" ");

  // 3. if bearer doesn't equal "Bearer" then show Unauthorized error
  if (bearer !== "Bearer") {
    throw new createError.Unauthorized("Not authorized");
  }
  // 4. check if the token is valid, if not, use try/catch that helps to catch an error
  try {
    const { id } = jwt.verify(token, SECRET_KEY);

    // 5. if the token is valid, get the ID and find the user with that ID
    const user = await User.findById(id);
    if (!user || !user.token) {
      throw new createError.Unauthorized("Not authorized");
    }
    // 6. if we found a user with ID we have to attach it to the requested object
    req.user = user;

    // 7. go to the next processor getCurrent
    next();
  } catch (error) {
    // processes an error if the token is not valid
    if (error.message === "Invalid Signature") {
      error.status = 401;
    }
    next(error);
  }
};

module.exports = authMiddleware;
