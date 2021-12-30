const express = require('express');
const { User } = require('../../model');
const { authToken } = require('../../middleware');
const { Unauthorized } = require('http-errors');

const router = express.Router();

router.get('/current', authToken, async (req, res) => {
  const { email } = req.user;
  res.json({
    user: {
      email,
    },
  });
});

router.get('/logout', authToken, async (req, res, next) => {
  const { _id } = req.user;
  const user = await User.findByIdAndUpdate(_id, { token: null });
  if (!user) {
    throw new Unauthorized('Not authorized');
  }
  res.status(204).send();
});

module.exports = router;
