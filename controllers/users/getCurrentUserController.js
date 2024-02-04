import { User } from '../../models/users/userModel.js';

const getCurrentUser = async (req, res) => {
  try {
    if (req.user) {
      return res.status(200).json({
        email: req.user.email,
        subscription: req.user.subscription,
      });
    } else {
      return res.status(401).json({ message: 'Not authorized' });
    }
  } catch (error) {
    console.error('Error fetching current user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export { getCurrentUser };
