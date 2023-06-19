const express = require("express");
const controllers = require("../../controllers/auth");
const {authenticate} = require("../../middlewares")

const router = express.Router();

// signup
router.post("/register", controllers.register);


// signin
router.post("/login", controllers.login)

router.get("/current", authenticate, controllers.getCurrent)

router.patch("/", authenticate, controllers.updateSubscription)

router.post("/logout", authenticate, controllers.logout)

module.exports = router;