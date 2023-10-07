const express = require("express");

const ctrl = require("../../controllers/auth");

const validateBody = require("../../middlewares/validateBody");
const authenticate=require("../../middlewares/autenticate")

const {schemas} = require("../../utils/validation/userValidation");

const router = express.Router();

// signup
router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

// signin
router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

 router.get("/current", authenticate, ctrl.getCurrent);

 router.post("/logout", authenticate, ctrl.logout);

module.exports = router;