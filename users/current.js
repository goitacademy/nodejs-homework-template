const express = require('express');
const router = express.Router();
const verifyToken = require('../../middleware/authMiddleware');
const userModel = require('../../models/userModel');

router.get('/current', verifyToken, async (req, res) => {
  try {
    const userId = req.user._id;

    // Find the user by ID
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    // Return user data
    res.status(200).json({
      email: user.email,
      subscription: user.subscription,
    });
  } catch (error) {
    console.error('Error fetching current user:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
