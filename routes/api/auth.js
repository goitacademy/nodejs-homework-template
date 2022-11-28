const express = require("express");
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const path = require("path");
const fs = require("fs/promises");
const jimp = require("jimp");
const { nanoid } = require("nanoid");

const User = require("../../models/user");
const { RequestError, sendMail } = require("../../assistant");
const { authorize, upload } = require("../../middlewares");

const router = express.Router();

const userRegisterSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().required(),
  subscription: Joi.string().valid("starter", "pro", "business"),
});

const userLoginSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().required(),
});

const verifyEmailSchema = Joi.object({
  email: Joi.string().required(),
});

const { SECRET_KEY } = process.env;

router.post("/users/signup", async (req, res, next) => {
  try {
    const { error } = userRegisterSchema.validate(req.body);
    if (error) {
      throw RequestError(400, "Error from Joi or another validation library");
    }

    const { email, password, subscription } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw RequestError(409, "This email is already in use");
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);
    const verificationToken = nanoid();
    const result = await User.create({
      email,
      password: hashPassword,
      subscription,
      avatarURL,
      verificationToken,
    });

    const mail = {
      to: email,
      subject: "Site registration confirmation",
      html: `<a target="_blank" href="http://localhost:3000/api/users/verify/:${verificationToken}">Verify Email</a>`,
    };

    await sendMail(mail);
    res.status(201).json({
      email: result.email,
      subscription: result.subscription,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/users/verify/:verificationToken", async (req, res, next) => {
  try {
    const { verificationToken } = req.params;
    const user = await User.findOne({ verificationToken });
    if (!user) {
      throw RequestError(404, "Not Found");
    }

    await User.findByIdAndUpdate(user._id, {
      verificationToken: "",
      verify: true,
    });
    res.json({ message: "Verification successful" });
  } catch (error) {
    next(error);
  }
});

router.post("/users/verify", async (req, res, next) => {
  try {
    const { error } = verifyEmailSchema.validate(req.body);
    if (error) {
      throw RequestError(400, "Missing required field email");
    }

    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw RequestError(400, "Verification has already been passed");
    }

    const mail = {
      to: email,
      subject: "Site registration confirmation",
      html: `<a target="_blank" href="http://localhost:3000/api/users/:${user.verificationToken}">Verify Email</a>`,
    };

    await sendMail(mail);
    res.json({
      message: "Verification email sent",
    });
  } catch (error) {
    next(error);
  }
});

router.post("/users/login", async (req, res, next) => {
  try {
    const { error } = userLoginSchema.validate(req.body);
    if (error) {
      throw RequestError(400, "Error from Joi or another validation library");
    }

    const { email, password } = req.body;
    const user = await User.findOne({ email });

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!user || !passwordCompare) {
      throw RequestError(401, "Email or password is wrong");
    }
    if (!user || !passwordCompare) {
      throw RequestError(401, "Email or password is wrong");
    }
    const payload = {
      id: user._id,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
    await User.findByIdAndUpdate(user._id, { token });
    res.json({
      token,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/users/logout", authorize, async (req, res, next) => {
  try {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: "" });
    res.status(204).json({ message: "No content" });
  } catch (error) {
    next(error);
  }
});

router.get("/users/current", authorize, (req, res, next) => {
  try {
    const { email, subscription } = req.user;
    res.status(200).json({
      email,
      subscription,
    });
  } catch (error) {
    next(error);
  }
});

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

router.patch(
  "/users/avatars",
  authorize,
  upload.single("avatar"),
  async (req, res, next) => {
    try {
      const { _id } = req.user;
      const { path: tmpUpload } = req.file;
      const extention = tmpUpload.split(".").pop();

      const newAvatar = `${String(_id)}.${extention}`;

      const avatarURL = path.join("avatars", newAvatar);
      const resultUpload = path.join(avatarsDir, newAvatar);

      (await jimp.read(tmpUpload)).resize(250, 250).writeAsync(tmpUpload);

      await fs.rename(tmpUpload, resultUpload);

      const result = await User.findByIdAndUpdate(
        _id,
        { avatarURL },
        { returnDocument: "after" }
      );
      res.status(200).json({ avatarURL: result.avatarURL });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
