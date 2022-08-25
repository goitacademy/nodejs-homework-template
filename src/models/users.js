const { User } = require("../db/usersSchema.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const fs = require("fs").promises;
const path = require("path");

const avatarsPath = path.resolve("./public/avatars");
const { Conflict, Unauthorized, InternalServerError } = require("http-errors");
const resizeAvatar = require("../helpers/resizeAvatar");

const addUser = async (body) => {
  if (await User.findOne({ email: body.email })) {
    throw new Conflict("Email in use");
  }
  try {
    const avatarURL = gravatar.url(body.email);
    const user = new User({ ...body, avatarURL });
    await user.save();
    return user;
  } catch (error) {
    throw new InternalServerError("Server error");
  }
};

const loginUser = async ({ email, password }) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Unauthorized("Email or password is wrong");
    }
    if (!(await bcrypt.compare(password, user.password))) {
      throw new Unauthorized("Email or password is wrong");
    }
    const token = jwt.sign(
      {
        _id: user._id,
      },
      process.env.SECRET
    );
    await user.setToken(token);
    await user.save();
    return user;
  } catch (err) {
    throw new InternalServerError("Server error");
  }
};

const logOut = async (userId) => {
  try {
    const user = await User.findById(userId);
    await user.setToken(null);
    await user.save();
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

module.exports = {
  addUser,
  loginUser,
  logOut,
  getUser,
  updateSubscription,
  changeAvatar,
};
