const { currentUser } = require("../service/users");
const { verifyToken } = require("../token");

const userMiddleware = async (req, res, next) => {
  if (!req.headers.authorization) {
    res
      .status(401)
      .json({
        message: "Not authorized",
      })
      .end();
  }
  try {
    const token = req.headers.authorization.slice(7);
    const userData = await verifyToken(token);
    const user = await currentUser(userData.id);
    if (user && user.token === token) {
      req.user = user;
      next();
      return;
    }
  } catch (e) {
    console.error(e);
  }
};

module.exports = userMiddleware;
