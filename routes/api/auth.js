const express = require("express");
const ctrlUser = require("../../controllers/auth");
const { validateBody, authenticate } = require("../../middlewares");
const { userAuthShemas } = require("../../models/user");

const router = express.Router();

router.post("/register", validateBody(userAuthShemas.registerSchema), ctrlUser.register);

router.post("/login", validateBody(userAuthShemas.loginSchema), ctrlUser.login);

router.get("/current", authenticate, ctrlUser.getCurrentUser);

router.post("/logout", authenticate, ctrlUser.logout);

module.exports = router;