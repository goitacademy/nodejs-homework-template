import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Jimp from "jimp";
import fs from "fs/promises";
import "dotenv/config.js";
import { HttpError, cloudinary } from "../helpers/index.js";
import { ctrlWrapper } from "../decorators/index.js";

const { JWT_SECRET } = process.env;

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
  const user = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    public_id,
  });
  res.status(201).json({
    user,
  });
};

const userLog = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, `"Email or password is wrong"`);
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
};
