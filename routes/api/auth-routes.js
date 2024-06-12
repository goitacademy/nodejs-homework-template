const express = require('express');
const ctrl = require("../../controllers/auth-controllers.js");

const router = express.Router();

const authenticate = require("../../middlewares/authenticate.js");

router.post("/users/register", ctrl.register);
router.post("/users/login", ctrl.login);
router.get("/users/current", authenticate, ctrl.getCurrent);
router.post("/users/logout", authenticate, ctrl.logout);
router.patch("/users", authenticate, ctrl.updateSubscription)

module.exports = router;