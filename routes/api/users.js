const express = require("express");
const Joi = require("joi");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../../service/schemas/users");
const auth = require("../../config/passport/auth");
const { getUser } = require("../../models/users");

const gravatar = require("gravatar");

const multer = require("multer");
const Jimp = require("jimp");
const path = require("path");

const fs = require('fs').promises;


const router = express.Router();


const avatarUpload = multer({
  dest: "tmp",
  limits: { fileSize: 5 * 1024 * 1024 }
});


const console = require("console");

require("dotenv").config();
const secret = process.env.SECRET_WORD;


const signupSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

router.post("/signup", async (req, res) => {
  try {
    const { error } = signupSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: "Validation error" });
    }

    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(409).json({ message: "Email in use" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

   
    const avatarURL = gravatar.url(req.body.email, {
      s: "250", 
      r: 'x',
      d: "retro", 
     
    });

    const user = new User({
      email: req.body.email,
      password: hashedPassword,
      subscription: "starter",
      avatarURL,
    });

    await user.save();

    res.status(201).json({
      user: {
        email: user.email,
        subscription: user.subscription,
        avatarURL: user.avatarURL

      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

router.post("/login", async (req, res) => {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Email or password is wrong" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Email or password is wrong" });
    }

    const payload = {
      id: user._id,
      email: user.email,
    };

    const token = jwt.sign(payload, secret, { expiresIn: "1h" });

    return res.status(200).json({
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/logout", auth, async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await getUser(userId);

    if (!user) {
      return res.status(401).json({
        status: "error",
        code: 401,
        message: "Unauthorized",
      });
    }

    user.token = null;
    await user.save();

    res.status(200).json({
      message: "Logout is done",
    });
    return;
  } catch (error) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: "An error occurred during logout.",
    });
  }
});

router.get("/current", auth, async (req, res) => {
  try {
    const currentUser = req.user;

    if (!currentUser) {
      return res.status(401).json({ message: "Not authorized" });
    }

    res.status(200).json({
      email: currentUser.email,
      subscription: currentUser.subscription,
      avatar: currentUser.avatarURL
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.patch(
  '/avatars',
  auth,
  avatarUpload.single('avatar'),
  async (req, res, next) => {
      try {
          const { file } = req
          if (!file) {
              return res.status(400).json({ message: 'No file provided' })
          } 
          const img = await Jimp.read(file.path)
          await img.resize(250, 250).writeAsync(file.path)

         
          const newName = `avatar_${req.user._id}${path.extname(
              file.originalname
          )}`
          const newLocation = path.join(
              __dirname,
              '../../public/avatars',
              newName
          )
          await fs.rename(file.path, newLocation)

          const avatarURL = `/avatars/${newName}`
          await User.findByIdAndUpdate(req.user._id, { avatarURL })

          res.status(200).json({ avatarURL })
      } catch (error) {
          next(error)
      }
  }
)


module.exports = router;
