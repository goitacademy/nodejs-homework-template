
import { User } from '../../models/users/userModel.js';

const logout = async (req, res, next) => {
  try {
    if (req.user && req.user._id) {
      const userId = req.user._id;
      const user = await User.findById(userId);

      if (!user) {
        return res.status(401).json({ message: 'Not authorized' });
      }

      user.token = null;
      await user.save();

      return res.status(204).send();
    } else {
      return res.status(401).json({ message: 'Not authorized' });
    }
  } catch (error) {
    console.error('Error during logout:', error);
    res.status(500).json({ message: 'Internal Server Error' });
    return next(error);
}
};

export { logout };
