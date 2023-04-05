const express = require("express");
const router = express.Router();
const { logoutUser } = require("../../controllers/users");

// const User = require("../../models/user");
const auth = require("../../auth/auth");

router.get("/logout", auth, async (req, res) => {
  try {
    const { token } = req.body;
    const user = await logoutUser.logout(token);
    res.status(204).send("Logout success", user);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

module.exports = router;
