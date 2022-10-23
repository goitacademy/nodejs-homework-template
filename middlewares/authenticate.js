const jwt = require("jsonwebtoken");
const { User } = require("../model/user");
const { SECRET_KEY } = process.env;
const requestError = require("../helpers/requestError");

const authenticate = async (req, res, next) => {
  try {
    const { authorization = "" } = req.headers;
    const [bearer = "", token = ""] = authorization.split(" ");
    if (bearer !== "Bearer" || !token) {
      throw requestError(401, "Unauthorized");
    }
    try {
      const { id } = jwt.verify(token, SECRET_KEY);
      const user = await User.findById(id);
      if (!user || !user.token) {
        throw Error("Unauthorized");
      } else {
        req.user = user;
        next();
      }
    } catch (error) {
      throw requestError(401, "Unauthorized");
    }
  } catch (error) {
    next(error);
  }
};

module.exports = authenticate;
