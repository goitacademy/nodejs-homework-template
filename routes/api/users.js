const express = require("express");
const ctrl = require("../../controller/users");
const { authenticate } = require("../../middlewares");
const { registration, login } = require("../../utils/validation");
const router = express.Router();

router.route("/").patch(authenticate, ctrl.updateSubscription);
router.route("/register").post(registration, ctrl.register);
router.route("/login").post(login, ctrl.login);
router.route("/logout").post(authenticate, ctrl.logout);
router.route("/current").post(authenticate, ctrl.current);

module.exports = router;
