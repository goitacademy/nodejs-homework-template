const express = require('express');
const authenticate = require('../../midlewares/authenticate');
const { User } = require('../../models/user');
const router = express.Router();

router
  .get('/current', authenticate, async (req, res, next) => {
    res.json({
      email: req.user.email,
    });
  })
  .get('/logout', authenticate, async (req, res, next) => {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: '' });
    res.status(204).send();
  });

module.exports = router;
