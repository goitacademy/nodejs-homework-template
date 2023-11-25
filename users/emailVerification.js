import Joi from 'joi';
import express from 'express';

import userModel from '#models/userModel.js';
import { sendVerificationEmail } from './emailUtils.js';

const verifyEmailSchema = Joi.object({
  email: Joi.string().email().required(),
});

const router = express.Router();

router.get('/verify/:verificationToken', async (req, res) => {
  const { verificationToken } = req.params;

  try {
    const user = await userModel.findOne({ verificationToken });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.verify) {
      return res.status(404).json({ message: 'Verification already passed' });
    }

    await user.updateOne(
      { $set: { verificationToken: null, verify: true } },
      { new: true }
    );

    return res.status(200).json({ message: 'Verification successful' });
  } catch (error) {
    console.error('Error during email verification:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/verify', async (req, res) => {
  try {
    const { error } = verifyEmailSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: 'Missing required field email' });
    }

    const { email } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.verify) {
      return res
        .status(400)
        .json({ message: 'Verification has already been passed' });
    }

    await sendVerificationEmail(email, user.verificationToken);

    return res.status(200).json({ message: 'Verification email sent' });
  } catch (error) {
    console.error('Error during email resend:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default router;
