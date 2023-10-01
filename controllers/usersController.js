import Joi from "joi";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  getUserById,
  addNewUser,
  getUserByMail,
  updateToken,
  updateAvatar,
  findEmailToken,
  confirmEmail,
  isUserInDB,
  findByEmail,
} from "../dataBase/db.js";
import dotenv from "dotenv";
import gravatar from "gravatar";
import { join } from "path";
import fs from "fs/promises";
import Jimp from "jimp";
import { STORE_AVATARS_DIRECTORY } from "../middlewares/multer.js";
import { nanoid } from "nanoid";
import sgMail from "@sendgrid/mail";

dotenv.config();

const { JWT_SECRET, SENGRID_API_KEY } = process.env;

sgMail.setApiKey(SENGRID_API_KEY);

const userValidationSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: true } })
    .required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
});

const emailValidationSchema = Joi.string()
  .email({ minDomainSegments: 2, tlds: { allow: true } })
  .required();

const message = (to, token) => {
  return {
    to,
    from: "kursnode12345@gmail.com",
    subject: "Your newsletter",
    text: `/users/verify/${token}`,
    html: `<strong>"Hello!!!"</strong>`,
  };
};

export const signUp = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    Joi.attempt({ email, password }, userValidationSchema);
  } catch (error) {
    return res.status(400).send(error.details[0].message);
  }
  const isUserAlreadyinDB = await getUserByMail(email);

  if (isUserAlreadyinDB) {
    return res.status(409).send("Email in use");
  }

  const hashedPassword = await bcrypt.hash(password, 6);
  try {
    const newUser = await addNewUser({
      email,
      password: hashedPassword,
      avatarURL: gravatar.url(email),
      verificationToken: nanoid(),
    });
    return res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
  } catch (error) {
    return res.status(400).send(error);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    Joi.attempt({ email, password }, userValidationSchema);
  } catch (error) {
    return res.status(400).send(error.details[0].message);
  }

  const user = await getUserByMail(email);
  if (!user) return res.status(401).send("Email or password is wrong");

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword)
    return res.status(401).send("Email or password is wrong");

  const payload = { id: user._id };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

  await updateToken(user._id, token);
  return res.status(201).send({
    token: token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

export const logout = async (req, res, next) => {
  const userId = req.user._id;
  try {
    await updateToken(userId, null);
    return res.status(204).send("No content");
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const current = async (req, res, next) => {
  const userId = req.user._id;
  try {
    const currentUser = await getUserById(userId);

    if (!currentUser)
      return res.status(401).json({ message: "Not authorized" });

    return res.status(200).json({
      email: currentUser.email,
      subscription: currentUser.subscription,
    });
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const uploadAvatar = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: "No file provided" });
    }

    Jimp.read(file.path)
      .then((picture) => {
        return picture
          .resize(250, 250)

          .write(file.path);
      })
      .catch((error) => {
        console.error(error);
      });

    const avatarName = file.filename;

    const avatarPath = join(STORE_AVATARS_DIRECTORY, avatarName);
    await fs.rename(file.path, avatarPath);

    const avatarURL = `/avatars/${avatarName}`;

    await updateAvatar(user._id, avatarURL);

    res.status(200).json({ avatarURL });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const userEmailVerify = async (req, res, next) => {
  const verifyToken = req.params.verificationToken;

  if (verifyToken.length === 0) return res.status(400).send("Bad request");

  const user = await findEmailToken(verifyToken);

  if (user.length === 0) return res.status(400).send("User not found");

  const userVerify = user[0].verify;
  const userId = user[0]._id;

  if (userVerify) return res.status(400).send("Email was already confirmed");

  try {
    await confirmEmail(userId).then(() =>
      res.status(200).send("Verification successful")
    );
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const userReplyEmail = async (req, res, next) => {
  const { email } = req.body;
  if (!email) res.status(400).send("You don't sent any email");

  try {
    Joi.attempt(email, emailValidationSchema);
  } catch (error) {
    return res.status(400).send(error.details[0].message);
  }

  if (!(await isUserInDB(email))) return res.status(404).send("Not Found");

  try {
    const user = await findByEmail(email);

    if (user[0].verify)
      return res.status(400).send("Verification has already been passed");
    else {
      sgMail
        .send(message(email, user[0].verificationToken))
        .then(() => res.status(200).send("Verification email sent"));
    }
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};
