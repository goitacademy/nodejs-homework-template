const { User } = require("../models/Users");
const Jimp = require('jimp');
const fs = require('fs/promises');
const path = require('path');
const { ctrlWrapper, HttpError,SendEmail} = require("../helpers");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid")
dotenv.config();
const { SECRET_KEY ,BASE_URL} = process.env;

const register = async (req, res, next) => {
  console.log(req.body);
  try {
    const { email, password, name, subscription } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      res.status(209).json({ messeage: "Email in use" });
    }
  const verificationToken = nanoid();
    const hashPassword = await bcrypt.hash(password, 10);
      const avatarURL = gravatar.url(email);
    const newUser = await User.create({
      email,
      password: hashPassword,
      subscription,
      name,
      avatarURL,
      verificationToken
    });
    await SendEmail(email,verificationToken,BASE_URL);

    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
        name: newUser.name,
        avatarURL:newUser.avatarURL
      },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  console.log(req.body);
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      res.status(401).json({ messeage: " or password is wrong" });
    }
     if (!user.verify) {
        return res.status(401).json({ message: "Email is not verified" });
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    console.log(user.password);
    if (!passwordCompare) {
      res.status(401).json({ messeage: "Email or password is wrong" });
    }

    const payload = {
      id: user._id,
    };

    const token = await jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
    await User.findByIdAndUpdate(user._id, { token });
    console.log(token);
    res.status(200).json({
      token,
      user: {
        email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    const { _id: id } = req.user;
    const user = await User.findById(id);
    if (!user) {
      res.status(209).json({ messeage: "Email in use" });
      throw HttpError(401, "Not authorized");
    }

    await User.findByIdAndUpdate(id, { token: "" });
    res.status(204).json();
  } catch (error) {
    next(error);
  }
};
const currentUser = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) {
      throw HttpError(401, "Not authorized");
    }

    res.json({
      email: user.email,
      subscription: user.subscription,
    });
  } catch (error) {
    next(error);
  }
};
const updateBySubscription = async (req, res, next) => {
  try {
    const { subscription } = req.body;
    const { _id } = req.user;
    const user = await User.findByIdAndUpdate(
      _id,
      { subscription },
      { new: true },
    );

    if (!user) {
      throw HttpError(401, "Not authorized");
    }
  
    res.json({ subscription: user.subscription });
  } catch (error) {
    next(error);
  }
};

const updateByAvatar = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { path: tempUpload, originalname } = req.file;
    const avatarDir = path.join(__dirname, "../", "public", "avatars");
    await Jimp.read(tempUpload).then((img) =>
      img.resize(250, 250).write(`${tempUpload}`)
    );
    const fileName = `${_id}_${originalname}`;
    const resultUpload = path.join(avatarDir, fileName);
    await fs.rename(tempUpload, resultUpload);

    const avatarURL = path.join("avatars", fileName);
    const user = await User.findByIdAndUpdate(_id, { avatarURL });

    if (!User) {
      throw HttpError(401, "Not authorized");
    }
    res.json({ user });

  } catch (error) {
    next(error);
  }
};
const verifyEmail = async (req, res) => {
    const { verificationToken } = req.params;
    const user = await User.findOne({
        verificationToken,
    });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    };
    if (!user.verify) {
        await User.findByIdAndUpdate(user._id, {
            verify: true,
            verificationToken: null,
        });
        return res.status(200).json({
            message: "Verification successful",
        });
    };
    if (user.verify) {
        return res.json({
            message: "Verification has already been passed",
        });
    };
};

const resendVerifyEmail = async (req, res) => {
    const { email } = req.body;
  const user = await User.findOne({ email });
     if (!user) {
        return res.status(400).json({ message: "Email not found" });
    };
    if (user.verify) {
        return res.status(400).json({ message: "Verification has already been passed" });
    };
    await SendEmail({ email, verificationToken: user.verificationToken,BASE_URL });
    return res.status(200).json({ message: "Verification email sent" });
};


module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  currentUser: ctrlWrapper(currentUser),
  updateBySubscription: ctrlWrapper(updateBySubscription),
  updateByAvatar: ctrlWrapper(updateByAvatar),
  verifyEmail: ctrlWrapper(verifyEmail),
  resendVerifyEmail:ctrlWrapper(resendVerifyEmail)
};
