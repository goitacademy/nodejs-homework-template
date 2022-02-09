const path = require("path");
const fs = require("fs/promises");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const Jimp = require("jimp");
const { nanoid } = require("nanoid");
const { BadRequest, Conflict, Unauthorized, NotFound } = require("http-errors");

const { joiSignupSchema, joiLoginSchema } = require("../models/userModel");
const { User } = require("../models");
const { sendEmail } = require("../helpers");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");
// const avatarsDir = path.join(__dirname, "../../", "public/avatars");

const { SITE_NAME, SECRET_KEY } = process.env;

const signupController = async (req, res, next) => {
  try {
    const { body } = req;
    const { name, email, password, subscription } = req.body;
    const { error } = joiSignupSchema.validate(body);
    // body-схема проверяет соотвествует ли тело запроса тому, что написано в joiSchema

    if (error) {
      throw new BadRequest(error.message);
    }

    const user = await User.findOne({ email });

    if (user) {
      throw new Conflict("Email in use");
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const verificationToken = nanoid();
    const avatarURL = gravatar.url(email);
    const newUser = await User.create({
      name,
      email,
      verificationToken,
      password: hashPassword,
      avatarURL,
      subscription,
    });
    // const newUser = new User({ name, email });
    // newUser.setPassword(password);
    // const result = newUser.save();

    const data = {
      to: email,
      subject: "Email confirmation",
      html: `<a target="_blank"
  href="${SITE_NAME}/api/auth/users/verify/${verificationToken}">Confirm email</a>`,
    };
    await sendEmail(data);

    res.status(201).json({
      user: {
        name: newUser.name,
        email: newUser.email,
        // password: newUser.password,
        subscription: newUser.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

const loginController = async (req, res, next) => {
  try {
    const { body } = req;
    const { email, password } = req.body;
    const { error } = joiLoginSchema.validate(body);

    if (error) {
      throw new BadRequest(error.message);
    }

    const user = await User.findOne({ email });

    if (!user) {
      throw new Unauthorized("Email or password is wrong");
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    // const passwordCompare = user.comparePassword(password);

    if (!passwordCompare) {
      throw new Unauthorized("Email or password is wrong");
    }

    const { _id, subscription } = user;
    const payload = {
      id: _id,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
    await User.findByIdAndUpdate(_id, { token });

    res.json({
      token,
      user: {
        email,
        subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

const logoutController = async (req, res, next) => {
  const { _id } = req.user;

  await User.findByIdAndUpdate(_id, { token: null });

  res.status(204).send();
};

const currentController = async (req, res, next) => {
  const { email, subscription } = req.user;

  res.json({
    user: {
      email,
      subscription,
    },
  });
};

const updateAvatar = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { path: tempUpload, filename } = req.file;

    const image = await Jimp.read(tempUpload);
    image.resize(250, 250).writeAsync(tempUpload);

    const [extension] = filename.split(".").reverse();
    const newFileName = `${_id}.${extension}`;
    const fileUpload = path.join(avatarsDir, newFileName);
    await fs.rename(tempUpload, fileUpload);
    const avatarURL = path.join("avatars", newFileName);
    await User.findByIdAndUpdate(_id, { avatarURL }, { new: true });
    res.json({ avatarURL });
  } catch (error) {
    await fs.unlink(req.file.path);
    // const { path: tempUpload } = req.file;
    // await fs.unlink(tempUpload);

    next(error);
  }
};

const emailVerification = async (req, res, next) => {
  try {
    const { verificationToken } = req.params;
    const user = await User.findOne({ verificationToken });

    if (!user) {
      throw new NotFound("User not found");
    }

    await User.findByIdAndUpdate(user._id, {
      verificationToken: null,
      verify: true,
    });

    res.json({
      message: "Verification successful",
    });
  } catch (error) {
    next(error);
  }
};

const emailReVerification = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      throw new BadRequest("Missing required field email");
    }

    const user = await User.findOne({ email });

    if (!user) {
      throw new NotFound("User not found");
    }

    if (user.verify) {
      throw new BadRequest("Verification has already been passed");
    }

    const { verificationToken } = user;
    const data = {
      to: email,
      subject: "Email confirmation",
      html: `<a target="_blank"
  href="${SITE_NAME}/api/auth/users/verify/${verificationToken}">Confirm email</a>`,
    };
    await sendEmail(data);

    res.json({ message: "Verification email sent" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signupController,
  loginController,
  logoutController,
  currentController,
  updateAvatar,
  emailVerification,
  emailReVerification,
};
