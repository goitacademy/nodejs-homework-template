const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user");

const { SECRET_KEY } = process.env;

const auth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization || authorization === "undefined")
      return res.status(401).json({
        message: "Not authorized",
      });

    const [bearer, token] = authorization.split(" ");

    if (bearer !== "Bearer")
      return res.status(401).json({
        message: "Not authorized",
      });

    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await UserModel.findOne({ _id: id });
    if (!user || !user.token)
      return res.status(401).json({
        message: "Not authorized",
      });
    req.user = user;
    next();
    return user;
  } catch (error) {
    next(error);
  }
};

module.exports = auth;
