const express = require("express");
const AuthController = require("../../controllers/users");
const authMiddleware = require("../../middlewares/users");

const validate = require("../../middlewares/validate.js");
const schema = require("../../middlewares/schema/contact.js");

const router = express.Router();

router.post("/register", validate(schema.userSchema),AuthController.register);

router.post("/login", validate(schema.userSchema), AuthController.login);

router.get("/logout", authMiddleware, AuthController.logout);

router.get("/current", authMiddleware, AuthController.getCurrent);

module.exports = router;
