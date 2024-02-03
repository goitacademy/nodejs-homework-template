// routes/middleware/authMiddleware.js
import authenticateUser from "../middleware/authenticate.js";

const authMiddleware = (req, res, next) => {
  authenticateUser(req, res, next);
};

export default authMiddleware;
