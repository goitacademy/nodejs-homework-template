const jwt = require("jsonwebtoken");
const { User } = require("../service");
const { SECRET_KEY } = process.env;
const RequestError = require("../helpers");

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer = "", token = ""] = authorization.split(" ");
  try {
    if (bearer !== "Bearer" || !token) {
      throw RequestError(401, "Not authorized");
    } else {
      try {
        const { id } = jwt.verify(token, SECRET_KEY);
        const user = await User.findById(id);
        if (!user[0] || !user[0].token || !user.verify) {
          throw RequestError(401, "Not authorized");
        } else {
          req.user = user[0];
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
