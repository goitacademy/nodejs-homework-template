const jwt = require("jsonwebtoken");
const { User } = require("../service");
const { SECRET_KEY } = process.env;
// const { RequestError } = require("../../helpers/RequestError");

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer = "", token = ""] = authorization.split(" ");
  try {
    if (bearer !== "Bearer") {
      // throw RequestError(401, Token not found);
      res.status(401).json({
        message: "Not authorized",
      });
    } else {
      try {
        const { id } = jwt.verify(token, SECRET_KEY);
        const user = await User.findById(id);
        if (!user || !user.token) {
          res.status(401).json({
            message: "Not authorized",
          });
        } else {
          req.user = user;
          next();
        }
      } catch (error) {
        // throw RequestError(401, Token not found);
        res.status(401).json({
          message: "Not authorized",
        });
      }
    }
  } catch (error) {
    next(error);
  }
};

module.exports = authenticate;
