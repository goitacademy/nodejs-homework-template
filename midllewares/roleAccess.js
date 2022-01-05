import { HttpCode } from "../lib/constants";
import { FORBIDDEN } from "../lib/message";

const guard = (role) => async (req, res, next) => {
  const roleCurrentUser = req.user.role;
  if (roleCurrentUser !== role) {
    return res.status(HttpCode.UNAUTHORIZED).json({
      status: "error",
      code: HttpCode.FORBIDDEN,
      message: FORBIDDEN[req.app.get("lang")],
    });
  }
  next();
};

export default guard;
