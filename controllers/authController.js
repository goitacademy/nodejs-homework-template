import User from '../models/user.js';
import { controllerWrapper } from '../decorators/index.js';
import { HttpError } from '../helpers/index.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

// ####################################################

const emailErrorMsg = 'This email is already linked to an existing account';
const authErrorMsg = 'Invalid email or password';

// ####################################################

const signup = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) throw HttpError(409, emailErrorMsg);

  const hashedPass = await bcrypt.hash(password, 10);
  const credentials = { ...req.body, password: hashedPass };
  const newUser = await User.create(credentials);

  res.status(201).json({
    name: newUser.name,
    email: newUser.email,
  });
};

const signin = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) throw HttpError(401, authErrorMsg);

  // As of bcryptjs 2.4.0, 'compare' returns a promise if callback is omitted:
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw HttpError(401, authErrorMsg);

  const payload = { id: user._id };
  const secret = process.env.JWT_SECRET;
  const token = jwt.sign(payload, secret, { expiresIn: '23h' });

  res.json({ token });
};

// const signout = async (req, res) => {};

// ####################################################

export default {
  signup: controllerWrapper(signup),
  signin: controllerWrapper(signin),
  // signout: controllerWrapper(signout),
};
