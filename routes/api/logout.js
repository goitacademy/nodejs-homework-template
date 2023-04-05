const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { logoutUser } = require("../../controllers/users");

// const User = require("../../models/user");
const auth = require("../../auth/auth");
const jwtSecret = process.env.JWT_SECRET;

router.get("/logout", auth, async (req, res) => {
  try {
    const { token } = req.headers.authorization;
    const verify = jwt.verify(token, jwtSecret);
    const user = await logoutUser.logout(verify);
    res.status(204).send("Logout success", user);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

module.exports = router;
