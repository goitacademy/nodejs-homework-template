const { User } = require("./userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const gravatar = require("gravatar");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");
const HttpError = require("../../helpers/HttpError");

dotenv.config();

const { SECRET_KEY } = process.env;
const avatarDir = path.join(__dirname, "../../", "public", "avatars");

const registerUser = async (req) => {
  if (req.file) {
 const { path: tempUpload, originalname } = req.file;
  const resultUpload = path.join(avatarDir, originalname);
  await fs.rename(tempUpload, resultUpload);
    const image = await Jimp.read(resultUpload);
  image
    .resize(250, 250)
    .write(resultUpload); 
  }
  const { name, email, password, subscription } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  const avatarURL = (req.file && path.join("avatars", req.file.originalname)) || gravatar.url(email);

  await User.create({
    name,
    email,
    subscription,
    password: hashPassword,
    avatarURL,
  });
  return { email, subscription };
};

const loginUser = async (req) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }
  const compareResult = await bcrypt.compare(password, user.password);
  if (!compareResult) {
    throw HttpError(401, "Email or password is wrong");
  }
  const payload = { id: user._id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });

  return {
    token: token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  };
};

const logoutUser = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
};

const updateSubUser = async (req, res) => {
  const { _id } = req.user;
  const updatedUser = await User.findByIdAndUpdate(_id, req.body, {
    new: true,
  });
  if (!updatedUser) {
    throw HttpError(404, `Not found`);
  }

  const user = {
    email: updatedUser.email,
    subscription: updatedUser.subscription,
  };
  return user;
};

const updateAvatar = async (req, res) => {
  if (!req.file) {
    throw HttpError("400", "avatar must be exist");
  }

  const { path: tempUpload, originalname } = req.file;
  const { _id } = req.user;
  const extenstion = originalname.split(".").pop();
  const filename = `${_id}_avatar.${extenstion}`;
  const resultUpload = path.join(avatarDir, filename);
  await fs.rename(tempUpload, resultUpload);
  const avatarURL = path.join("avatars", filename);

    const image = await Jimp.read(resultUpload);
  image
    .resize(250, 250)
    .write(resultUpload); 

  await User.findByIdAndUpdate(_id, { avatarURL });

  return {
    avatarURL: avatarURL,
  };
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  updateSubUser,
  updateAvatar,
};
