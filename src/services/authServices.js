const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const Jimp = require("jimp");
const path = require("path");
const sgMail = require("@sendgrid/mail");
const { v4: uuidv4 } = require("uuid");
const {
  NotAuthorizedError,
  WrongParametersForContactByIdError,
  WrongParametersError,
} = require("../helpers/errors");
const { User } = require("../db/userModel");

const emailToSendFrom = process.env.EMAIL;

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const PORT = process.env.PORT;

const registration = async (email, password) => {
  const avatarURL = gravatar.url(email, { s: "100", r: "x", d: "retro" }, true);
  const verificationToken = uuidv4();
  const user = new User({
    email,
    password: await bcrypt.hash(password, 10),
    avatarURL,
    verificationToken,
  });

  await user.save();

  const msg = {
    to: email,
    from: emailToSendFrom,
    subject: "Registration verification",
    text: `Please confirm Your email address at localhost:${PORT}/api/users/verify/${verificationToken}`,
    html: `<strong>Please confirm Your email address at localhost:${PORT}/api/users/verify/${verificationToken} </strong>`,
  };

  sgMail.send(msg);
};

const login = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new NotAuthorizedError("Email or password is wrong");
  }

  if (!user.verify) {
    throw new NotAuthorizedError("Email not verified");
  }

  if (!(await bcrypt.compare(password, user.password))) {
    throw new NotAuthorizedError("Email or password is wrong");
  }

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  return token;
};

const logout = async (user) => {
  user.token = null;
};

const currentUser = async (userId) => {
  const user = await User.findById(userId);
  const { email, subscription } = user;
  return { email, subscription };
};

const changeSubscription = async (id, subscription) => {
  await User.findByIdAndUpdate(id, { subscription });
};

const changeAvatar = async (filePath, name, id) => {
  const newPath = path.resolve(`./public/avatars/${name}`);
  const avatarURL = `/avatars/${name}`;
  const image = await Jimp.read(filePath);
  try {
    await image.resize(250, 250);
    await image.writeAsync(newPath);
    await User.findByIdAndUpdate(id, { avatarURL });
    return avatarURL;
  } catch (error) {
    return error;
  }
};

const getVerification = async (verificationToken) => {
  const user = await User.findOne({ verificationToken });

  if (!user) {
    throw new WrongParametersForContactByIdError("User not found");
  }
  const verifiedUser = await User.findOneAndUpdate(
    { verificationToken },
    {
      verificationToken: null,
      verify: true,
    }
  );

  return verifiedUser;
};

const verifyUser = async (email) => {
  if (!email) {
    throw new WrongParametersError("Missing required field email");
  }

  const verifiedUser = await User.findOne({ email });

  if (!verifiedUser.verificationToken) {
    throw new WrongParametersError("Verification has already been passed");
  }

  const msg = {
    to: email,
    from: emailToSendFrom,
    subject: "Registration verification",
    text: `Please confirm Your email address at localhost:${PORT}/api/users/verify/${verifiedUser.verificationToken}`,
    html: `<strong>Please confirm Your email address at localhost:${PORT}/api/users/verify/${verifiedUser.verificationToken} </strong>`,
  };

  sgMail.send(msg);
};

module.exports = {
  registration,
  login,
  logout,
  currentUser,
  changeSubscription,
  changeAvatar,
  getVerification,
  verifyUser,
};
