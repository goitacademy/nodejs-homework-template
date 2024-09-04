import passport from "passport";
import { User } from "../models/user.js";

const authMiddleware = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, async (error, user) => {
    if (!user || error) {
      return res.status(401).json({
        status: "401 Unauthorized",
        code: 401,
        message: "Not authorized",
      });
    }
    try {
      const token = req.header("Authorization").replace("Bearer ", "");
      const isUser = await User.findOne({ _id: user._id, token: token });

      if (!isUser) {
        return res.status(401).json({
          status: "401 Unauthorization",
          code: 401,
          message: "Token is not valid",
        });
      }
      req.user = isUser;
      next();
    } catch (error) {
      res.status(500).json({
        status: "500 Internal Server Error ",
        code: 500,
        message: "Server error",
      });
    }
  })(req, res, next);
};

export default authMiddleware;
