const express = require("express");
const User = require("../../service/schemas/User");
const router = express.Router();

router.get("/", async (req, res) => {
  const { _id } = req.user;
  const user = await User.findOne({ owner: _id });
  const userWithoutToken = {
    id: user._id,
    email: user.email,
    subscription: user.subscription,
    token: null,
  };

  try {
    const xd = await User.findOneAndUpdate(
      {
        email: userWithoutToken.email,
      },
      { $set: userWithoutToken },
      {
        new: true,
        runValidators: true,
        strict: "throw",
      }
    );
    res.status(204).json();
  } catch (error) {
    return null;
  }
});

module.exports = router;
