const jwt = require("jsonwebtoken");
const { getUserById } = require("../models");

const validationToken = async (req, res, next) => {
  const authHeader = req.headers.authorization || "";
  const [tokenType, token] = authHeader.split(" ");
  if (tokenType === "Bearer" && token) {
    try {
      const verifiedTokenUser = jwt.verify(
        token,
        process.env.JWT_SECRET
      ); /* verify выбросит ошибку, если token invalid */
      const user = await getUserById(verifiedTokenUser._id);
      if (!user || user.token !== token) {
        throw new Error();
      }
      req.user = user;
      next();
    } catch (error) {
      error.message = "Not authorized";
      error.status = 401;
      next(error);
    }
  }
};

module.exports = validationToken;
