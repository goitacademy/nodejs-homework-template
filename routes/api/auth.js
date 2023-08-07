const express = require('express')

const {register, login, logout, current, updateAvatar, verifyEmail, resendVerificationEmail} =  require('../../models/auth')
const router = express.Router()

const {authenticate, } = require('../../middleware/authenticate')
const {upload, } = require('../../middleware/upload')

router.post('/users/register', async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      throw new Error("Name, email, or password is missing");
    }

    const newUser = { name, email, password };
    const registeredUser = await register(newUser);

    res.status(201).json(registeredUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
   router.get('/users/verify/:verificationToken', verifyEmail)

   router.post('/users.verify', resendVerificationEmail)

   router.post('/users/login', login);

   router.post('/users/logout', logout);

   router.post('/users/current', authenticate, current);

   router.patch('/users/avatars', authenticate, upload.single("avatar"), updateAvatar )
    

module.exports = router