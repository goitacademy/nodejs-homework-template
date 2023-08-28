const jwt = require("jsonwebtoken");

const User = require("../models/user");

const { SECRET_KEY } = process.env;

const authorize = async (req, res, next) => {
  try {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");

    if (bearer !== "Bearer") {
      return res.status(401).json({ message: "Not Authorized" });
    }

    try {
      const { id } = jwt.verify(token, SECRET_KEY);
      const user = await User.findById(id);

      if (!user || user.token !== token || !user.token) {
        return res.status(401).json({ message: "Not Authorized" });
      }

      req.user = user;
      next();
    } catch (error) {
      return res.status(401).json({ message: "Not Authorized" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = authorize;
