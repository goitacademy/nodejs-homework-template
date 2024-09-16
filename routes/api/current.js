const express = require("express");
const router = express.Router();
const auth = require("../../auth/auth");
const { currentUser } = require("../../controllers/users");

router.get("/current", auth, async (req, res) => {
  try {
    const { code, message } = await currentUser(req.body.id);
    res.status(code).json(message);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
