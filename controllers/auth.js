const bcrypt = require("bcrypt");
const { User } = require("../models/user");
const { HttpError, ctrlWrapper } = require("../helpers");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;


const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPass = await bcrypt.hash(password, 10);

  const newUser = await User.create({ ...req.body, password: hashPass });
  res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription,
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
        id: user.id,
    }
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

    res.status(200).json({
      msg: "Success! Token create",
      token,
    });
};






module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
};
