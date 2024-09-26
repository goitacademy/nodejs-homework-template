const jwt = require("jsonwebtoken");

const { User } = require("../models/user");

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    res.status(401).json({
      message: "Not authorized",
    });
    return;
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);

    if (!user || !user.token || user.token !== token) {
      res.status(401).json({
        message: "Not authorized",
      });
    }

    req.user = user;

    next();
  } catch {
    res.status(401).json({
      message: "Not authorized",
    });
  }
};

module.exports = authenticate;
