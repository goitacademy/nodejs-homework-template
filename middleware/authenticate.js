const jwt = require("jsonwebtoken");
const { User } = require("../service");
const { SECRET_KEY } = process.env;
// const { RequestError } = require("../../helpers/RequestError");

const authenticate = async (req, res, next) => {
  try {
    const { authorization = "" } = req.headers;
    const [bearer = "", token = ""] = authorization.split(" ");
    if (bearer !== "Bearer") {
      // throw RequestError(401, Token not found);
      res.status(401).json({
        message: "Not authorized",
      });
    } else {
      const { id } = jwt.verify(token, SECRET_KEY);
      const user = await User.findById(id);
      console.log(id);
      //   console.log(user);
      try {
        if (!user || !user.token) {
          res.status(401).json({
            message: "Not authorized",
          });
        }
        req.user = user;
        next();
      } catch (error) {
        // throw RequestError(401, Token not found);
        res.status(401).json({
          message: error.message,
        });
      }
    }
  } catch (error) {
    next(error);
  }
};

module.exports = authenticate;
