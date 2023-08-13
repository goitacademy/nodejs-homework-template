const express = require("express");
const validateBody = require("../../middlewares/validateBody");

const ctrl = require("../../controllers/auth");

const router = express.Router();

const { schemas } = require("../../models/user")


// signup

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);


router.post("/login", validateBody(schemas.loginSchema), ctrl.login);


module.exports = router;
