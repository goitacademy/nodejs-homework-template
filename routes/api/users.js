const express = require("express");
const router = express.Router();
const authMiddleware = require("../../middleware/authMiddleware");
const User = require("../../models/user");
const { updateAvatar } = require("../../controllers/users");
const upload = require("../../middleware/upload");
const { verifyUser } = require("../../controllers/users");

router.get("/logout", authMiddleware, async (req, res, next) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    user.token = null;
    await user.save();

    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

router.get("/current", authMiddleware, async (req, res, next) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    res.status(200).json({
      email: user.email,
      subscription: user.subscription,
    });
  } catch (error) {
    next(error);
  }
});

router.patch("/avatars", authMiddleware, upload.single("avatar"), updateAvatar);

router.get("/verify/:verificationToken", verifyUser);

module.exports = router;
