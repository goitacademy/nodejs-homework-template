const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { SECRET_KEY } = process.env;

const { User } = require("../models/user");

const { HttpError, ctrlWrapper } = require("../helpers");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email is already in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ ...req.body, password: hashPassword });

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
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
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.status(200).json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;
  res.status(200).json({
    email,
    subscription,
  })
};

const logout = async (req, res) => {
  const { _id } = req.user;
   await User.findByIdAndUpdate(_id, { token: '' });

    res.status(204).json({
    message: 'Logout success'
  })
};


// const updateSubscription = async (req, res) => {
//   const { subscription } = req.body;

//    try {
//     // Перевірка, чи передано коректне значення підписки
//      if (!["starter", "pro", "business"].includes(subscription)) {
      
//       return res.status(400).json({ error: "Invalid subscription value" });
//     }

//     // Оновлення підписки користувача
//     const updatedUser = await User.findByIdAndUpdate(req.user.id, { subscription }, { new: true });

//     res.status(200).json({
//       email: updatedUser.email,
//       subscription: updatedUser.subscription,
//     });
//   } catch (error) {
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };



// або без використання try/catch

const updateSubscription = async (req, res) => {
  const { subscription } = req.body;
  if (["starter", "pro", "business"].includes(subscription)) {
    const updatedUser = await User.findByIdAndUpdate(req.user.id, { subscription }, { new: true });
    res.status(200).json({
      email: updatedUser.email,
      subscription: updatedUser.subscription,
    });

}else {
    throw HttpError(401, 'Invalid subscription value');
  }
};


module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateSubscription: ctrlWrapper(updateSubscription),
};
