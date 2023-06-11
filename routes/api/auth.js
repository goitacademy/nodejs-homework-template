const express = require("express");
const validate = require("../middleware/validation");
const schemas = require("../schemas");
const router = express.Router();
const authenticate = require("../middleware/authenticate");

const {  register, login, getCurrent, logout } = require("../../controllers");



router.post("/register", validate(schemas.registerSchema), register);
router.post("/login", validate(schemas.loginSchema), login);
router.get("/current", authenticate, getCurrent)
router.post("/logout", authenticate, logout)




module.exports = router;
