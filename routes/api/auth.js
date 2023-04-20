const router = require("express").Router();
const { bodyValidator } = require("../../middlewares");
const { schemas } = require("../../models/user");

const { registerUser } = require("../../controllers/auth");

router.post("/register", bodyValidator(schemas.registerSchema), registerUser);

module.exports = router;
