const express = require("express");
const router = express.Router();
const User = require("../../models/user");
const auth = require("../../auth/auth");

router.get("/current", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(401).json({ message: "Not authorized" });
    }
    return res.status(200).json({
      email: user.email,
      subscription: user.subscription,
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
