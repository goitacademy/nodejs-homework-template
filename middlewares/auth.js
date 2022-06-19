const { User } = require("../models/user");
const jwt = require("jsonwebtoken");

const { SEKRET_KEY } = process.env;

const auth = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  try {
    if (bearer !== "Bearer") {
      return res.status(401).json({ message: "Not authorized" });
    }
    const { id } = jwt.verify(token, SEKRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.token) {
      return res.status(401).json({ message: "Not authorized" });
    }
    req.user = user;
    next();
  } catch (error) {
    if (error.message === "Invalid sugnature") {
      res.status(401);
    }
    next(error);
  }
};

module.exports = {
  auth,
};
