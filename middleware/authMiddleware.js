// authMiddleware.js

const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const secretKey =
  'd97154c49fa7d1e961e0cae0bd6af1708d3d1b82ea7046fc9167baf79fdecf19'; // Przykładowy klucz prywatny

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    // Verify the token using the correct private key
    const decodedToken = jwt.verify(token, secretKey);

    // Find the user in the database
    const user = await userModel.findById(decodedToken.userId);

    if (!user || user.token !== token) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    // Attach user data to the request object
    req.user = user;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error('Error verifying token:', error.message);
    res.status(401).json({ message: 'Not authorized' });
  }
};

module.exports = verifyToken;
