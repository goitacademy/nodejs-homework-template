const express = require("express");
const router = express.Router();
const { registerUser } = require("../../controllers/users");

router.post("/signup", async (req, res) => {
  try {
    const { code, message } = await registerUser(req.body);
    res.status(code).json(message);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
