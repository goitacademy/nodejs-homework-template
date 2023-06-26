const express = require("express");
const router = express.Router();
const userController = require("../controllers/users");
const { auth } = require("../middlewares/auth");
const { validateBody } = require("../middlewares/validateBody");
const { userSchema } = require("../utils/validators/validator");

router.post("/signup", validateBody(userSchema), userController.register);
router.post("/login", validateBody(userSchema), userController.login);
router.post("/logout", auth, userController.logout);
router.get("/current", auth, userController.current);

module.exports = router;
