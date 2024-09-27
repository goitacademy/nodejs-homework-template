const jwt = require("jsonwebtoken");

const User = require("../models/users");

const { SECRET_KEY } = process.env;

const tokenValidation = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  try {
    if (bearer !== "Bearer") {
      res.status(401).json({ message: "Not authorized" });
      return;
    }

    const { id } = jwt.verify(token, SECRET_KEY);

    const user = await User.findById(id);

    if (!user || !user.token) {
      res.status(401).json({ message: "Not authorized" });
      return;
    }

    req.user = user;

    next();
  } catch (error) {
    if (error.message === "invalid signature") {
      error.status = 401;
      error.message = "Not authorized";
    }
    next(error);
  }
};

module.exports = tokenValidation;