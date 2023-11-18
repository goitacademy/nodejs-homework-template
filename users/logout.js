/* const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel');
const verifyToken = require('../middleware/authMiddleware');
const jwt = require('jsonwebtoken');

console.log('Before /logout endpoint definition');

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

    // Dodaj ten fragment do wygenerowania nowego tokenu
    const newToken = jwt.sign(
      { userId: user._id },
      'sekretnehaslo', // Tutaj powinno być bezpieczne hasło do podpisywania tokenów
      { expiresIn: '1h' } // Przykładowy czas ważności tokena, możesz dostosować
    );

    console.log(`New token generated: ${newToken}`);

    res.status(204).send();
  } catch (error) {
    console.error('Error during logout:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

console.log('After /logout endpoint definition');

module.exports = router;
 */