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
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.status(200).json({
    msg: "Success! Token create",
    token,
  });
};

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;
  res.status(200).json({
    msg: "Success!",
    email,
    subscription,
  });
};


const logout = async (req, res) => {
  const { _id } = req.user;
await User.findByIdAndUpdate(_id, { token: null });


  res.json({
    msg: "Logout Success!"
  });
};


const updateUser = async (req, res, next) => {
   const { _id } = req.user;
  const { subscription } = req.body;
  const updateUser = await User.findByIdAndUpdate(
    _id,
    { subscription },
    {
      new: true,
    }
  );


  if (!updateUser) {
    throw HttpError(404, "Not found user");
  }
  res.status(201).json({
    msg: "User data update success!",
    subscription: updateUser.subscription,
  });
};




module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateUser: ctrlWrapper(updateUser),
};
