const express = require("express");
const ctrl = require("../../controllers/authController");
const validateBody = require("../../middlewares/bodyValidation");

const {schemas} = require("../../models/users");

const router = express.Router();



router.post("/register", validateBody(schemas.registerSchema),ctrl.register);

router.post("/login", validateBody(schemas.loginSchema),ctrl.login);

module.exports = router;


