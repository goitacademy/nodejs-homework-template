const { User } = require("./userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const gravatar = require("gravatar");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");
const { nanoid } = require("nanoid");
const HttpError = require("../../helpers/HttpError");
const sendEmail = require("../../helpers/sendEmail");
const mail = require("../../helpers/mailVerify");
const createTokens = require("../../helpers/createToken");
dotenv.config();

const { PORT = 3000, REFRESH_SECRET_KEY, BASE_URL } = process.env;
const avatarDir = path.join(__dirname, "../../", "public", "avatars");

const registerUser = async (req) => {
  if (req.file) {
    const { path: tempUpload, originalname } = req.file;
    const resultUpload = path.join(avatarDir, originalname);
    await fs.rename(tempUpload, resultUpload);
    const image = await Jimp.read(resultUpload);
    image.resize(250, 250).write(resultUpload);
  }
  const { name, email, password, subscription } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  const avatarURL =
    (req.file && path.join("avatars", req.file.originalname)) ||
    gravatar.url(email);
  const verificationToken = nanoid();

  await User.create({
    name,
    email,
    subscription,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: mail({ BASE_URL, PORT, verificationToken }),
  };

  await sendEmail(verifyEmail);

  return { name, avatarURL, email, subscription };
};

const verifyMail = async (req) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw HttpError(404, "User not found");
  }
  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: "",
  });
  return {
    message: "Verification successful",
  };
};

const mailToVerify = async (req) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email not found");
  }
  const { verificationToken } = user;
  if (!verificationToken) {
    throw HttpError(400, "Verification has already been passed");
  }
  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: mail({ BASE_URL, PORT, verificationToken }),
  };

  await sendEmail(verifyEmail);

  return {
    message: "Verification email sent",
  };
};

const loginUser = async (req) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }
  if (!user.verify) {
    throw HttpError(401, "Email isn't verify");
  }
  const compareResult = await bcrypt.compare(password, user.password);
  if (!compareResult) {
    throw HttpError(401, "Email or password is wrong");
  }

  const tokens = createTokens(user._id);
  await User.findByIdAndUpdate(user._id, { ...tokens });

  return {
    ...tokens,
    user: {
      email: user.email,
      subscription: user.subscription,
      name: user.name,
      avatarURL: user.avatarURL,
    },
  };
};

const refreshUser = async (req) => {
  const { refreshToken: currentToken } = req.body;
  const { id } = jwt.verify(currentToken, REFRESH_SECRET_KEY);

  const user = await User.findById(id);
  if (!user || !user.refreshToken || user.refreshToken !== currentToken) {
    throw HttpError(403, "Not authorized");
  } else {
    const tokens = createTokens(id);

    const userUpdate = await User.findByIdAndUpdate(id, { ...tokens });

    return {
      ...tokens,
      user: {
        email: userUpdate.email,
        subscription: userUpdate.subscription,
        name: userUpdate.name,
        avatarURL: userUpdate.avatarURL,
      },
    };
  }
};

const logoutUser = async (req, res) => {
  const { _id } = req.user;
  const user = await User.findByIdAndUpdate(_id, { refreshToken: "", accessToken: "" });
  return user||"Not found"
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
  image.resize(250, 250).write(resultUpload);

  await User.findByIdAndUpdate(_id, { avatarURL });

  return {
    avatarURL: avatarURL,
  };
};

module.exports = {
  registerUser,
  verifyMail,
  mailToVerify,
  loginUser,
  refreshUser,
  logoutUser,
  updateSubUser,
  updateAvatar,
};
