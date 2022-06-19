const express = require("express");
const router = express.Router();
const { auth: ctrl, users: usersCtrl } = require("../../controllers");
const { validation, auth } = require("../../middlewares");
const { joiUserSchema } = require("../../models/user");

router.post("/signup", validation(joiUserSchema), ctrl.signup);

router.post("/login", validation(joiUserSchema), ctrl.login);

router.get("/current", auth, usersCtrl.getCurrent);

router.get("/logout", auth, ctrl.logout);

router.patch("/", auth, usersCtrl.updateSubscription);

module.exports = router;
