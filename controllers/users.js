const jwt = require("jsonwebtoken");
const Users = require("../repository/users");
const fs = require("fs").promises;
const UploadService = require("../services/cloud-upload");
const { StatusCode, Subscription } = require("../config/constants");
require("dotenv").config();
const EmailService = require("../services/email/service");
const { CreateSenderSendGrid } = require("../services/email/sender"); 

const SECRET_KEY = process.env.JWT_SECRET_KEY;

const OK = StatusCode.OK;
const NOT_FOUND = StatusCode.NOT_FOUND;
const CREATED = StatusCode.CREATED;
const CONFLICT = StatusCode.CONFLICT;
const UNAUTHORIZED = StatusCode.UNAUTHORIZED;
const NO_CONTENT = StatusCode.NO_CONTENT;
const STARTER = Subscription.STARTER;
const PRO = Subscription.PRO;
const BUSINESS = Subscription.BUSINESS;

const signup = async (req, res, next) => {
  const { name, email, password, subscription } = req.body;
  const user = await Users.findByEmail(email);
  if (user) {
    return res.status(CONFLICT).json({
      status: "error",
      code: CONFLICT,
      message: "Email is already in use!",
    });
  }
  try {
    const newUser = await Users.create({ name, email, password, subscription });
    const emailService = new EmailService(
      process.env.NODE_ENV,
      new CreateSenderSendGrid()
    );
    const statusEmail = await emailService.sendVerifyEmail(
      newUser.email,
      newUser.name,
      newUser.verifyToken
    );
    return res.status(CREATED).json({
      status: "success",
      code: CREATED,
      data: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        subscription: newUser.subscription,
        avatar: newUser.avatarURL,
        successEmail: statusEmail,
      },
    });
  } catch (error) {
    next(error);
  }
};



const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await Users.findByEmail(email);
  // const isValidPassword = await user?.isValidPassword(password);
  const isValidPassword =
    (await user) === null || (await user) === undefined
      ? undefined
      : await user.isValidPassword(password);

  // if (!user || !isValidPassword || !user?.verify) {
  if (
    !user || !isValidPassword || !user === null || !user === undefined ? undefined : !user.verify
  ) {
    return res.status(UNAUTHORIZED).json({
      status: "error",
      code: UNAUTHORIZED,
      message: "Email or password is wrong!",
    });
  }
  const id = user._id;
  const payload = { id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "2h" });
  await Users.updateToken(id, token);
  return res.status(OK).json({
    status: "success",
    code: OK,
    date: {
      token,
    },
  });
};

const logout = async (req, res) => {
  const id = req.user._id;
  await Users.updateToken(id, null);
  return res.status(NO_CONTENT).json({});
};

const currentUser = async (req, res, next) => {
  try {
    // const id = req.user._id;
    const { _id:id, name, email, subscription } = req.user;
    return res.status(OK).json({
      status: "success",
      code: OK,
      user: {
        id,
        name,
        email,
        subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

const updateSubscription = async (req, res, next) => {
  try {
    const id = req.user._id;
    const user = await Users.updateSubscription(id, req.body);
    if (user) {
      return res.json({
        status: "success",
        code: OK,
        user: {
          id: user.id,
          email: user.email,
          subscription: user.subscription,
        },
      });
    } else {
      return res.status(NOT_FOUND).json({
        status: "error",
        code: NOT_FOUND,
        data: "Not found",
      });
    }
  } catch (error) {
    next(error);
  }
};

const onlyStarter = async (_req, res) => {
  return res.json({
    status: "success",
    code: OK,
    data: {
      message: `Only for ${STARTER} subscription!`,
    },
  });
};

const onlyPro = async (_req, res) => {
  return res.json({
    status: "success",
    code: OK,
    data: {
      message: `Only for ${PRO} subscription`,
    },
  });
};

const onlyBusiness = async (_req, res) => {
  return res.json({
    status: "success",
    code: OK,
    data: {
      message: `Only for ${BUSINESS} subscription`,
    },
  });
};



const uploadAvatar = async (req, res, _next) => {
  const { id, idUserCloud } = req.user;
  const file = req.file;

  const destination = "Avatars";
  const uploadService = new UploadService(destination);
  const { avatarUrl, returnIdUserCloud } = await uploadService.save(
    file.path,
    idUserCloud
  );

  await Users.updateAvatar(id, avatarUrl, returnIdUserCloud);
  try {
    await fs.unlink(file.path);
  } catch (error) {
    console.log(error.message);
  }
  return res.status(OK).json({
    status: "success",
    code: OK,
    data: {
      avatar: avatarUrl,
    },
  });
};

const verifyUser = async (req, res, next) => {
  const user = await Users.findUserByVerifyToken(req.params.verifyToken);

  if (user) {
    await Users.updateTokenVerify(user._id, true, null);
    return res.json({
      status: "success",
      code: OK,
      message: "Verification successful!",
    });
  }
  return res.status(NOT_FOUND).json({
    status: "error",
    code: NOT_FOUND,
    message: "User not Found!",
  });
};

const repeatEmailForVerifyUser = async (req, res, next) => {
  const { email } = req.body;
  const user = await Users.findByEmail(email);

  if (user && user.verify) {
    return res.status(BAD_REQUEST).json({
      status: "error",
      code: BAD_REQUEST,
      message: "Verification has already been passed!",
    });
  }

  if (user) {
    const { email, name, verifyToken } = user;
    const emailService = new EmailService(
      process.env.NODE_ENV,
      new CreateSenderSendGrid()
    );
    await emailService.sendVerifyEmail(email, name, verifyToken);
  }
  return res.status(OK).json({
    status: "success",
    code: OK,
    data: {
      message: "Verification email sent!",
    },
  });
};

module.exports = {
  signup,
  login,
  logout,
  currentUser,
  updateSubscription,
  onlyStarter,
  onlyPro,
  onlyBusiness,
  uploadAvatar,
  verifyUser,
  repeatEmailForVerifyUser,
};