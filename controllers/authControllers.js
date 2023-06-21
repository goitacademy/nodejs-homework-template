const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
const { ctrlWrapper } = require("../decorators");
const { HttpError } = require("../helpers");
const { SECRET_KEY } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ ...req.body, password: hashPassword });
  res.status(201).json({
    user: { 
    email: newUser.email,
    subscription: newUser.subscription,}
  });
};

const login = async (req, res) => {
  const { email: userEmail, password } = req.body;
  const user = await User.findOne({ email: userEmail });
  if (!user) {
    throw HttpError(400, "Email or password is wrong");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(400, "Email or password is wrong");
  }

  const { _id: id, email, subscription } = user;
  const payload = { id };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(id, {token});
  res.json({ token, user: { email, subscription } });
};

const logout = async(req, res)=> {
    const {_id} = req.user;

    await User.findByIdAndUpdate(_id, {token: ""});

       res.status(204).json({
      message: "No Content"
    });
}

const current = (req, res)=> {
    const {email, subscription} = req.user;

    res.json({
          email,
          subscription
    })
}

const subscription = async (req, res) => {
  const { _id, subscription: currentSubscription } = req.user;
  const { newSubscription } = req.body;

  if (currentSubscription !== newSubscription) {
    const validSubscriptions = ['starter', 'pro', 'business'];
    if (validSubscriptions.includes(newSubscription)) {
      await User.findByIdAndUpdate(_id, { subscription: newSubscription });
      res.json({ newSubscription });
    } else {
      throw HttpError(400, "Invalid subscription value. Valid options are 'starter', 'pro', or 'business'");
    }
  } else {
    throw HttpError(400, "This subscription is already in use");
  }
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  current: ctrlWrapper(current),
  subscription: ctrlWrapper(subscription),
};
