const express = require('express');
const router = express.Router();
const User = require('../models/users');

router.get('/:verificationToken', async (req, res) => {
  const { verificationToken } = req.params;
  
  const user = await User.findOne({ verificationToken });
  
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  
  user.verificationToken = null;
  user.verify = true;
  await user.save();
  
  return res.status(200).json({ message: 'Verification successful' });
});

module.exports = router;
