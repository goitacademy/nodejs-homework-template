const express = require("express");
const authController = require("../../controllers/usersControllers");
const { authMiddleware } = require("../../middlewares/authMiddleware");

const router = express.Router();

router.post("/users/signup", authController.register);
router.post("/users/login", authController.login);
router.post("/users/logout", authMiddleware, authController.logout);
router.get("/users/current", authMiddleware, authController.getCurrentUser);
router.patch("/users", authMiddleware, authController.updateSubscription);

module.exports = router;
