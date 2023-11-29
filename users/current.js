import express from 'express';

import userModel from '#models/userModel.js';
import verifyToken from '#middleware/authMiddleware.js';

const router = express.Router();

router.get('/current', verifyToken, async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    res.status(200).json({
      email: user.email,
      subscription: user.subscription,
    });
  } catch (error) {
    console.error('Error fetching current user:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default router;
