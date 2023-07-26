const express = require("express");
const router = express.Router();
const userController = require("../controllers/users");
const { auth } = require("../middlewares/auth");
const { validateBody } = require("../middlewares/validateBody");
const { userSchema } = require("../utils/validators/validator");
const { uploadMiddleware } = require("../middlewares/upload");

router.post("/signup", validateBody(userSchema), userController.register);
router.post("/login", validateBody(userSchema), userController.login);
router.post("/logout", auth, userController.logout);
router.get("/current", auth, userController.current);
router.patch("/:userId/subscription", auth, userController.updateSubscription);
router.patch(
  "/avatars",
  auth,
  uploadMiddleware.single("avatar"),
  userController.updateAvatar
);
router.delete("/", userController.deleteUserByMail);
module.exports = router;