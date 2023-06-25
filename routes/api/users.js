const express = require("express");
const router = express.Router();

const userController = require("../../controllers/userController");
const {
  validateCreateUser,
  validateUpdateSubscription,
} = require("../../models/user");
const loginHandler = require("../../auth/loginHandler");
const auth = require("../../auth/auth");

router.post("/signup", async (req, res, next) => {
  try {
    const { error } = validateCreateUser(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const { email } = req.body;
    const user = await userController.getUserByEmail(email);
    if (user) {
      return res.status(409).json({ message: "Email in use" });
    }

    const newUser = await userController.createUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
    return res.status(500).json({ message: "Server error" });
  }
});

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email or password is missing" });
  }

  try {
    const token = await loginHandler(email, password);
    res.status(200).json({ token });
  } catch (error) {
    next(error);
    return res.status(401).json({ message: "Invalid login data" });
  }
});

router.get("/current", auth, async (req, res, next) => {
  try {
    const { email } = req.user;
    const user = await userController.getUserByEmail(email);
    res.status(200).json(user);
  } catch (error) {
    next(error);
    return res.status(500).json({ message: "Server error" });
  }
});

router.patch("/", auth, async (req, res, next) => {
  try {
    const { error } = validateUpdateSubscription(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    const { email } = req.user;
    const user = await userController.updateSubscription(email, req.body);
    res.status(200).json(user);
  } catch (error) {
    next(error);
    return res.status(500).json({ message: "Server error" });
  }
});

router.get("/logout", auth, async (req, res, next) => {
  try {
    const { token } = req.body;
    const user = await userController.logout(token);
    res.status(204).json(user);
  } catch (error) {
    next(error);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;