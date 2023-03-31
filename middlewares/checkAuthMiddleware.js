const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
const { JWT_SECRET_KEY } = process.env;

const auth = async (req, res, next) => {
  try {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer" || !token) {
      throw new Error("Not authorized");
    }

    const { id } = jwt.verify(token, JWT_SECRET_KEY);
    const user = await User.findById(id);

    if (!user || !user.token) {
      throw new Error("Not authorized");
    }

    req.user = user;

    next();
  } catch (error) {
    console.log(error.message);

    return res.status(401).json({
      message: "Not authorized",
    });
  }
};

module.exports = auth;
