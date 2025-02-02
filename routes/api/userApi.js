import { Router } from "express";
import Joi from "joi";
import { UserModel } from "../../models/users/userShema.js";
import { upload } from "../../middlewares/upload.js";
import { auth } from "../../middlewares/auth.js";
import dotenv from "dotenv";
import gravatar from "gravatar";
const Jimp = (await import("jimp")).default;
import {
  TEMP_DIRECTORY,
  AVATARS_DIRECTORY,
} from "../../config/configDirectory.js";
import path from "path";
import fs from "node:fs/promises";
dotenv.config();
const secret = process.env.JWT_SECRET_KEY;
import jwt from "jsonwebtoken";

const userSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "any.required": "missing required email field",
    "string.empty": "missing required email field",
    "string.email": "email must be a valid email address",
  }),
  password: Joi.string()
    .min(8)
    .max(32)
    .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]+$/) // Co najmniej jedna litera i jedna cyfra
    .required()
    .messages({
      "any.required": "missing required password field",
      "string.empty": "missing required password field",
      "string.min": "password must be at least 8 characters long",
      "string.max": "password must not exceed 32 characters",
      "string.pattern.base":
        "password must contain at least one letter and one number",
    }),
});

const router = Router();

router.post("/users/signup", async (req, res, next) => {
  console.log(`Adding USER.... [usersApi.js]`.yellow);
  const { error } = userSchema.validate(req.body);
  if (error) {
    const message = error.details[0].message;
    return res.status(400).json({ message });
  }
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email }).lean();
  if (user) {
    console.log(`Email ${email} is in use [usersApi.js]`.bgRed);
    return res.status(409).json({ message: `Email ${email} is in use` });
  }
  try {
    const avatarURL = gravatar.url(email, { s: "200", d: "retro" }, true);
    const user = new UserModel({ email, avatarURL });
    user.setPassword(password);

    await user.save();
    console.log(`Added USER: ${user.email} [usersApi.js]`.bgGreen);
    console.log(`Added USER:AVATAR: ${user.avatarURL} [usersApi.js]`.bgGreen);
    return res.status(201).json({
      email: user.email,
      subscription: user.subscription,
      avatarURL: user.avatarURL,
    });
  } catch (error) {
    console.error(`Error add USER: ${error} [usersApi.js]`.bgRed);
    next(error);
  }
});

router.post("/users/login", async (req, res, next) => {
  try {
    console.log(`Login USER.... [usersApi.js]`.yellow);
    const { error } = userSchema.validate(req.body);
    if (error) {
      const message = error.details[0].message;
      return res.status(400).json({ message });
    }

    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user || !user.validPassword(password)) {
      return res.status(400).json({
        message: "Email or password is wrong",
      });
    }
    const payload = {
      id: user.id,
      email: user.email,
    };
    const token = jwt.sign(payload, secret, { expiresIn: "1h" });

    user.token = token;
    await user.save();
    res.status(200).json({
      data: {
        token,
        user: {
          email: user.email,
          subscription: user.subscription,
          avatarURL: user.avatarURL,
        },
      },
    });
  } catch (error) {
    console.error(`Error login USER: ${error} [usersApi.js]`.bgRed);
    next(error);
  }
});

router.post("/users/logout", auth, async (req, res, next) => {
  try {
    console.log(`Logout USER.... [usersApi.js]`.yellow);
    const user = req.user;
    if (!user) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }
    user.token = null;
    await user.save();

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

router.get("/users/current", auth, async (req, res, next) => {
  try {
    console.log(`Getting USER.... [usersApi.js]`.yellow);
    const user = req.user;
    if (!user) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }
    return res.status(200).json({
      email: user.email,
      subscription: user.subscription,
      avatarURL: user.avatarURL,
    });
  } catch (error) {
    next(error);
  }
});

router.patch(
  "/users/avatars",
  auth,
  upload.single("avatar"),
  async (req, res, next) => {
    try {
      const { path: tmpPath, originalname } = req.file;
      const mime = req.file.mimetype;
      console.log("Uploaded file size:", req.file.size);
      if (!mime.includes("image")) {
        await fs.unlink(tmpPath);
        return res.status(400).json({ message: "File is not an image" });
      }
      const { _id } = req.user;
      console.log("tmpPath: ", tmpPath);
      console.log("TEMP_DIRECTORY: ", TEMP_DIRECTORY);
      console.log("AVATARS_DIRECTORY: ", AVATARS_DIRECTORY);

      const uniqueFilename = `${_id}-${originalname}`;
      const avatarPath = path.join(AVATARS_DIRECTORY, uniqueFilename);
      console.log("avatarPath: ", avatarPath);

      const avatar = await Jimp.read(tmpPath);
      console.log("Image successfully loaded by Jimp:", tmpPath);

      const { bitmap } = avatar;
      console.log("Loaded image dimensions:", bitmap.width, bitmap.height);
      avatar.resize(250, 250);
      await avatar.write(avatarPath);
      console.log("Image successfully saved to:", avatarPath);
      await fs.unlink(tmpPath);

      const avatarURL = `/avatars/${uniqueFilename}`;
      await UserModel.findByIdAndUpdate(_id, { avatarURL });

      res.status(200).json({ avatarURL });
    } catch (error) {
      next(error);
    }
  }
);
export const usersRouter = router;
