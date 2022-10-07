const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
const { RequestError } = require("../helpers");

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  try {
    const { authorization = "" } = req.headers;
    const [bearer = "", token = ""] = authorization.split(" ");
    if (bearer !== "Bearer") {
      throw RequestError({ status: 401 });
    }
    try {
      const { id } = jwt.verify(token, SECRET_KEY);
      const user = await User.findById(id);
      if (!user || !user.token) {
        throw Error("Unauthorized");
      }
      req.user = user;
      next();
    } catch (error) {
      throw RequestError({ status: 401 });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = authenticate;
