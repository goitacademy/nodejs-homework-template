const express = require("express");
const { User } = require("../../model");
const router = express.Router();
const { authenticate } = require("../../midlwares");

router.get("/current", authenticate, async (req, res, next) => {
  const { email } = req.user;
  res.json({
    user: {
      email,
    },
  });
});

router.get("/logout", authenticate, async (req, res, next) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: null });
  res.status(204).send();
});

module.exports = router;
