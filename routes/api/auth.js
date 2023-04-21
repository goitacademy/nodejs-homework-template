const router = require("express").Router();
const { bodyValidator } = require("../../middlewares");
const { schemas } = require("../../models/user");

const { registerUser, userLogin } = require("../../controllers/auth");

router.post("/register", bodyValidator(schemas.registerSchema), registerUser);

router.post("/login", bodyValidator(schemas.loginSchema), userLogin);

module.exports = router;
