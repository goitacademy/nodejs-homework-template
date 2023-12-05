const { Router } = require("express");

const ctrl = require("../../controllers/users");
const { registerSchema, loginSchema } = require("../../validations/usersSchemas");
const { isValidBody } = require("../../middlewares");

const router = Router();

router.post("/register", isValidBody(registerSchema), ctrl.register);
router.post("/login", isValidBody(loginSchema), ctrl.login);
router.get("/current", ctrl.current);
router.post("/logout", ctrl.logout);

module.exports = router;
