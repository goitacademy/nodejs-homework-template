const userDao = require("./users.dao");
const authService = require("../auth/auth.service");
const { sendUserVerificationMail } = require("./user-mailer.service");

const signupHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const createdUser = await userDao.createUser({ email, password });

    // await sendUserVerificationMail(
    //   createdUser.email,
    //   createdUser.verificationToken
    // );

    return res.status(201).send({
      user: {
        email: createdUser.email,
        subscription: createdUser.subscription,
      },
    });
  } catch (e) {
    const { message } = e;

    if (e instanceof userDao.DuplicatedKeyError) {
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

    if (!userEntity.verified) {
      return res.status(403).send({ message: "User is not verified." });
    }

    const userPayload = {
      email: userEntity.email,
      role: userEntity.role,
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
    const { email } = req.user;
    await userDao.updateUser(email, { token: null });

    return res.status(204).send();
  } catch (e) {
    return next(e);
  }
};

const currentHandler = async (req, res, next) => {
  try {
    const { email, role } = req.user;
    return res.status(200).send({ user: { email, role } });
  } catch (e) {
    return next(e);
  }
};

const verifyHandler = async (req, res, next) => {
  try {
    const { verificationToken } = req.params;
    const user = await userDao.getUser({ verificationToken });

    if (!user) {
      return res
        .status(400)
        .send({ message: "Verification token is not valid or expired. " });
    }

    if (user.verified) {
      return res.status(400).send({ message: "User is already verified. " });
    }

    await userDao.updateUser(user.email, {
      verified: true,
      verificationToken: null,
    });

    return res.status(200).send({ message: "User has been verified." });
  } catch (e) {
    return next(e);
  }
};

const resendVerificationHandler = async (req, res, next) => {
  try {
    const user = await userDao.getUser({ email: req.body.email });

    if (!user) {
      return res.status(404).send({ message: "User does not exist." });
    }

    if (user.verified) {
      return res.status(400).send({ message: "User is already verified." });
    }

    await sendUserVerificationMail(user.email, user.verificationToken);

    return res.status(204).send();
  } catch {
    return next(e);
  }
};

module.exports = {
  signupHandler,
  loginHandler,
  logoutHandler,
  currentHandler,
  verifyHandler,
  resendVerificationHandler,
};
