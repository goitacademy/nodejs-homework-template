const jwt = require("jsonwebtoken");
const { UserModel } = require("../users/user.model");

exports.authorize = () => {
  return async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization || "";
      const token = authHeader.replace("Bearer ", "");
      if (!token) {
        res.status(401).json({ message: "Not autorized" });
        return;
      }
      const payload = jwt.virify(token, process.env.JWT_SECRET);
      const user = await UserModel.findById(payload.uid);
      if (!user) {
        res.status(401).json({ message: "Not autorized" });
        return;
      }
      req.user = user;
      next();
    } catch (error) {
      console.log(error.message);
    }
  };
};
