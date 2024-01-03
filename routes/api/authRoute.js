const { Router } = require("express");
const { authMiddleware } = require("../../middlewares");
const { authController } = require("../../controllers");

const router = Router();

router.post("/register", authMiddleware.checkSignupData, authController.signup);
router.post("/login", authMiddleware.checkLoginData, authController.login);
router.post("/logout", authMiddleware.protect, authController.logout);

router.get("/current", authMiddleware.protect, authController.current);

router.patch("/", authMiddleware.protect, authMiddleware.checkSubscriptionData, authController.updateSubscription);

module.exports = router;
