const jwt = require("jsonwebtoken");
const { userMethod } = require("../repository");
const { HttpCode } = require("../utils");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/.env" });
const { JWT_SECRET_KEY } = process.env;

const verifyToken = (token) => {
  try {
    const verify = jwt.verify(token, JWT_SECRET_KEY);
    return !!verify;
  } catch (e) {
    return false;
  }
};

const guard = async (req, res, next) => {
  const token = req.get("authorization")?.split(" ")[1];
  const isValidToken = verifyToken(token);
  if (!isValidToken) {
    return res.status(HttpCode.UNAUTHORIZED).json({
      status: "error",
      code: HttpCode.UNAUTHORIZED,
      message: "Not authorized",
    });
  }
  const payload = jwt.decode(token);
  const user = await userMethod.findById(payload.id);
  if (!user || user.token !== token) {
    return res.status(HttpCode.UNAUTHORIZED).json({
      status: "error",
      code: HttpCode.UNAUTHORIZED,
      message: "Not authorized",
    });
  }
  req.user = user; // res.locals.user = user
  next();
};

module.exports = guard;
