const express = require("express");
const router = express.Router();

const User = require("../../models/user");
const auth = require("../../auth/auth");

router.get("/logout", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    user.tokens = [];
    await user.save();

    res.status(204).send();
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
