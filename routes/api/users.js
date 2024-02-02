const express = require("express");

const AuthController = require("../../controllers/auth");

const authMiddleware = require("../../middleware/auth");
const { schemas } = require("../../models/user");
const { validateBody } = require("../../middleware/validateBody");

const router = express.Router();
const jsonParser = express.json();

router.post("/register", jsonParser, validateBody(schemas.registerSchema), AuthController.register);
router.post("/login", jsonParser, validateBody(schemas.loginSchema), AuthController.login);
router.post("/logout", authMiddleware, AuthController.logout);
router.get("/current", authMiddleware, AuthController.current);
// router.patch(
//     "/",
//     authMiddleware,
//     validateBody(schemas.subscriptionListSchema),
//     AuthController.updateSubscription
//   );
module.exports = router;