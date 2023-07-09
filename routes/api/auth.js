const express = require("express");
const { validateUser } = require("../../utils/validator");
const User = require("../../models/user");
const {
  createHashPassword,
  compareResult,
} = require("../../utils/passwordHash");
const { KEY } = process.env;
const jwt = require("jsonwebtoken");
const validateToken = require("../../utils/tokenValidator");
const httpErr = require("../../utils/HTTPErr");
const path = require("path");
const fs = require("fs/promises");
const jimp = require("jimp");
const gravatar = require("gravatar");
const upload = require("../../utils/download");
const validateEmail = require("../../utils/validateEmail");
const sendEmail = require("../../utils/sendEmail");
const { BASE_URL } = process.env;
const { v4 } = require("uuid");

const router = express.Router();

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

router.post("/register", validateUser(), async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      throw httpErr(409, "Email in use");
    }

    const hashPassword = await createHashPassword(password);
    const avatarURL = gravatar.url(email);
    const verificationToken = v4();

    const newUser = await User.create({
      ...req.body,
      password: hashPassword,
      avatarURL,
      verificationToken,
    });

    const verifyEmail = {
      to: email,
      subject: "Verify email",
      html: `<a target="_blank" href="${BASE_URL}/users/verify/${verificationToken}">Click verify email</a>`,
    };

    await sendEmail(verifyEmail);

    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
});

const signToken = (id) => jwt.sign({ id }, KEY, { expiresIn: "31d" });

router.post("/login", validateUser(), async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      throw httpErr(401, "Email or password is wrong");
    }

    if (!user.verify) {
      throw httpErr(401, "Email not verified");
    }

    const comparePassword = await compareResult(password, user.password);

    if (!comparePassword) {
      throw httpErr(401, "Email or password is wrong");
    }

    const token = signToken(user._id);

    await User.findByIdAndUpdate(user._id, { token });

    res.json({
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get("/current", validateToken, async (req, res) => {
  const { email, subscription } = req.user;

  res.json({
    email,
    subscription,
  });
});

router.post("/logout", validateToken, async (req, res) => {
  const { _id } = req.user;

  await User.findByIdAndUpdate(_id, { token: null });

  res.status(204).json();
});

router.patch(
  "/avatars",
  validateToken,
  upload.single("avatar"),
  async (req, res, next) => {
    try {
      if (!req.file) {
        throw httpErr(400, "Missing 'avatar' field");
      }

      const img = await jimp.read(req.file.path);

      await img
        .autocrop()
        .cover(
          250,
          250,
          jimp.HORIZONTAL_ALIGN_CENTER || jimp.VERTICAL_ALIGN_MIDDLE
        )
        .writeAsync(req.file.path);

      const { path: tempUpload, originalname } = req.file;

      const { _id } = req.user;

      const fileName = `${_id}_${originalname}`;

      const resultUpload = path.join(avatarsDir, fileName);

      await fs.rename(tempUpload, resultUpload);

      const avatarURL = path.join("avatars", fileName);

      await User.findByIdAndUpdate(_id, { avatarURL });

      res.json({ avatarURL });
    } catch (error) {
      next(error);
    }
  }
);

router.post("/verify", validateEmail(), async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      throw httpErr(401, "Email is wrong");
    }

    if (user.verify) {
      throw httpErr(400, "Verification has already been passed");
    }

    const verifyEmail = {
      to: email,
      subject: "Verify email",
      http: `<a target="_blank" href="${BASE_URL}/users/verify/${user.verificationToken}">Click verify email</a>`,
    };

    await sendEmail(verifyEmail);

    res.json({
      message: "Verification email sent",
    });
  } catch (error) {
    next(error);
  }
});

router.get("/verify/:verificationToken", async (req, res, next) => {
  try {
    const { verificationToken } = req.params;

    const user = await User.findOne({ verificationToken });

    if (!user) {
      throw httpErr(404, "User not found");
    }

    await User.findByIdAndUpdate(user._id, {
      verificationToken: null,
      verify: true,
    });

    res.json({
      message: "Verification successful",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
