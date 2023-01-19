const jwt = require("jsonwebtoken");
const UserSchema = require("../users/schema");

const userMiddleware = async (req, res, next) => {
  const token = req.headers?.authorization.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ message: "Not authorized" });
  }
  try {
    const { id } = jwt.verify(token, process.env.SECRET_TOKEN);
    const user = await UserSchema.findById(id);
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Not authorized" });
  }
};

module.exports = userMiddleware;
