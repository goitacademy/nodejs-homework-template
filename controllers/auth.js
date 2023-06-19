const { HttpError, ctrlWrapper } = require("../helpers");
const { User } = require("../models/userModel");
const bcrypt = require("bcryptjs");


const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password,salt);
  const newUser = await User.create({...req.body,password:hashPassword});
  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

const login = async (req,res) => {
    const { email, password } = req.body
    const user = User.findOne({ email })
    if (!user) {
        throw new HttpError(401,"Email or password is wrong")
    }
    const passwordCompare = bcrypt.compare(password, user.password)
    if (!passwordCompare) {
        throw new HttpError(401, "Email or password is wrong");
    }
    res.status(200).json({
      token: "exampletoken",
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
}

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
};
