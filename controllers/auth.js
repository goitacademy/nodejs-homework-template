const bcrypt = require("bcrypt");

const path = require("path");

const fs = require("fs/promises");

const gravatar = require("gravatar");

const { User } = require("../models/user");

const {
  HttpError,
  controllerWrapper,
  createToken,
  optimizesAvatar,
} = require("../helpers");

const dirToAvatars = path.join(__dirname, "../", "public", "avatars");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarUrl = gravatar.url(email);

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarUrl,
  });

  const token = await createToken(newUser);
  await User.findByIdAndUpdate(newUser.id, { token });

  res.status(201).json({
    token,
    user: {
      name: newUser.name,
      email: newUser.email,
      subscription: newUser.subscription,
      avatarUrl: newUser.avatarUrl,
    },
  });
};

const logIn = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const token = await createToken(user);
  await User.findByIdAndUpdate(user.id, { token });

  res.json({
    token,
    user: {
      name: user.name,
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;

  res.json({
    user: {
      email,
      subscription,
    },
  });
};

const logOut = async (req, res) => {
  const { id } = req.user;

  await User.findByIdAndUpdate(id, { token: "" });

  res.status(204).json();
};

const subscriptionUpdate = async (req, res) => {
  const { id } = req.user;
  const { subscription } = req.body;

  const updatedUser = await User.findByIdAndUpdate(
    id,
    { subscription: subscription },
    { new: true }
  );

  if (!updatedUser) {
    throw HttpError(404, "Not found");
  }

  res.json({
    user: {
      name: updatedUser.name,
      email: updatedUser.email,
      subscription: updatedUser.subscription,
    },
  });
};

const avatarUpdate = async (req, res) => {
  const { id } = req.user;
  const { path: tmpUpload, originalname } = req.file;
  const fileName = `${id}_${originalname}`;
  try {
    await optimizesAvatar(tmpUpload);

    const resultUpload = path.join(dirToAvatars, fileName);

    await fs.rename(tmpUpload, resultUpload);

    const avatarUrl = path.join("avatars", fileName);

    await User.findByIdAndUpdate(id, { avatarUrl });

    res.json({ avatarUrl });
  } catch (error) {
    await fs.unlink(tmpUpload);
    throw error;
  }
};

module.exports = {
  register: controllerWrapper(register),
  logIn: controllerWrapper(logIn),
  getCurrent: controllerWrapper(getCurrent),
  logOut: controllerWrapper(logOut),
  subscriptionUpdate: controllerWrapper(subscriptionUpdate),
  avatarUpdate: controllerWrapper(avatarUpdate),
};
