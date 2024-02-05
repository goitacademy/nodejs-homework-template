
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import gravatar from 'gravatar';
import Joi from 'joi';
import { User } from '../../models/users/userModel.js';

const signupSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const signup = async (req, res, next) => {
  try {
    console.log('Received signup request:', req.body); // Добавим логирование

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
    
    const avatarURL = gravatar.url(req.body.email, { s: '200', r: 'pg', d: 'mm' });

    const user = await User.create({
      email,
      password: hashedPassword,
      avatarURL,
    });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    user.token = token;
    await user.save();

    console.log('User created successfully:', user);

    return res.status(201).json({
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
    next(error);
  }
};

export { signup };
