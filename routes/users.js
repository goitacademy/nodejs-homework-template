const express = require('express');
const router = express.Router();
const authenticateToken = require('../../middleware/authenticateToken');
const User = require('../../models/users');
const Joi = require('joi');

router.patch('/', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;

    const schema = Joi.object({
      subscription: Joi.string().valid('starter', 'pro', 'business').required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { subscription } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: { subscription } },
      { new: true }
    );

    if (updatedUser) {
      res.json({ subscription: updatedUser.subscription });
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;