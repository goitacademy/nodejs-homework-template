const express = require("express");
const router = express.Router();
const { reqValidation, authMiddleware } = require("../../midlewares");
const { schemas } = require("../../schemas/mongooseSchemas/userSchema");
const func = require("../../controllers/authController");

router.post("/register", reqValidation(schemas.registerSchema), func.register);

router.post("/login", reqValidation(schemas.loginSchema), func.login);

router.post("/logout", authMiddleware, func.logout);

router.get("/current", authMiddleware, func.getCurrent);

module.exports = router;
