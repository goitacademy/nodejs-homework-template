const express = require("express");

const UserController = require("../../controllers/usersController.js");
const validate = require("../../middlewares/validatitionMiddleware.js");
const authMiddleware = require("../../middlewares/authMiddleware.js");
const schema = require("../../models/user.js");

const router = express.Router();

router.post("/register", validate(schema.userSchema), UserController.register);
router.post("/login", validate(schema.userSchema), UserController.login);
router.post("/logout", authMiddleware, UserController.logout);
router.get("/current", authMiddleware, UserController.getCurrent);

module.exports = router;
