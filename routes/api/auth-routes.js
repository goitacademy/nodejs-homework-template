const express = require("express");
const router = express.Router();

const { schemas } = require("../../models/user");
const { validateBody } = require("../../utils/validateBody");
const authController = require("../../controllers/user-controllers");

router.post("/register", validateBody(schemas.userRegisterSchema), authController.register);
router.post("/login", validateBody(schemas.userLoginSchema), authController.login);

module.exports = router;
