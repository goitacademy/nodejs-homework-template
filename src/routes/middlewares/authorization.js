import passport from "passport";
import { handleUserUnauthorizedError } from "../../utils/handleErrors.js";

const auth = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (
      err ||
      !user ||
      req.headers.authorization.split(" ").at(1) !== user.token
    ) {
      return handleUserUnauthorizedError(res, "Not authorized");
    }

    req.user = user;
    next();
  })(req, res, next);
};

export default auth;
