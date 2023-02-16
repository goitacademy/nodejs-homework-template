// const {Unauthorized} = require("http-errors")
const { User } = require("../../models");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const auth = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    res.status(401).json({
      status: "Error",
      code: 401,
      message: "Not authorized",
    });
    return;
    // throw new Unauthorized("Not authorized");
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY);

    const user = await User.findById(id);

    if (!user) {
      res.status(401).json({
        status: "Error",
        code: 401,
        message: "Not authorized",
      });
      return;
      // throw new Unauthorized("Not authorized");
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      status: "Error",
      code: 401,
      message: "Not authorized",
    });

    next(error);

    // if (error.message === "Invalid signature") {
    //   error.status = 401;
    // }
    // next(error);
  }
};

module.exports = auth;
