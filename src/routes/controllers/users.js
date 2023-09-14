import jwt from "jsonwebtoken";
import bCrypt from "bcryptjs";
import gravatar from "gravatar";
import Jimp from "jimp";
import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";
import service from "../../services/users.js";
import sendMail from "../../utils/sendMail.js";
import {
  handleValidationError,
  handleUserUnauthorizedError,
  handleUserConflictError,
  handleUserNotFoundError,
  handleUpdateAvatarError,
  handleEmailNotVerifiedError,
  handleUserAlreadyBeenVerifiedError,
} from "../../utils/handleErrors.js";
import {
  userRegisterSchema,
  userLoginSchema,
  userLogoutSchema,
  userReverifySchema,
  userSubSchema,
  userAvatarSchema,
} from "../../utils/validation.js";
import { storeAvatars } from "../../utils/manageUploadFolders.js";

const register = async (req, res, next) => {
  try {
    const { body } = req;
    const { username, email, password } = body;
    await userRegisterSchema.validateAsync(body);

    const isUserExists = await service.getUserWithOrOperator([
      { username },
      { email },
    ]);

    if (isUserExists) {
      return handleUserConflictError(res, isUserExists, username, email);
    }

    const user = await service.createUser(body);
    const avatarURL = gravatar.url(email, { s: "250", r: "pg", d: "mp" }, true);

    user.set("avatarURL", avatarURL);
    user.set("pubId", nanoid());
    user.set("verificationToken", nanoid());
    user.set("password", await bCrypt.hash(password, await bCrypt.genSalt()));

    await user.save();
    const verificationToken = user.get("verificationToken");
    sendMail(email, verificationToken);

    res.status(201).json({
      status: 201,
      statusText: "Created",
      data: {
        user: {
          email: user.email,
          subscription: user.subscription,
          verify: user.verify,
        },
        message:
          "Verify your e-mail address. The message has been sent to your e-mail, if you do not see your message, please check SPAM or try again",
      },
    });
  } catch (err) {
    handleValidationError(err, res, next);
  }
};

const login = async (req, res, next) => {
  try {
    await userLoginSchema.validateAsync(req.body);
    const { email, password } = req.body;
    const existingUser = await service.getUser({ email });

    if (
      !existingUser ||
      !(await bCrypt.compare(password, existingUser.password))
    ) {
      return handleUserUnauthorizedError(res, "Incorrect e-mail or password");
    }

    if (!existingUser.verify) {
      return handleEmailNotVerifiedError(res);
    }

    const payload = {
      id: existingUser._id,
    };

    const token = jwt.sign(payload, process.env.AUTH_KEY, {
      expiresIn: "1h",
    });

    const user = await service.updateUser({ email }, { token });

    res.json({
      status: 200,
      statusText: "OK",
      data: {
        token,
        user: {
          email: user.email,
          subscription: user.subscription,
        },
      },
    });
  } catch (err) {
    handleValidationError(err, res, next);
  }
};

const logout = async (req, res, next) => {
  try {
    await userLogoutSchema.validateAsync(req.body);
    const { _id } = req.user;
    await service.updateUser({ _id }, { token: null });
    res.status(204).end();
  } catch (err) {
    handleValidationError(err, res, next);
  }
};

const reverifyEmail = async (req, res, next) => {
  try {
    await userReverifySchema.validateAsync(req.body);
    const { email } = req.body;
    const user = await service.getUser({ email });

    if (!user) {
      return handleUserNotFoundError(res);
    }

    if (user.verify) {
      return handleUserAlreadyBeenVerifiedError(res);
    }

    sendMail(email, user.verificationToken);

    res.json({
      status: 200,
      statusText: "OK",
      data: {
        user: {
          email,
        },
        message:
          "The message has been sent to your e-mail, if you do not see your message, please check SPAM or try again. If you are still having trouble receiving the verification e-mail, you may need to check your antivirus settings, because it can blocking the outgoing e-mail traffic",
      },
    });
  } catch (err) {
    handleValidationError(err, res, next);
  }
};

const getCurrent = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const user = await service.getUser({ _id });

    res.json({
      status: 200,
      statusText: "OK",
      data: {
        user: {
          email: user.email,
          subscription: user.subscription,
        },
      },
    });
  } catch (err) {
    console.error(err.message);
    next(err);
  }
};

const verifyEmail = async (req, res, next) => {
  try {
    const { verificationToken } = req.params;
    const user = await service.updateUser(
      { verificationToken },
      {
        verify: true,
        verificationToken: null,
      }
    );

    if (!user) {
      return handleUserNotFoundError(res);
    }

    res.json({
      status: 200,
      statusText: "OK",
      data: {
        user: {
          email: user.email,
          verify: user.verify,
        },
        message: "Verification successful",
      },
    });
  } catch (err) {
    console.error(err.message);
    next(err);
  }
};

const setSubscription = async (req, res, next) => {
  try {
    await userSubSchema.validateAsync(req.body);
    const { email } = req.user;
    const { subscription } = req.body;
    await service.updateUser({ email }, { subscription });

    res.json({
      status: 200,
      statusText: "OK",
      data: {
        user: {
          email,
          subscription,
        },
      },
    });
  } catch (err) {
    handleValidationError(err, res, next);
  }
};

const updateAvatar = async (req, res, next) => {
  try {
    const { pubId, email } = req.user;
    const { originalname, path: tmpFile } = req.file;
    await userAvatarSchema.validateAsync(originalname);

    try {
      const avatar = await Jimp.read(tmpFile);
      const files = await fs.readdir(storeAvatars);

      for (const file of files) {
        if (file.startsWith(pubId)) {
          await fs.rm(path.join(storeAvatars, file));
        }
      }

      avatar.resize(250, 250);
      const avatarName = `${pubId}_${originalname}`;
      await avatar.writeAsync(path.join(storeAvatars, avatarName));
      await fs.rm(tmpFile);
      const avatarURL = path.join(
        `http://localhost:${process.env.PORT}`,
        "avatars",
        avatarName
      );
      await service.updateUser({ email }, { avatarURL });

      res.json({
        status: 200,
        statusText: "OK",
        data: {
          user: {
            email,
            avatarURL,
          },
        },
      });
    } catch (err) {
      await fs.rm(tmpFile);
      handleUpdateAvatarError(err, res);
    }
  } catch (err) {
    handleValidationError(err, res, next);
  }
};

const usersController = {
  register,
  login,
  logout,
  reverifyEmail,
  getCurrent,
  verifyEmail,
  setSubscription,
  updateAvatar,
};

export default usersController;
