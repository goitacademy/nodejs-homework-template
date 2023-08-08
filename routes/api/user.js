const fs = require('fs').promises;
const express = require("express");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const Jimp = require("jimp");
const path = require("path");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();
const jwtSecret = process.env.JWT_SECRET;

const loginHandler = require("../../auth/loginHandler");
const { auth } = require("../../auth/passportStrategy.js")
const userControllers = require("../../controllers/users.js");

const storeAvatar = path.join(process.cwd(), "tmp");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, storeAvatar);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  limits: 1048576,
});

const upload = multer({ storage });

require("dotenv").config();

const router = express.Router();

const { User, userValidationSchema } = require("../../models/user");

router.post("/signup", async (req, res, next) => {
  const { error } = userValidationSchema.validate(req.body);
  const { email, password } = req.body;
  if (error) {
    return res.status(409).json(error.details[0].message);
  }

  const user = await User.findOne({ email });

  if (user) {
    return res.status(409).json({
      status: "error",
      code: 409,
      message: "Email id already in use",
      data: "Conflict",
    });
  }

  try {
    const user = await userControllers.createUser(email, password);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).send("Something went wrong");
  }
});

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      status: "error",
      code: 400,
      message: "Incorrect login or password",
      data: "Bad request",
    });
  }

  try {
    const token = await loginHandler(email, password);

    const user = await User.findOne({ email });

    if (user && !user.verify) {
      return res.status(403).json({
        status: "error",
        code: 403,
        message: "Account not verified",
        data: "forbidden",
      });
    }
    return res.status(200).send(token);
  } catch (err) {
    return res.status(401).send(err);
  }
});

router.get("/logout", auth, async (req, res) => {
  try {
    const { token } = req.headers.authorization;
    const verify = jwt.verify(token, jwtSecret);
    const user = await userControllers.logout(verify);
    res.status(204).send("Logout success", user);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

router.get("/current", auth, async (req, res) => {
  try {
    const { token } = req.user;
    const user = await userControllers.getUserByToken(token);

    if (!user) {
      return res.status(401).json({ message: "Not authorized" });
    }
    return res.status(200).json(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  async (req, res, next) => {
    try {
      const { _id } = req.user;
      const { path: temporaryName, originalname } = req.file;
      const fileName = path.join(storeAvatar, originalname);

      fs.rename(temporaryName, fileName);

      const img = await Jimp.read(fileName);
      await img.autocrop().cover(250, 250).quality(72).writeAsync(fileName);

      fs.rename(
        fileName,
        path.join(process.cwd(), "public/avatars", originalname)
      );

      const avatarURL = path.join(
        process.cwd(),
        "public/avatars",
        originalname
      );

      const cleanAvatarURL = avatarURL.replace(/\s/g, "/");
      const user = await userControllers.updateAvatar(_id, cleanAvatarURL);

      res.status(200).json(user);
    } catch (err) {
      next(err);
      return res.status(500).send("Server error");
    }
  }
);
router.post("/verify", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).send("Missing required filed mail");
  }
  try {
    const user = await userControllers.getUserByEmail(email);
    if (!user) {
      return res.status(404).send("User not found");
    }
    if (user.verify) {
      return res.status(400).send("Verification has already been passed");
    }

    const authVerify = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: authVerify,
    });

    const sendEmail = async () => {
      const info = await transporter.sendMail({
        from: { name: "Ewelina", address: "foo@example.com" },
        to: user.email,
        subject: `Verification ${new Date().toISOString()}`,
        text: "Hello",
        html: userControllers.templateHtml(),
      });
      const previewUrl = nodemailer.getTestMessageUrl(info);
      console.log(previewUrl);
    };

    await transporter.sendMail(sendEmail);
    res.status(200).send("Verification email sent");
  } catch (err) {
    return res.status(500).send("Server error");
  }
});

router.get("/verify/:verificationToken", async (req, res) => {
  try {
    const { verificationToken } = req.params;
    const user = await userControllers.verifyUser(verificationToken);

    if (user) {
      return res.status(200).send("Verification succesfull");
    } else {
      return res.status(404).send("User not found");
    }
  } catch (err) {
    return res.status(500).send("Server error");
  }
});
module.exports = router;