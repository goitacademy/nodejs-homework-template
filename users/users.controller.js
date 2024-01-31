const userDao = require("./users.dao");
const authService = require("../auth/auth.service");
const gravatar = require("gravatar");
const path = require("path");
const fs = require("fs").promises;
const jimp = require("jimp");
const mimetype = require("mime-types");
const multer = require("multer");
const { serverPort } = require("../config");

const signupHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const avatarURL = gravatar.url(`${email}`, { default: "monsterid" }, true);
    const createdUser = await userDao.createUser({
      email,
      password,
      avatarURL,
    });

    return res.status(201).send({
      user: {
        email: createdUser.email,
        subscription: createdUser.subscription,
        avatarURL: createdUser.avatarURL,
      },
    });
  } catch (e) {
    const { message } = e;

    if (e instanceof userDao.DuplicatedEmailError) {
      return res.status(409).send({ message });
    }

    return next(e);
  }
};

const loginHandler = async (req, res, next) => {
  try {
    const userEntity = await userDao.getUser(req.body.email);
    const isUserPasswordValid = await userEntity.validatePassword(
      req.body.password
    );
    if (!userEntity || !isUserPasswordValid) {
      return res.status(401).send({ message: "Wrong credentials." });
    }

    const userPayload = {
      _id: userEntity._id,
      email: userEntity.email,
      subscription: userEntity.subscription,
    };

    const token = authService.generateAccessToken(userPayload);

    await userDao.updateUser(userEntity.email, { token });
    userEntity.token = token;

    return res.status(200).send({
      user: userPayload,
      token,
    });
  } catch (e) {
    return next(e);
  }
};

const logoutHandler = async (req, res, next) => {
  try {
    const { email } = req.user;
    await userDao.updateUser(email, { token: null });
    return res
      .status(200)
      .send({ message: `user: '${email}' loged out succesfully` });
  } catch (e) {
    return next(e);
  }
};

const currentHandler = async (req, res, next) => {
  try {
    const { email, subscription } = req.user;
    return res.status(200).send({ user: { email, subscription } });
  } catch (e) {
    console.log("currentHandler ERROR");
    return next(e);
  }
};

const upload = multer({
  dest: path.join(__dirname, "../tmp"),
  limits: 1048576,
});

avatarPatchHandler = async (req, res, next) => {
  try {
    const { email, avatarURL } = req.user;
    const filename = `${email}.${mimetype.extension(req.file.mimetype)}`;
    const avatarImage = await jimp.read(req.file.path);

    await avatarImage.resize(250, 250).writeAsync(req.file.path);

    await fs.rename(
      req.file.path,
      path.join(__dirname, "../public/avatars", filename)
    );

    userDao.updateUser(email, {
      avatarURL: `http://localhost:${serverPort}/avatars/${filename}`,
      new: true,
    });

    return res.status(200).send({ user: email, avatarURL });
  } catch (e) {
    console.log("AVATAR ERROR");
    return next(e);
  }
};

module.exports = {
  signupHandler,
  loginHandler,
  logoutHandler,
  currentHandler,
  upload,
  avatarPatchHandler,
};
