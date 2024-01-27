import jwt from 'jsonwebtoken';
import User from '../models/usersModel.js';

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const decoded = jwt.verify(token, 'your-secret-key');

    const user = await User.findOne({ _id: decoded.userId, token });

    if (!user) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Not authorized' });
  }
};

export default authMiddleware;
