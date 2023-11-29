import jwt from 'jsonwebtoken';
import userModel from '#models/userModel.js';

const secretKey =
  'd97154c49fa7d1e961e0cae0bd6af1708d3d1b82ea7046fc9167baf79fdecf19';

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const decodedToken = jwt.verify(token, secretKey);

    const user = await userModel.findById(decodedToken.userId);

    if (!user || user.token !== token) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    req.user = user;

    next();
  } catch (error) {
    console.error('Error verifying token:', error.message);
    res.status(401).json({ message: 'Not authorized' });
  }
};

export default verifyToken;
