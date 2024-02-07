const express = require('express');
const router = express.Router();
const User = require('../../models/users');
const nodemailer = require('nodemailer');
const gravatar = require('gravatar');

const transporter = nodemailer.createTransport({
  service: 'Mailgun',
  auth: {
    user: 'api',
    pass: '6b130e0ca3bfe8cc6d129ec2994ba410-8c90f339-c89b61d9',
  },
});

router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    const verificationToken = generateVerificationToken();
    const avatarURL = gravatar.url(email, { s: '250', d: 'retro', r: 'g' });

    const user = await User.create({ email, password, avatarURL, verificationToken });

    await sendVerificationEmail(email, verificationToken);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/verify', async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.verify) {
      return res.status(400).json({ message: 'Verification has already been passed' });
    }

    await sendVerificationEmail(email, user.verificationToken);

    res.status(200).json({ message: 'Verification email sent' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

function generateVerificationToken() {
}

async function sendVerificationEmail(email, verificationToken) {
  const mailOptions = {
    from: 'your-email@example.com',
    to: email,
    subject: 'Email Verification',
    html: `<p>Click <a href="http://your-api-url/users/verify/${verificationToken}">here</a> to verify your email</p>`,
  };

  await transporter.sendMail(mailOptions);
}

module.exports = router;