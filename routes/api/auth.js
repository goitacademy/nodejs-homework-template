const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/logout', (req, res) => {
  req.logout(); 
  res.redirect(process.env.AUTH0_LOGOUT_URL); 
});
router.get('/current', (req, res) => {
  if (!req.oidc.isAuthenticated()) {
    return res.status(401).json({ message: 'Not authenticated' });
  }
 
  res.json(req.oidc.user);
});



module.exports = router;
