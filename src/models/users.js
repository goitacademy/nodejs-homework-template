require("dotenv").config();
const { User } = require("../db/usersSchema.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const avatarsPath = path.resolve("./public/avatars");
const {
  Conflict,
  Unauthorized,
  InternalServerError,
  NotFound,
} = require("http-errors");
const resizeAvatar = require("../helpers/resizeAvatar");

const addUser = async (body) => {
  if (await User.findOne({ email: body.email })) {
    throw new Conflict("Email in use");
  }

  const avatarURL = gravatar.url(body.email);
  const verificationToken = uuidv4();
  const user = new User({ ...body, avatarURL, verificationToken });

  const msg = {
    to: body.email,
    from: "mkundeev@gmail.com",
    subject: "Contactsbook email verification",
    text: `Please confirm your email POST http://localhost:4000/api/users/verify/${verificationToken}`,
    html: `Please confirm your email POST http://localhost:4000/api/users/verify/${verificationToken}`,
  };
  await sgMail.send(msg);

  await user.save();
  return user;
};

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Unauthorized("Email or password is wrong");
  }
  if (!user?.verify) {
    throw new Unauthorized("Please verify your email");
  }
  if (!(await bcrypt.compare(password, user.password))) {
    throw new Unauthorized("Wrong password");
  }
  const token = jwt.sign(
    {
      _id: user._id,
    },
    process.env.SECRET
  );
  const logedInUser = await User.findOneAndUpdate(
    { email },
    { token },
    {
      new: true,
    }
  );
  return logedInUser;
};

const logOut = async (userId) => {
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { token: null },
      {
        new: true,
      }
    );
    return user;
  } catch (err) {
    throw new InternalServerError("Server error");
  }
};

const getUser = async (userId) => {
  try {
    return User.findById(userId);
  } catch (err) {
    throw new InternalServerError("Server error");
  }
};

const updateSubscription = async (body, userId) => {
  try {
    return User.findByIdAndUpdate(userId, body, {
      new: true,
    });
  } catch (err) {
    throw new InternalServerError("Server error");
  }
};

const changeAvatar = async (req, userId) => {
  if (!req?.file?.path) {
    throw new Conflict("Please add image for avatar");
  }
  const { path: temporaryPath, originalname } = req.file;
  const [, fileExtension] = originalname.split(".");
  const newFileName = avatarsPath + "/" + userId + "." + fileExtension;

  try {
    await fs.copyFile(temporaryPath, newFileName);
    resizeAvatar(newFileName);
    await fs.unlink(temporaryPath);
    return User.findByIdAndUpdate(
      userId,
      { avatarURL: newFileName },
      {
        new: true,
      }
    );
  } catch (err) {
    throw new InternalServerError("Server error");
  }
};

const findUserByVerificationToken = async (verificationToken) => {
  try {
    const user = User.findOneAndUpdate(
      { verificationToken },
      { verificationToken: null, verify: true },
      {
        new: true,
      }
    );
    return user;
  } catch (err) {
    throw new InternalServerError("Server error");
  }
};

const resendEmail = async ({ email }) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new NotFound("Wrong email");
  }

  if (user?.verify) {
    throw new Conflict("Verification has already been passed");
  }
  const msg = {
    to: email,
    from: "mkundeev@gmail.com",
    subject: "Contactsbook email verification",
    text: `Please confirm your email POST http://localhost:4000/api/users/verify/${user.verificationToken}`,
    html: `Please confirm your email POST http://localhost:4000/api/users/verify/${user.verificationToken}`,
  };
  await sgMail.send(msg);
};

module.exports = {
  addUser,
  loginUser,
  logOut,
  getUser,
  updateSubscription,
  changeAvatar,
  findUserByVerificationToken,
  resendEmail,
};
