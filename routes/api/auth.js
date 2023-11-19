const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/users");

const { validateBody, authenticate } = require("../../middlewares");

const schemas = require("../../schemas");

router.post(
  "/register",
  validateBody(schemas.registerAndLoginSchema),
  ctrl.register
);
router.post("/login", validateBody(schemas.registerAndLoginSchema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logOut);

router.patch("/", authenticate, ctrl.updateSubscription);

module.exports = router;
