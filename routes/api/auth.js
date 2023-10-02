const express = require("express");
const ctrlUser = require("../../controllers/auth");
const { validateBody, authenticate } = require("../../middlewares");
const { userSchemas } = require("../../models/user");
const router = express.Router();

router.post("/register", validateBody(userSchemas.registerSchema), ctrlUser.register);

router.post("/login", validateBody(userSchemas.loginSchema), ctrlUser.login);

router.get("/current", authenticate, ctrlUser.getCurrentUser);

router.post("/logout", authenticate, ctrlUser.logout);

module.exports = router;