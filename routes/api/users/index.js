const express = require("express");
const router = express.Router();
const usersController = require("../../../controllers/usersController");
const validate = require("./validation");
const guard = require("../../../helpers/guard");
const upload = require("../../../helpers/upload");
const { createAccountLimiter } = require("../../../helpers/rate-limit-reg");

router.post(
  "/registration",
  createAccountLimiter,
  validate.registration,
  usersController.registration
);
router.patch(
  "/avatars",
  [guard, upload.single("avatar"), validate.updateAvatar],
  usersController.avatars
);

router.patch(
  "/:id",
  validate.updateSubscription,
  usersController.updateSubscriptionById
);

router.post("/login", validate.login, usersController.login);
router.post("/logout", guard, usersController.logout);

router.get("/verify/:token", usersController.verify);
router.post("/verify", usersController.repeatEmailVerify);

module.exports = router;
