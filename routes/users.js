const express = require('express');
const router = express.Router();
const authenticateToken = require('../../middleware/authenticateToken');
const User = require('../../models/users');

router.get('/logout', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    user.token = null;
    await user.save();

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;