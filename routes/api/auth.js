const express = require('express');
const { User } = require('../../model');
const { BadRequest, Conflict } = require('http-errors');
const { joiRegisterSchema } = require('../../model/user');
const router = express.Router();

router.post('/signup', async (req, res, next) => {
  try {
    const { error } = joiRegisterSchema.validate(req.body);
    if (error) {
      throw new BadRequest(error.message);
    }

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw new Conflict('Email in use');
    }
    const newUser = await User.create(req.body);
    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
