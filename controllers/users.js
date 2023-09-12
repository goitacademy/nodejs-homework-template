const path = require("node:path");
const { conrollerWraper } = require("../helpers/controllerWraper");
const {
  registerUserService,
  loginUserService,
  logoutUserService,
  subscriptionUserService,
  changeAvatarUserService,
} = require("../secrive/usersServices");

const fs = require("node:fs/promises");
const Jimp = require("jimp");
const { HttpError } = require("../helpers/HttpError");

const registrationUser = async (req, res, next) => {
  try {
    const subscription = await registerUserService(req.body);

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

module.exports = {
  registrationUser: conrollerWraper(registrationUser),
  loginUser: conrollerWraper(loginUser),
  logoutUser: conrollerWraper(logoutUser),
  currentUser: conrollerWraper(currentUser),
  subscriptionUser: conrollerWraper(subscriptionUser),
  changeAvatarUser: conrollerWraper(changeAvatarUser),
};
