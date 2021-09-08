const jwt = require("jsonwebtoken");
const { users: service } = require("../services");

const { SECRET_KEY } = process.env;

const authentificate = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer") {
      return res.status(401).json({
        status: "error",
        code: 401,
        message: "Not authorized***",
      });
    }
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await service.getById(id);
    // console.log(user);
    if (!user || !user.token) {
      return res.status(401).json({
        status: "error",
        code: 401,
        message: "Not authorized**",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    error.status = 401;
    error.message = "Not authorized*";
    next(error);
  }
};

module.exports = authentificate;
