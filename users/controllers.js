const UserSchema = require("./schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await UserSchema.findOneAndUpdate(
    { email },
    { name, email, password: await bcrypt.hash(password, 10) },
    { upsert: true }
  );
  if (user) {
    res.status(409).json({ message: "Email in use" });
    return;
  }
  res.status(201).json({ message: "User successfully registered" });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await UserSchema.findOne({ email });
  if (!user) {
    res.status(400).json({ message: "Email or password is wrong" });
    return;
  }
  const validPassword = bcrypt.compare(password, user.password);
  if (!validPassword) {
    res.status(401).json({ message: "Email or password is wrong" });
    return;
  }
  const token = jwt.sign({ id: user._id }, process.env.SECRET_TOKEN);
  const data = await UserSchema.findOneAndUpdate(
    { email },
    { $set: { token } },
    { new: true }
  );
  res.status(200).json({
    token: data.token,
    email,
    subscription: data.subscription,
    id: user._id,
  });
};

const getCurrentUser = async (req, res) => {
  return res.status(200).json(req.user);
};

const logoutUser = async (req, res) => {
  const { _id } = req.user;
  await UserSchema.findByIdAndUpdate(
    _id,
    { $set: { token: null } },
    { new: true }
  );
  res.status(204).end();
};

const updateSubscription = async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.body;

  await UserSchema.findByIdAndUpdate(_id, {
    $set: { subscription },
  });
  res.status(200).json({ subscription }).end();
};

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser,
  logoutUser,
  updateSubscription,
};
