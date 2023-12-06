const bcrypt = require("bcrypt");
const path = require("node:path");
const fs = require("node:fs/promises");

const { NotFound, BadRequest, Unauthorized } = require("http-errors");
const { SECRET_KEY, BASE_URL } = process.env;
const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
const gravatar = require("gravatar");
const Jimp = require("jimp");
const { sendEmail } = require("../helpers/sendEmail");
const { v4: uuidv4 } = require("uuid");

const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).exec();

    if (user) {
      res.status(409).json({ message: "Email in use" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);
    const verificationToken = uuidv4();

    const newUser = await User.create({
      ...req.body,
      password: hashPassword,
      avatarURL,
      verificationToken,
    });

    const verifyEmail = {
      to: email,
      subject: "Confirmation of Registration",
      html: `To confirm your registration, please click on the following link: <a href="${BASE_URL}/users/verify/${verificationToken}" target="_blank" style="font-size: 16px;">Click here to verify your email</a>`,
      text: `To confirm your registration, please open the following link: ${BASE_URL}/users/verify/${verificationToken}`,
    };

    await sendEmail(verifyEmail);

    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

const verify = async (req, res, next) => {
  try {
    const { verificationToken } = req.params;
    const user = await User.findOne({ verificationToken });
    if (!user) {
      throw new NotFound("User not found");
    }
    await User.findByIdAndUpdate(user._id, {
      verify: true,
      verificationToken: null,
    });

    res.json({
      message: "Verification successful",
    });
  } catch (error) {
    next(error);
  }
};

const resendVerifyEmail = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new NotFound("Email not found");
    }
    if (user.verify) {
      throw new BadRequest("Verification has already been passed");
    }

    return res.status(200).json({ message: "Verification email sent" });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).exec();

    if (!user) {
      throw new Unauthorized("Email or password is wrong");
    }

    
    if (!user.verify) {
      throw new Unauthorized("Email not verify");
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      throw new Unauthorized("Email or password is wrong");
    }

    const payload = {
      id: user._id,
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
    await User.findByIdAndUpdate(user._id, { token }).exec();

    res.json({
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getCurrent = async (req, res, next) => {
  try {
    const { email, subscription } = req.user;

    res.json({
      email,
      subscription,
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    const user = req.user;

    if (!user) {
      throw new Unauthorized("Not authorized");
    }

    await User.findByIdAndUpdate(user._id, { token: null }).exec();

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

const updateSubscription = async (req, res, next) => {
  try {
    const { _id } = req.user;

    const result = await User.findByIdAndUpdate(_id, req.body, {
      new: true,
    });

    if (!result) {
      throw new NotFound("Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const avatarDir = path.join(__dirname, "..", "public/avatars");
const updateAvatar = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { path: tmpUpload, originalname } = req.file;
    const avatarName = `${_id}_${originalname}`;
    const resultUpload = path.join(avatarDir, avatarName);
    await fs.rename(tmpUpload, resultUpload);

    const image = await Jimp.read(resultUpload);
    await image.resize(250, 250).write(resultUpload);

    const avatarURL = path.join("avatars", avatarName);
    await User.findByIdAndUpdate(_id, { avatarURL: path.basename(avatarURL) });
    res.json({ avatarURL: path.basename(avatarURL) });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  logout,
  getCurrent,
  updateSubscription,
  updateAvatar,
  verify,
  resendVerifyEmail,
};
