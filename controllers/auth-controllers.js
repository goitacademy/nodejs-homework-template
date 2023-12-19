import { controllerWrapper } from "../decorators/controllerWrapper.js";
import authServices from "../services/auth-services.js";
import Jimp from "jimp";
import path from "path";
import { nanoid } from "nanoid";
import { sendEmail } from "../utils/sendEmail.js";
import "dotenv/config";
import User from "../models/User.js";

const avatarsPath = path.resolve("public", "avatars");
const { BASE_URL } = process.env;

const signUp = controllerWrapper(async (req, res) => {
  const verificationToken = nanoid();
  const newUser = await authServices.signUpService(req.body);
    const verifyEmail = {
    to: req.body.email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Click to verify email</a>`,
  };
  await sendEmail(verifyEmail);
  res.status(201).json(newUser);
});

const verify = controllerWrapper(async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw HttpError(404, "Not found");
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });

  res.json({
    message: "Verification successful",
  });
});

const resendVerify = controllerWrapper(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email not found");
  }
  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }
  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${user.verificationToken}">Click to verify email</a>`,
  };

  await sendEmail(verifyEmail);

  res.json({
    message: "Verification email sent",
  });
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
  verify,
  resendVerify,
};
