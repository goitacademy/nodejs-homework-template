const express = require('express');
const { User } = require('../../model');
const { authToken } = require('../../middleware');

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
  await User.findByIdAndUpdate(_id, { token: null });
  res.status(204).send('Not authorized');
});

module.exports = router;
