import express from 'express';
import authenticateToken from '../../middleware/authenticateToken';
import User from '../../models/users';
import Joi from 'joi';
import gravatar from 'gravatar';
const router = express.Router();

router.patch('/avatars', authenticateToken, upload.single('avatar'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const avatarURL = `/avatars/${req.file.filename}`;
    req.user.avatarURL = avatarURL;
    req.user.save();

    res.status(200).json({ avatarURL: avatarURL });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    const avatarURL = gravatar.url(email, { s: '250', d: 'retro', r: 'g' });

    const user = await User.create({ email, password, avatarURL });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.patch('/', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const schema = Joi.object({
      subscription: Joi.string().valid('starter', 'pro', 'business').required(),
    });
    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { subscription } = req.body;
    const updatedUser = await User.findByIdAndUpdate(userId, { $set: { subscription } }, { new: true });

    if (updatedUser) {
      res.json({ subscription: updatedUser.subscription });
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;