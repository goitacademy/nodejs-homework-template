import { controllerWrapper } from "../decorators/controllerWrapper.js";
import authServices from "../services/auth-services.js";
import Jimp from "jimp";
import path from "path";


const avatarsPath = path.resolve("public", "avatars");

const signUp = controllerWrapper(async (req, res) => {
  const newUser = await authServices.signUpService(req.body);
  res.status(201).json(newUser);
});

const logIn = controllerWrapper(async (req, res) => {
  const token = await authServices.logInService(req.body);
  res.json(token);
});

const getCurrent = async (req, res) => {
  const { password, email } = req.user;

  res.json({
    password,
    email,
  });
};

const signOut = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204);
};



const updateUserAvatar = controllerWrapper(async (req, res) => {
  const { _id } = req.user;
  const { path: oldPath, filename } = req.file;
  const img = await Jimp.read(oldPath);
  await img.resize(250, 250).writeAsync(oldPath);

  const newPath = path.join(avatarsPath, filename);
  await fs.rename(oldPath, newPath);
  const avatarURL = path.join("public", "avatars", filename);
  await User.findByIdAndUpdate(_id, { avatarURL });
  res.json({ avatarURL });
});

export default {
  signUp,
  logIn,
  getCurrent,
  signOut,
  updateUserAvatar,
};
