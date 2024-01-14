const express = require("express");
const router = express.Router();
const errorHandler = require("../../services/errorHandler");

const {
  userMiddleware,
  checkToken,
  logoutMiddleware,
  currentUser,
  loginMiddleware,
  uploadUserAvatar,
  updateUser,
  verifyUser,
  verifyManualSend,
} = require("../../middlewares/userMiddlewares");

router.use(errorHandler);
router.post("/register", userMiddleware);
router.post("/login", loginMiddleware);
router.post("/logout", checkToken, logoutMiddleware);
router.get("/current", checkToken, currentUser);
router.patch("/avatars", checkToken, uploadUserAvatar, updateUser);
router.get("/verify/:verificationToken", verifyUser);
router.post("/verify/", verifyManualSend);

module.exports = router;
