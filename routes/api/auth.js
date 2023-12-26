const express = require("express");

const { validateBody, authenticate } = require("../../middlewares");

const { schemas } = require("../../models/user");

const cntrl = require("../../controllers/auth");

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), cntrl.register);
router.post("/login", validateBody(schemas.loginSchema), cntrl.login);
router.get("/current", authenticate, cntrl.getCurrent);
router.post("/logout", authenticate, cntrl.logout);

module.exports = router;
