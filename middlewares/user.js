const { verifyToken, generateToken } = require("../token");

const userMiddleware = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    res
      .status(401)
      .json({
        message: "Not authorized",
      })
      .end();
    return;
  }
  try {
    const userData = await verifyToken(token.slice(7));
    const user = await currentUser(userData.id);
    if (user && user.token === token) {
      req.user = userData;
      next();
      return;
    }
  } catch (e) {
    console.error(e);
  }
};

module.exports = userMiddleware;
