const express = require("express");
const ctrl = require("../../controllers/auth");


const { schemas } = require("../../models/user");
const { validateBody, authenticate } = require("../../middlewares");
const router = express.Router();

//signup
router.post("/register", validateBody(schemas.registerSchema), ctrl.register);
//signin
router.post("/login",validateBody(schemas.loginSchema), ctrl.login);
//Current
router.get("/current", authenticate, ctrl.getCurrent);
//Logout
router.post("/logout", authenticate, ctrl.logout);
//Logout
router.patch("/", authenticate, ctrl.updateUser);

module.exports = router;