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

// Create an account
const register = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) throw HttpError(409, emailErrorMsg);

  const hashedPass = await bcrypt.hash(password, 10);
  const credentials = { ...req.body, password: hashedPass };
  const newUser = await User.create(credentials);

  res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription,
  });
};

// Log in
const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) throw HttpError(401, authErrorMsg);

  const isPasswordValid = await bcrypt.compare(password, user.password); // As of bcryptjs 2.4.0, 'compare' returns a promise if callback (passed as the third argument) is omitted
  if (!isPasswordValid) throw HttpError(401, authErrorMsg);

  const payload = { id: user._id };
  const secret = process.env.JWT_SECRET;
  const token = jwt.sign(payload, secret, { expiresIn: '23h' });
  await User.findByIdAndUpdate(user.id, { token });

  res.json({ token });
};

// Log out
const logout = async (req, res) => {
  const { _id: id } = req.user;
  await User.findByIdAndUpdate(id, { token: '' });

  res.json({ message: 'Signed out successfully' });
};

// Check if user is logged in
const getCurrent = (req, res) => {
  const { email, subscription } = req.user;

  res.json({ email, subscription });
};

// Update subscription type
const updateSubscription = async (req, res) => {
  console.log('req: ', req);
  const { subscription } = req.body;
  const { _id: id } = req.user;

  await User.findByIdAndUpdate(id, { subscription });

  let firstCharacter = subscription.charAt(0);
  firstCharacter = firstCharacter.toUpperCase();
  let capitalizedString = firstCharacter + subscription.slice(1);

  res.json({
    message: `Subscription has been updated to '${capitalizedString}'`,
  });
};

// ####################################################

export default {
  register: controllerWrapper(register),
  login: controllerWrapper(login),
  logout: controllerWrapper(logout),
  getCurrent: controllerWrapper(getCurrent),
  updateSubscription: controllerWrapper(updateSubscription),
};
