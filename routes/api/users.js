const express = require("express");
const { User } = require("../../model");
const { authenticate } = require("../../middlewares");

const router = express.Router();

router.get("/current", authenticate, async (req, res) => {
  const { name, email } = req.user;
  res.json({
    user: {
      name,
      email,
    },
  });
});

router.get("/logout", authenticate, async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: null });
  res.status(204).send();
});

router.patch("/", authenticate, async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { id } = req.params;
    const { subscription } = req.body;
    const updateSubscription = await User.findOneAndUpdate(
      { id, owner: _id },
      { subscription },
      {
        new: true,
      }
    );
    res.json(updateSubscription);
  } catch (error) {
    next(error);
  }
});
module.exports = router;
