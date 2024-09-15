const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { ctrlWrapper } = require("../../helpers");
const { User } = require("../../models/user");
const { HttpError } = require("../../helpers");
const { Secret_Key } = process.env;

const register = async (req, res) => {
  const body = req.body;

  const { email, password } = body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email already in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ ...body, password: hashPassword });
  res
    .status(201)
    .json({ email: newUser.email, subscription: newUser.subscription });
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
  const id = user._id;
  const payload = {
    id,
  };

  const token = jwt.sign(payload, Secret_Key, { expiresIn: "1d" });

  await User.findByIdAndUpdate(id, { token });

  res.json({
    token,
    user: { email: user.email, subscription: user.subscription },
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.status(204).json("sucses");
};

const updateSub = async (req, res) => {
  const id = req.params["id"];
  if (id !== req.user.id) {
    throw HttpError(
      400,
      "You do not have the right to change another user, please change id  in the request"
    );
  }
  console.log(id === req.user.id);
  const newUser = await User.findByIdAndUpdate(id, req.body, { new: true });
  res.json(newUser);
};

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;
  res.json({ email, subscription });
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateSub: ctrlWrapper(updateSub),
};
