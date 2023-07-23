const express = require("express");

// const ctrl = require("../../controllers/users/auth");
const ctrl = require("../../controllers/users")

const {validateBody, authenticate} = require("../../middlewares");

const {schemas} = require("../../models/user")


const router =express.Router();


// signup
router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

// signup
router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

router.patch("/subscription",authenticate,validateBody(schemas.subscriptionSchema), ctrl.updateSubscription)


module.exports = router;




