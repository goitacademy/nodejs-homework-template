const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/auth");
const authenticate = require("../../middlewares/authenticate");

// signup
router.post("/register", ctrl.register);

// signin
router.post("/login", ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

// logout

router.post("/logout", authenticate, ctrl.logout);

// changes in user profile

router.patch("/", authenticate, ctrl.updateSubscription);

module.exports = router;
