import express from "express";
import authMiddleware from "../../middleware/jwt.js";
import { User } from "../../models/user.js";

const router = express.Router();

router.get("/list", authMiddleware, (req, res) => {
  const { email } = req.user;
  res.json({
    status: "success",
    code: 200,
    data: {
      message: `Authorization was successful: ${email}`,
    },
  });
});

router.get("/users/logout", authMiddleware, async (req, res, next) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);

    user.token = null;
    await user.save();
    return res.status(200).json({
      status: "204 No Content",
    });
  } catch (error) {
    console.error(`Server error: ${error.message}`);
    next(error);
  }
});

router.get("/users/current", authMiddleware, async (req, res, next) => {
  try {
    const user = req.user;

    return res.status(200).json({
      email: user.email,
      subscription: user.subscription,
    });
  } catch (error) {
    console.error(`Server error: ${error.message}`);
    next(error);
  }
});

export default router;
