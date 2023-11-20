import express from 'express';
import userModel from '../models/userModel.js';
import verifyToken from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/logout', verifyToken, async (req, res) => {
  try {
    console.log('Inside /logout endpoint');

    const userId = req.user._id;

    console.log(`Received logout request for user with ID: ${userId}`);

    const user = await userModel.findById(userId);
    if (!user) {
      console.log(`User not found for ID: ${userId}`);
      return res.status(401).json({ message: 'Not authorized' });
    }

    console.log(`Logging out user with ID: ${userId}`);

    user.token = null;
    await user.save();

    console.log(`User with ID ${userId} logged out successfully`);

    res.status(204).send();
  } catch (error) {
    console.error('Error during logout:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default router;
