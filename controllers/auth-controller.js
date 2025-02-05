const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const path = require("path");
const gravatar = require("gravatar");
const Jimp = require("jimp");
const fs = require("fs/promises");
const { randomUUID } = require("crypto");

const { User } = require("../models/user");
const { HttpError, sendEmail } = require("../helpers");
const { ctrlWrapper } = require("../decorators");

const { SECRET_KEY, BASE_URL } = process.env;

const register = async (req, res) => {
  const { email, password, subscription } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarUrl = `${req.protocol}://${req.get("host")}/avatars/${fileName}`;
  const verificationToken = randomUUID();

  const result = await User.create({
    ...req.body,
    password: hashPassword,
    verificationToken,
    subscription,
    avatarUrl,
  });

  const verifyEmail = {
    to: email,
    subject: "Сonfirm your registration",
    html: `<a style="text-decoration: none;" target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">
<button style="background-color: lightgreen; border-radius: 4px; padding: 2vh 4vw; font-weight: 700; font-size: 20px;">
     Click to confirm your registration
    </button>
     </a>`,
  };

  await sendEmail(verifyEmail);

  res.status(201).json({
    email: result.email,
    subscription: result.subscription,
    avatar: result.avatarUrl,
  });
};

const verify = async (req, res) => {
  const { verificationToken } = req.params;

  const user = await User.findOne({ verificationToken });

  if (!user) {
    throw HttpError(404, "User not found");
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: "",
  });

  res.json({
    message: "Verification successful",
  });
};

const resendVerify = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(404, "User not found");
  }
  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }

  const verifyEmail = {
    to: email,
    subject: "Сonfirm your registration",
    html: `<a style="text-decoration: none;" target="_blank" href="${BASE_URL}/api/auth/verify/${user.verificationToken}">
<button style="background-color: lightgreen; border-radius: 4px; padding: 2vh 4vw; font-weight: 700; font-size: 20px;">
     Click to confirm your registration
    </button>
     </a>`,
  };

  await sendEmail(verifyEmail);

  res.json({
    message: "Verification email sent",
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw HttpError(400, "Email or password is missing");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  if (!user.verify) {
    throw HttpError(404, "User not found");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token: token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const getCurrentUser = async (req, res) => {
  if(!req.user){
    return res.status(401).json({message: "No user is currently logged in"});
  }
  const { subscription, email } = req.user;

  res.json({
    email,
    subscription,
  });
};

const logout = async (req, res) => {
  if (!req.user) {
    throw HttpError(401, "Not authorized");
  }
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(200).json({
    message: "Logout success",
  });
};

const updateUser = async (req, res) => {
  const { _id } = req.user;
  const { name, email, subscription } = req.body;

  const updateData = {
    ...(name && {name}),
    ...(email && {email}),
    ...(subscription && {subscription}),
  };
  
  const result = await User.findByIdAndUpdate(_id, updateData, {
    new: true,
  });

  if (!result) {
    throw HttpError(404, `Not found`);
  }

  res.json({ result });
};

const updateAvatar = async (req, res, next) => {
  if (req.file) {
    const { size, path: tempUpload, originalname } = req.file;

    if (size > 2 * 1024 * 1024) {
      throw HttpError(400, "Avatar size exceeds the limit (2MB)");
    }

    await Jimp.read(tempUpload)
      .then((avatar) => {
        return avatar.resize(250, 250).quality(60).write(tempUpload);
      })
      .catch((err) => {
        throw err;
      });

    const { _id } = req.user;
    const fileName = `${_id}_${originalname}`;
    
    const avatarDir = path.join(__dirname, "../public/avatars");
    await fs.mkdir(avatarDir, { recursive: true });

    const publicUpload = path.join(avatarDir, fileName);
    await fs.rename(tempUpload, publicUpload);

    const avatarUrl = `${req.protocol}://${req.get("host")}/avatars/${fileName}`;

    await User.findByIdAndUpdate(_id, { avatarUrl });

    return res.json({
      avatarUrl,
    });
  }
  next();
};



module.exports = {
  register: ctrlWrapper(register),
  verify: ctrlWrapper(verify),
  resendVerify: ctrlWrapper(resendVerify),
  login: ctrlWrapper(login),
  getCurrentUser: ctrlWrapper(getCurrentUser),
  logout: ctrlWrapper(logout),
  updateUser: ctrlWrapper(updateUser),
  updateAvatar: ctrlWrapper(updateAvatar),
};
