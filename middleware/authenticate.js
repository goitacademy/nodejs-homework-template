const jwt = require("jsonwebtoken");
const { User } = require("../service");
const { SECRET_KEY } = process.env;
const RequestError = require("../helpers/RequestError");

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer = "", token = ""] = authorization.split(" ");
  try {
    if (bearer !== "Bearer" || !token) {
      throw RequestError(401, "Not authorized");
    } else {
      try {
        const { id } = jwt.verify(token, SECRET_KEY);
        const { email } = jwt.verify(token, SECRET_KEY);
        const user = await User.findById(id);
        const us = await User.find({ email: email });
        console.log(user);
        console.log(us);
        if (!user || !user.token) {
          throw RequestError(401, "Not authorized");
        } else {
          req.user = user;
          next();
        }
      } catch (error) {
        throw RequestError(401, "Not authorized");
      }
    }
  } catch (error) {
    next(error);
  }
};

module.exports = authenticate;
