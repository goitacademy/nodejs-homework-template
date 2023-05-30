const express = require("express");
const { schemas } = require("../../models/user");
const { validateBody } = require("../../middlewares");
const ctrl = require("../../controllers/auth");
const { ctrlWrapper } = require("../../helpers");
const { authenticate } = require("../../middlewares");

const router = express.Router();

router.post(
  "/register",
  validateBody(schemas.registerSchema),
  ctrlWrapper(ctrl.register)
);

router.post(
  "/login",
  validateBody(schemas.loginSchema),
  ctrlWrapper(ctrl.login)
);

router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrent));
router.post("/logout", authenticate, ctrlWrapper(ctrl.logout));
router.patch(
  "/",
  authenticate,
  validateSub(schemas.updateFavoriteSchema),
  ctrlWrapper(ctrl.updateSubscription)
);
module.exports = router;
