const express = require("express");
const router = express.Router();
const { userAuth } = require("../../middlewares");
const { auth: ctrl } = require("../../controllers");

router.post("/register", ctrl.registerUser);

router.post("/login", ctrl.logInUser);

router.post("/logout", userAuth, ctrl.logOutUser);

router.get("/current", userAuth, ctrl.getCurrentUser);

router.patch("/", userAuth, ctrl.updateUserSubscription);

module.exports = router;
