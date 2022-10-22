const express = require("express");

const { ctrlWrapper } = require("../../helpers");

const { validateBody, authenticate } = require("../../middelwares");

const ctrl = require("../../controllers/auth");

const { schemas } = require("../../models/users");

const router = express.Router();

router.post(
  "/register",
  validateBody(schemas.authSchemas),
  ctrlWrapper(ctrl.register)
);

router.post(
  "/login",
  validateBody(schemas.authSchemas),
  ctrlWrapper(ctrl.login)
);

router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrent));
router.get("/logout", authenticate, ctrlWrapper(ctrl.logout));

router.patch(
  "/",
  authenticate,
  validateBody(schemas.subscription),
  ctrlWrapper(ctrl.subscription)
);

module.exports = router;
