const express = require("express");

const {
  registration,
  login,
  logout,
  verifyUser,
  reverifyEmail,
} = require("../../../controllers/auth");
const { wrapper: wrapperError } = require("../../../middleware/error-handler");
const guard = require("../../../middleware/guard");
const limiter = require("../../../middleware/rate-limit");
const router = express.Router();

router.post(
  "/registration",
  limiter(15 * 60 * 1000, 2),
  wrapperError(registration)
);
router.post("/login", wrapperError(login));

router.get("/verify-email/:token", wrapperError(verifyUser));
router.get("/verify-email", wrapperError(reverifyEmail));

router.post("/logout", guard, wrapperError(logout));
module.exports = router;
