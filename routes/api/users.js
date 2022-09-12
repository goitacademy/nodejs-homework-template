const express = require("express");
const fs = require("fs/promises");
const path = require("path");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nanoid = require("nanoid");
const Joi = require("joi");
const User = require("../../models/users");
const createError = require("../../helpers/createError");
const authorize = require("../../middlewares/authorization");
const upload = require("../../middlewares/upload");
const sendMail = require("../../helpers/sendMail");
const gravatar = require("gravatar");
const jimp = require("jimp");
const { SECRET_KEY } = process.env;

const usersSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const veriyEmailSchema = Joi.object({
  email: Joi.string().required(),
});

router.post("/signup", async (req, res, next) => {
  try {
   console.log(User)
    const { error } = usersSchema.validate(req.body);
    
    if (error) {
      throw createError(400, "Bad request");
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    console.log(user)
    if (user) {
      throw createError(409, "Email already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const gravatarUrl = gravatar.url(email);
    const verificationToken = nanoid.nanoid();
    
    const mail = {
      to: email,
      subject: "Email verification",
      html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Click the link co confirm your email</a>`,
    };
    await sendMail(mail);
    const result = await User.create({
      email,
      password: hashedPassword,
      avatarURL: gravatarUrl,
      verificationToken,
    });

    res.status(201).json({
      email: result.email,
      subscription: result.subscription,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { error } = usersSchema.validate(req.body);
    if (error) {
      throw createError(400, "Bad request");
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw createError(401, "Email or password is wrong");
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      throw createError(401, "Email or password is wrong");
    }
    if (!user.verify) {
      throw createError(401, "Email is not verified");
    }
    const payload = {
      id: user.id,
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });

    await User.findByIdAndUpdate(user.id, { token });
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

router.get("/logout", async (req, res, next) => {
  try {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user) {
      throw createError(401, "Not authorized");
    }
    await User.findByIdAndUpdate(id, { token: null });
    res.status(204).json({ message: "No content" });
  } catch (error) {
    next(error);
  }
});

router.get("/current", authorize, async (req, res, next) => {
  const { email, subscription } = req.user;
  res.json({
    email,
    subscription,
  });
});

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

router.patch(
  "/avatars",
  authorize,
  upload.single("avatar"),
  async (req, res, next) => {
    try {
      const { path: tempDir, originalname } = req.file;

      const { _id } = req.user;
      const [extension] = originalname.split(".").reverse();

      const newAvatar = `${_id}.${extension}`;

      const uploadDir = path.join(avatarsDir, newAvatar);
      await fs.rename(tempDir, uploadDir);

      const avatarURL = path.join("public", "avatars", newAvatar);

      jimp
        .read(avatarURL)
        .then((image) => {
          return image.resize(250, 250).write(avatarURL);
        })
        .catch((err) => {
          console.error(err);
        });

      await User.findByIdAndUpdate(_id, { avatarURL });
      res.json({ avatarURL });
    } catch (error) {
      await fs.unlink(req.file.path);
      next(error);
    }
  }
);

router.get("/verify/:verificationToken", async (req, res, next) => {
  try {
    console.log("request is aceepted!!")
    const { verificationToken } = req.params; 
    const user = await User.findOne({ verificationToken });
    if (!user) {
      throw createError(404, "User is not found");
    }
    await User.findByIdAndUpdate(user._id, {
      verificationToken: "",
      verify: true,
    });
    res.json({
      message: "Verification successful",
    });
  } catch (error) {
    next(error);
  }
});

router.post("/verify", async (req, res, next) => {
  try {
    const { error } = veriyEmailSchema.validate(req.body);
    if (error) {
      throw createError(400, error.message);
    }
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw createError(404, "User is not found");
    }
    if (user.verify) {
      throw createError(400, "Verification has already been passed");
    }
  
    const mail = {
      to: email,
      subject: "Email verification",
      html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${user.verificationToken}">Click the link co confirm your email</a>`,
    };
    await sendMail(mail);
    res.json({
      message: "Verification email sent"
    })
  } catch (error) {
    next(error)
  }
});

module.exports = router;
