const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/users");

const { authenticate, validateUsers } = require("../../middlewares");

const schemas = require("../../schemas");

router.post(
  "/register",
  validateUsers(schemas.registerAndLoginSchema),
  ctrl.register
);
router.post(
  "/login",
  validateUsers(schemas.registerAndLoginSchema),
  ctrl.login
);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logOut);

router.patch("/", authenticate, ctrl.updateSubscription);

module.exports = router;
