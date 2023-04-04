const express = require("express");
const router = express.Router();
const { logout } = require("../../controllers/users");

// const User = require("../../models/user");
const auth = require("../../auth/auth");

router.get("/logout", auth, async (req, res) => {
  try {
    const user = await logout(req.token);
    res.status(204).send("Logout success", user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
