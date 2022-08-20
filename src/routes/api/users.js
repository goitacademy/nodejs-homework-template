const express = require("express");
const {
  addUser,
  loginUser,
  logOut,
  getUser,
  updateUserSubscription,
} = require("../../models/users");
const {
  userValidationSchema,
  userSubscriptionSchema,
} = require("../../models/usersSchema");
const { validation } = require("../../middlewares/validation");
const { authMW } = require("../../middlewares/authMW");

const router = express.Router();

router.post("/signup", validation(userValidationSchema), async (req, res) => {
  try {
    const user = await addUser(req.body);
    res
      .status(201)
      .json({ email: user.email, subscription: user.subscription });
  } catch (err) {
    res.status(err.status).json({ message: err.message });
  }
});

router.post("/login", validation(userValidationSchema), async (req, res) => {
  try {
    const user = await loginUser(req.body);
    res.status(201).json({
      token: user.token,
      user: { email: user.email, subscription: user.subscription },
    });
  } catch (err) {
    res.status(err.status).json({ message: err.message });
  }
});

router.get("/logout", authMW, async (req, res) => {
  try {
    await logOut(req.userId);
    res.status(204).json({ message: "No Content" });
  } catch (err) {
    res.status(err.status).json({ message: err.message });
  }
});

router.get("/current", authMW, async (req, res) => {
  try {
    const user = await getUser(req.userId);
    res
      .status(200)
      .json({ email: user.email, subscription: user.subscription });
  } catch (err) {
    res.status(err.status).json({ message: err.message });
  }
});

router.patch(
  "/",
  authMW,
  validation(userSubscriptionSchema),
  async (req, res) => {
    try {
      const user = await updateUserSubscription(req.body, req.userId);
      res
        .status(200)
        .json({ email: user.email, subscription: user.subscription });
    } catch (err) {
      res.status(err.status).json({ message: err.message });
    }
  }
);

module.exports = router;
