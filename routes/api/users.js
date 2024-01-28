const express = require('express');
const router = express.Router();
const upload = require('../../middleware/upload'); 
const userController = require('../../controllers/userController'); 


router.post('/verify', async (req, res) => {
router.get('/verify/:verificationToken', async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  user.verificationToken = null;
  user.verify = true;
  await user.save();

  res.status(200).json({ message: 'Verification successful' });
});

router.post('/verify', async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email, verify: false });

  if (!user) {
    return res.status(400).json({ message: 'Verification has already been passed or user not found' });
  }

  sendVerificationEmail(user, user.verificationToken);

  res.status(200).json({ message: 'Verification email sent' });
});
const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "missing required field email" });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  if (user.verify) {
    return res.status(400).json({ message: "Verification has already been passed" });
  }


router.patch('/avatars', upload.single('avatar'), userController.updateAvatar);
  res.status(200).json({ message: "Verification email sent" });
});
module.exports = router;
