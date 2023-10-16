const express = require("express");
const router = express.Router();
const ctrl =  require("../../controllers/user");
const validateBody = require("../../middlewares/validateBody");
const authenticate = require("../../middlewares/authenticate");
const {schemas} = require("../../models/user");

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrentUser);

router.get("/logout", authenticate, ctrl.logout);

router.patch("/", authenticate, validateBody(schemas.subscriptionSchema), ctrl.subscription);

module.exports = router;