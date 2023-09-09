const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); 
const { User } = require("../models/user");

const { HttpError, wrapController } = require("../helpers");

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
      subscription: newUser.subscription
    },
  });
};

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        throw HttpError(401, "Email or password is wrong");
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
        throw HttpError(401, "Email or password is wrong");
    }
    const payload = {
        id: user._id,
    }

    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "23h"});
    await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
}

const getCurrent = async(req, res) => {
    const { email, subscription } = req.user;

    res.json({
      email,
      subscription,
    });
}

const logout = async (req, res) => {
    const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" })
  
    res.status(204).json();
}

const updateSubscription = async (req, res) => {
  const { subscription } = req.body;
  const { _id } = req.user;
  
  if (!["starter", "pro", "business"].includes(subscription)) {
    return res.status(400).json({ message: "Invalid subscription value" });
  }

    const updatedUser = await User.findByIdAndUpdate(
      _id,
      { subscription },
      { new: true }
    );

    res.json({
      email: updatedUser.email,
      subscription: updatedUser.subscription,
    });
 
};
     
module.exports = {
  register: wrapController(register),
  login: wrapController(login),
  getCurrent: wrapController(getCurrent),
  logout: wrapController(logout),
  updateSubscription: wrapController(updateSubscription),
};
