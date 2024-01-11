const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User } = require("../models/user");

const { httpError, ctrlWrapper } = require("../helpers");

//! === Register ===

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw httpError(409, "Email in use");
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

//! === Login ===

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw httpError(401, "Email or password invalid");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw httpError(401, "Email or password invalid");
  }

  const { SECRET_KEY } = process.env;

  const payload = {
    id: user.id,
  };

  // const token = "fdas4dasdfg.as3df5sd.khjgfg4213";
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

  res.json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
};
