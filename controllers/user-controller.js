import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Jimp from "jimp";
import fs from "fs/promises";
import { nanoid } from "nanoid";
import "dotenv/config.js";
import { HttpError, cloudinary, sendEmail } from "../helpers/index.js";
import { ctrlWrapper } from "../decorators/index.js";

const { JWT_SECRET, BASE_URL } = process.env;

const userReg = async (req, res) => {
  const { email, password } = req.body;
  const isUser = await User.findOne({ email });
  if (isUser) {
    throw HttpError(409, `"Email in use"`);
  }
  const { path: oldPath, filename } = req.file;
  await Jimp.read(oldPath)
    .then((image) => {
      image.resize(256, 256);
    })
    .catch((err) => {
      err.message;
    });
  const { url: avatarURL, public_id } = await cloudinary.uploader.upload(
    oldPath,
    {
      folder: "avatarUser",
    }
  );
  await fs.unlink(oldPath);
  const hashPassword = await bcrypt.hash(password, 10);
  const verificationToken = nanoid();

  const user = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    public_id,
    verificationToken,
  });

  const verifyEmail = {
    to: email,
    subject: "Nodemailer test",
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}" >Click to verification</a>`,
  };

  await sendEmail(verifyEmail);

  res.status(201).json({
    user,
  });
};

const getVerification = async (req, res) => {
  const verificationToken = req.params.verificationToken;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw HttpError(404, `"User not found"`);
  }
  const { _id: id } = user;
  await User.findByIdAndUpdate(id, { verify: true, verificationToken: " " });

  res.status(200).json({
    message: "Verification successful",
  });
};

const userLog = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, `"Email or password is wrong"`);
  }
  if (!user.verify) {
    throw HttpError(401, `"User is not verify"`);
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, `"Email or password is wrong"`);
  }
  const { _id: id } = user;
  const payload = { id };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
  await User.findByIdAndUpdate(id, { token });

  res.status(200).json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
      avatarURL: user.avatarURL,
    },
  });
};

const repeatVerify = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (user.verify) {
    throw HttpError(400, `"Verification has already been passed"`);
  }

  const verifyEmail = {
    to: user.email,
    subject: "Nodemailer test",
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${user.verificationToken}" >Click to verification</a>`,
  };
  await sendEmail(verifyEmail);
  res.status(200).json({
    message: "Verification email sent",
  });
};

const userChangeAvatar = async (req, res) => {
  const { _id, public_id: p_id } = req.user;
  const { path: filePath } = req.file;
  await Jimp.read(filePath)
    .then((image) => {
      image.resize(256, 256);
    })
    .catch((err) => {
      err.message;
    });
  const { url: newAvatarURL, public_id } = await cloudinary.uploader.upload(
    filePath,
    {
      folder: "avatarUser",
    }
  );
  await fs.unlink(filePath);
  await cloudinary.uploader.destroy(p_id).then((result) => console.log(result));
  await User.findByIdAndUpdate(_id, {
    avatarURL: newAvatarURL,
    public_id,
  });
  res.status(200).json({ newAvatarURL });
};

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;
  res.status(200).json({ email, subscription });
};

const logOut = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.status(204).json({
    message: `"Logout success"`,
  });
};

const changeSubscript = async (req, res) => {
  const { _id, subscription } = req.user;
  const { type } = req.params;
  if (type === "starter" || "pro" || "business") {
    const user = await User.findByIdAndUpdate(_id, { subscription: type });
    res.status(200).json({
      email: user.email,
      subscription,
    });
    return;
  }
  throw HttpError(409, "Subscription is not validate");
};

export default {
  userReg: ctrlWrapper(userReg),
  userLog: ctrlWrapper(userLog),
  getCurrent: ctrlWrapper(getCurrent),
  logOut: ctrlWrapper(logOut),
  changeSubscript: ctrlWrapper(changeSubscript),
  userChangeAvatar: ctrlWrapper(userChangeAvatar),
  getVerification: ctrlWrapper(getVerification),
  repeatVerify: ctrlWrapper(repeatVerify),
};
