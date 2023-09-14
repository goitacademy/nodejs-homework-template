const path = require("node:path");
const { conrollerWraper } = require("../helpers/controllerWraper");
const {
  registerUserService,
  loginUserService,
  logoutUserService,
  subscriptionUserService,
  changeAvatarUserService,
  verifyUserService,
  verifyBegineUserService,
} = require("../secrive/usersServices");

const crypto = require("node:crypto");

const fs = require("node:fs/promises");
const Jimp = require("jimp");
const { HttpError } = require("../helpers/HttpError");
const sendEmail = require("../helpers/sendEmail");

const registrationUser = async (req, res, next) => {
  const verificationToken = crypto.randomUUID();
  req.body.verificationToken = verificationToken;

  try {
    const subscription = await registerUserService(req.body);

    await sendEmail({
      to: req.body.email,
      subject: `Welcome to registration, ${req.body.email}`,
      html: `<p> Please verify your email, click on link below</p></b><a href="http://localhost:3000/api/users/verify/${verificationToken}">Click</a>`,
      text: `Please verify your email, click on link below\nhttp://localhost:3000/api/users/verify/${verificationToken}`,
    });

    res.status(201).json({ user: { email: req.body.email, subscription } });
  } catch (err) {
    next(err);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { token, subscription } = await loginUserService(req.body);

    res
      .status(200)
      .json({ user: { token, email: req.body.email, subscription } });
  } catch (err) {
    next(err);
  }
};

const logoutUser = async (req, res, next) => {
  try {
    await logoutUserService(req.user.id);

    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

const currentUser = (req, res) => {
  const { email, subscription } = req.user;

  res.status(200).json({ email, subscription });
};

const subscriptionUser = async (req, res, next) => {
  try {
    const updateUser = await subscriptionUserService(
      req.user._id,
      req.body.subscription
    );

    res.status(200).json({ status: "success", code: 200, data: updateUser });
  } catch (err) {
    next(err);
  }
};

const changeAvatarUser = async (req, res, next) => {
  const oldPathAvatar = req.file.path;
  const newPathAvatar = path.join(
    __dirname,
    "..",
    "public/avatars",
    req.file.filename
  );

  try {
    await Jimp.read(oldPathAvatar)
      .then((avatar) => {
        return avatar
          .cover(250, 250) // resize
          .writeAsync(oldPathAvatar); // save
      })
      .catch(() => {
        throw new HttpError(400, "Please send file undo 38MB!");
      });

    await fs.rename(oldPathAvatar, newPathAvatar);

    const isFoundUser = await changeAvatarUserService(
      req.user._id,
      req.file.filename
    );

    if (!isFoundUser) {
      res.status(404).json({ message: "Not found" });
      return;
    }

    res.status(200).json({ avatarURL: req.file.filename });
  } catch (err) {
    next(err);
  }
};

const verifyUser = async (req, res, next) => {
  const { verificationToken } = req.params;
  try {
    await verifyUserService(verificationToken);
    res.status(200).json({ message: "Verification successful" });
  } catch (err) {
    next(err);
  }
};

const verifyBegineUser = async (req, res, next) => {
  const { email } = req.body;
  try {
    const verificationToken = await verifyBegineUserService(email);

    await sendEmail({
      to: email,
      subject: `Welcome to registration, ${email}`,
      html: `<p> Please verify your email, click on link below</p></b><a href="http://localhost:3000/api/users/verify/${verificationToken}">Click</a>`,
      text: `Please verify your email, click on link below\nhttp://localhost:3000/api/users/verify/${verificationToken}`,
    });

    res.status(200).json({ message: "Verification email sent" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  registrationUser: conrollerWraper(registrationUser),
  loginUser: conrollerWraper(loginUser),
  logoutUser: conrollerWraper(logoutUser),
  currentUser: conrollerWraper(currentUser),
  subscriptionUser: conrollerWraper(subscriptionUser),
  changeAvatarUser: conrollerWraper(changeAvatarUser),
  verifyUser: conrollerWraper(verifyUser),
  verifyBegineUser: conrollerWraper(verifyBegineUser),
};
