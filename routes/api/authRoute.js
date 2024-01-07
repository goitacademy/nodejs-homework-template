const { Router } = require("express");
const { authMiddleware } = require("../../middlewares");
const { authController } = require("../../controllers");
const utils = require("../../utils");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, utils.uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  limits: {
    fileSize: 1048576,
  },
});

const upload = multer({
  storage: storage,
});

const router = Router();

router.post("/register", authMiddleware.checkSignupData, authController.signup);
router.post("/login", authMiddleware.checkLoginData, authController.login);
router.post("/logout", authMiddleware.protect, authController.logout);

router.get("/current", authMiddleware.protect, authController.current);

router.patch("/", authMiddleware.protect, authMiddleware.checkSubscriptionData, authController.updateSubscription);

router.patch("/avatars", authMiddleware.protect, upload.single("avatar"), authController.uploadAvatar);
module.exports = router;
