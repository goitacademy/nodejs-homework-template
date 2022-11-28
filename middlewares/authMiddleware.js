const jwt = require("jsonwebtoken");
const { getUserById } = require("../services/usersService");

const unAuthorizedError = (res) => {
  res.status(401).json({
    message: "Not authorized",
  });
};

const authMiddleware = async (req, res, next) => {
  const [, token] = req.headers.authorization.split(" ");
  if (!token) {
    unAuthorizedError(res);
    return;
  }

  try {
    const user = await jwt.verify(token, process.env.JWT_SECRET);
    const checkUserById = await getUserById(user._id);
    if (!checkUserById) {
      unAuthorizedError(res);
      return;
    }
    req.token = token;
    req.user = user;
    next();
  } catch {
    unAuthorizedError(res);
  }
};

module.exports = { authMiddleware };
