import User from "../service/schemas/users.js";
import Jimp from "jimp";

export const listUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (err) {
    console.log(err);
  }
};
export const getUserById = async (id) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      return null;
    } else {
      return user;
    }
  } catch (err) {
    console.log(err);
  }
};

export const loginUser = async (body) => {
  const { email, password } = body;
  const users = await User.find();
  const user = users.find((user) => user.email === email);
  if (!user) return false;
  try {
    const isUser = user.validPassword(password, user.password);
    if (!isUser) return false;
    return user;
  } catch (err) {
    console.log("Error adding new user: ", err);
  }
};

export const updateSubscription = async (subscription, userId) => {
  const availableSubscriptions = User.schema.path("subscription").enumValues;
  if (!subscription || !availableSubscriptions.includes(subscription)) {
    return 400;
  }
  try {
    return await User.findByIdAndUpdate(
      { _id: userId },
      { $set: { subscription: subscription } },
      { new: true, select: "email subscription" }
    );
  } catch (err) {
    console.error("An error occurred while updating user: ", err);
  }
};

export const updateAvatar = async (filePath, userId) => {
  try {
    const localPath = `public/avatars/avatar-${userId}.jpg`;
    const serverPath = localPath.replace("public/", "");

    const newAvatar = await Jimp.read(filePath);
    await newAvatar.resize(250, 250).quality(60).writeAsync(localPath);

    await User.findByIdAndUpdate(
      { _id: userId },
      { $set: { avatarURL: localPath } },
      { new: true, select: "avatarURL" }
    );

    return serverPath;
  } catch (err) {
    console.error("An error occurred while updating avatar: ", err);
    throw err;
  }
};
