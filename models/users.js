const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const gravatar = require("gravatar");
const dotenv = require("dotenv");

const { User } = require("../db/userModel");

dotenv.config({ path: path.join(__dirname, "../.env") });

const signUpUser = async (req, res) => {
  try {
    const avatarURL = gravatar.url(req.body.email);

    const user = new User({ ...req.body, avatarURL });
    if (await User.findOne({ email: req.body.email })) {
      res.status(409).send({ message: "Email in use" });
    }
    await user.save();
    return res
      .status(201)
      .json({ email: user.email, subscription: user.subscription });
  } catch {
    res.status(400).json({ message: `Validation error` });
  }
};

async function loginUser(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res
        .status(401)
        .json({ message: `Email ${req.body.email} is wrong` });
    }

    if (!(await bcrypt.compare(req.body.password, user.password))) {
      return res.status(401).json({ message: "Password is wrong" });
    }
    const token = jwt.sign(
      {
        _id: user._id,
      },
      process.env.SECRET
    );

    return res.status(200).json({
      token,
      user: { email: user.email, subscription: user.subscription },
    });
  } catch {
    res.status(400).json({ message: `Validation error` });
  }
}
async function logOutUser(req, res) {
  try {
    const user = req.user;
    if (user) return res.status(204).json({ message: "No Content" });
  } catch {
    res.status(401).json({ message: `Not authorized` });
  }
}

async function currentUser(req, res) {
  try {
    const user = req.user;
    if (user)
      return res
        .status(200)
        .json({ email: user.email, subscription: user.subscription });
  } catch {
    res.status(401).json({ message: `Not authorized` });
  }
}

async function updateSubscription(req, res) {
  const user = await User.findByIdAndUpdate(
    { _id: req.userId },
    { subscription: req.body.subscription },
    { new: true }
  );
  if (!user) {
    return res.status(401).json({ message: `Not authorized` });
  }

  return res
    .status(200)
    .json({ email: user.email, subscription: user.subscription });
}

async function addUserAvatar(req, res, next) {
  try {
    const user = await User.findByIdAndUpdate(
      { _id: req.userId },
      { avatarURL: req.file.path },
      { new: true }
    );

    return res.status(200).json({ avatarURL: user.avatarURL });
  } catch {
    res.status(401).json({ message: `Not authorized` });
  }
}

module.exports = {
  signUpUser,
  loginUser,
  logOutUser,
  currentUser,
  updateSubscription,
  addUserAvatar,
};
