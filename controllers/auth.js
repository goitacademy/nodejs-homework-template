const { User } = require("../models/user.js");
const ctrlWrapper = require("../helpers/ctrlWrapper.js");

const jsonwebtoken = require('jsonwebtoken');
const bcrypt = require("bcrypt");

const { envsConfig } = require("../configs")


const register = async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 5)

  const createdUser = await User.create({...req.body, password: hashedPassword, token: null});
  res.status(201).json({
    user: { email: createdUser.email, subscription: createdUser.subscription }
  })
};

const login = async (req, res) => {
  const { email, password } = req.body
  const ifExists = await User.findOne({ email })
  if (!ifExists) {
    res.status(401).json({ message: 'Email or password wrong' })
  }
  const isSamePassword = await bcrypt.compare(password, ifExists.password);
  if (!isSamePassword) {
    res.status(401).json({ message: 'Email or password wrong' })
  }
  
  const token = await jsonwebtoken.sign({ id: ifExists.id }, envsConfig.secret);
  await User.findByIdAndUpdate(ifExists.id, {token: token});

  res.status(200).json({
    token,
    user: {
      email,
      subscription: ifExists.subscription
    }
  })
};

const logout = async (req, res) => {
  const { id } = req.user 
  
  await User.findByIdAndUpdate(id, { token: null });
  res.status(204).end()
};

const current = async (req, res) => {
  const { email, subscription } = req.user;
  res.status(200).json({email, subscription})
};

const subscription = async (req, res) => {
  const { subscriptionPlan } = req.body
  const { id, subscription } = req.user;

  if (subscriptionPlan !== 'starter' && subscriptionPlan !== 'pro' && subscriptionPlan !== 'business') {
    res.status(400).json({ message: 'Missing valid, new subscription plan' })
    return;
  }

  await User.findByIdAndUpdate(id, { subscription: subscriptionPlan });
  res.status(200).json({ message: `Successfully switched subscription plan from ${subscription} to ${subscriptionPlan}` })
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  current: ctrlWrapper(current),
  subscription: ctrlWrapper(subscription)
};