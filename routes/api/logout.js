const express = require("express");
const router = express.Router();
const { logoutUser } = require("../../controllers/users");
const auth = require("../../auth/auth");

router.post("/logout", auth, async (req, res) => {
  try {
    const { code, message } = await logoutUser(req.body.id);
    res.status(code).json(message);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
