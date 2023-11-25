const userDao = require("./user.dao");
const authService = require("../auth/auth.service");
const jimp = require("jimp");
const mimetypes = require("mime-types");
const path = require("path");
const appDir = path.dirname(require.main.filename);
const fs = require("fs/promises");
const { sendUserVerificationMail } = require("./user-mailer.service");

const signupHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const createdUser = await userDao.createUser({ email, password });

    await sendUserVerificationMail(
      createdUser.email,
      createdUser.verificationToken
    );

    return res.status(201).send({
      user: {
        email: createdUser.email,
        subscription: createdUser.subscription,
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
    const userEntity = await userDao.getUser({ email: req.body.email });
    const isUserPasswordValid = await userEntity.validatePassword(
      req.body.password
    );
    if (!userEntity || !isUserPasswordValid) {
      return res.status(401).send({ message: "Wrong credentials." });
    }

    if (!userEntity.verify) {
      return res.status(403).send({ message: "User is not verified." });
    }

    const userPayload = {
      email: userEntity.email,
      subscription: userEntity.subscription,
    };

    const token = authService.generateAccessToken(userPayload);
    await userDao.updateUser(userEntity.email, { token });

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
    const { _id } = req.user;
    console.log(await userDao.updateUserById(_id, { token: null }));

    return res.status(204).send();
  } catch (e) {
    return next(e);
  }
};

const currentHandler = async (req, res, next) => {
  try {
    const { email, subscription } = req.user;
    return res.status(200).send({ user: { email, subscription } });
  } catch (e) {
    return next(e);
  }
};

const avatarsHandler = async (req, res, next) => {
  try {
    const { email } = req.user;
    const filename = `${email}_${Date.now()}.${mimetypes.extension(
      req.file.mimetype
    )}`;

    const avatarImage = await jimp.read(req.file.path);

    await avatarImage.resize(250, 250).writeAsync(req.file.path);

    await fs.rename(
      req.file.path,
      path.join(appDir, "public/avatars", filename)
    );

    const updatedUser = await userDao.updateUser(email, {
      avatarURL: `http://localhost:3000/avatars/${filename}`,
    });

    return res.status(200).send({ avatarURL: updatedUser.avatarURL });
  } catch (e) {
    return next(e);
  }
};

const verifyHandler = async (req, res, next) => {
  try {
    const { verificationToken } = req.params;
    const user = await userDao.getUser({ verificationToken });

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    await userDao.updateUser(user.email, {
      verify: true,
      verificationToken: null,
    });

    return res.status(200).send({ message: "Verification successful" });
  } catch (e) {
    return next(e);
  }
};

const resendVerificationHandler = async (req, res, next) => {
  try {
    const user = await userDao.getUser({ email: req.body.email });

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    if (user.verify) {
      return res
        .status(400)
        .send({ message: "Verification has already been passed" });
    }

    await sendUserVerificationMail(user.email, user.verificationToken);
    return res.status(200).send({ message: "Verification email sent" });
  } catch (e) {
    return next(e);
  }
};

module.exports = {
  signupHandler,
  loginHandler,
  logoutHandler,
  currentHandler,
  avatarsHandler,
  verifyHandler,
  resendVerificationHandler,
};
