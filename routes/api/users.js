const express = require("express");

const ctrl = require("../../controllers/users");
const { schemas } = require("../../models/user");
const { validateBody, authenticate } = require("../../middlewares");

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), ctrl.registerUser);

router.post("/login", validateBody(schemas.loginSchema), ctrl.loginUser);

router.post("/logout", authenticate, ctrl.logoutUser);

router.get("/current", authenticate, ctrl.getCurrentUser);

router.patch("/", authenticate, validateBody(schemas.updateStatusSchema), ctrl.updateStatusUser);

module.exports = router;