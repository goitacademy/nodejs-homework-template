const express = require("express");
const router = express.Router();

const { authenticate } = require("../../middlewares");

const ctrl = require("../../controllers");

router.post("/register", ctrl.userRegister);

router.post("/login", ctrl.userLogin);

router.post("/logout", authenticate, ctrl.userLogout);

router.get("/current", authenticate, ctrl.userCurrent);

router.patch("/", authenticate, ctrl.userUpdateSubscription);

module.exports = router;