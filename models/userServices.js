const { User } = require("../models");
const { HttpError } = require("../addoption/");
const jwt = require("jsonwebtoken");
const path = require("path");
const fse = require("fs-extra");
const jimp = require("jimp");

exports.checkUserEmailExists = async (email) => {
  const emailExists = await User.exists(email);

  if (emailExists) throw HttpError(409, "Email in use");
};

exports.registerUser = async (data) => {
  const newUserData = {
    ...data,
  };
  const newUser = await User.create(newUserData);

  newUser.password = undefined;
  //   const token = signToken(newUser.id);
  return {
    user: newUser,
    // token,
  };
};

exports.login = async ({ email, password }) => {
  const user = await User.findOne({ email }).select("+password");

  if (!user) throw HttpError(401, "Email or password is wrong");

  const passwdIsValid = await user.checkPassword(password, user.password);

  if (!passwdIsValid) throw HttpError(401, "Email or password is wrong");

  user.password = undefined;

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });

  await User.findByIdAndUpdate(user.id, { token });

  return {
    token,
    user: { email: user.email, subscription: user.subscription },
  };
};

exports.avatars = async (userData, user, file, res) => {
  console.log(file);

  if (file) {
    console.log(1);
    const { _id } = user;
    const tmpPath = path.join(__dirname, "../tmp");
    const fileName = `${_id}-${file.originalname}`;
    const filePath = path.join(tmpPath, fileName);

    await fse.rename(tmpPath, filePath);

    const image = await jimp.read(filePath);
    await image.resize(250, 250).write(filePath);

    const avatarsPath = path.join(__dirname, "../public/avatars");
    const avatarURL = `/avatars/${fileName}`;
    const destinationPath = path.join(avatarsPath, fileName);

    await fse.move(filePath, destinationPath);

    user.avatarURL = avatarURL;
  }

  Object.keys(userData).forEach((key) => {
    user[key] = userData[key];
  });

  return user.save();
};
