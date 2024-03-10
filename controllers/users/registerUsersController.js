// controllers/users/registerUsersController.js
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import gravatar from 'gravatar';
import Joi from 'joi';
import { User } from '../../models/users/userModel.js';
import { AvatarProcessor } from './AvatarProcessor.js';
import transporter from '../../models/shared/services/mail.service.js';
import crypto from 'crypto';

const generateVerificationToken = () => {
  return crypto.randomBytes(20).toString('hex');
};

const signupSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const signup = async (req, res, next) => {
  try {
    console.log('Received signup request:', req.body);

    const { email, password } = req.body

    const { error } = signupSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: 'Email is already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const avatarPath = req.file ? req.file.path : null;
    const avatarURL = gravatar.url(req.body.email, { s: '200', r: 'pg', d: 'mm' });
    const verificationToken = generateVerificationToken();

    const user = await User.create({
      email,
      password: hashedPassword,
      avatarURL,
      verificationToken,
    });

    const verificationLink = `http://localhost:3000/verify-account/${user.verificationToken}`;

    const processedAvatarURL = await AvatarProcessor.processAvatar(avatarPath, user._id);
    user.avatarURL = processedAvatarURL;
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    user.token = token;
    await user.save();

    console.log('User after saving token:', user);

    const emailOptions = {
      from: "no-reply@sandboxda33cce3c6f64200805e0f36879030b7.mailgun.org",
      to: user.email,
      subject: "Email Verification",
      html: `
              <p>
                Click the following link to verify your account:
                </p>
                <a target="_blank" href="${encodeURIComponent(verificationLink)}">${verificationLink}
              </a>
            `,
    };

    try {
      const response = await transporter.sendMail(emailOptions);
      console.log(response);
    } catch (error) {
      console.error('Error during sending email:', error);
      res.status(500).json({ message: 'Error during sending email' });
      return;
    }

    res.status(201).json({
      user: {
        email: user.email,
        subscription: user.subscription,
        avatarURL: user.avatarURL,
      },
      message: 'Registration successful',
      token,
    });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export { signup, generateVerificationToken };
