const express = require("express");

const { schemas } = require("../../models/users");

const { validateBody } = require("../../middlewares/validateBody");

const { authenticate } = require("../../middlewares/authenticate");

const ctrl = require("../../controllers/authController");

const router = express.Router();

//signup
router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

//signin
router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

module.exports = router;
