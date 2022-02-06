const express = require("express");
const { validation, auth } = require("../../middleware");
const { joiAuthSchema, joiSubscriptionSchema } = require("../../models");
const ctrl = require("../../controllers/users");

const router = express.Router();

router.post("/signup", validation(joiAuthSchema), ctrl.signUp);

router.post("/login", validation(joiAuthSchema), ctrl.login);

router.get("/current", auth, ctrl.getCurrent);

router.get("/logout", auth, ctrl.logout);

router.patch("/", auth, validation(joiSubscriptionSchema), ctrl.updateSubscription);

module.exports = router;
