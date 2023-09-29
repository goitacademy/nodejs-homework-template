import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Joi from "joi";
import gravatar from "gravatar";
import jimp from "jimp";
import path from "path";
import nodemailer from "nodemailer";
import { v4 as uuidv4 } from "uuid";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { User } from "../models/users.model.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const userValidationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const transporter = nodemailer.createTransport({
  host: "smtp.example.com",
  port: 587,
  secure: false,
  auth: {
    user: "your-email@example.com",
    pass: "your-password",
  },
});

const sendVerificationEmail = async (user) => {
  const verificationToken = user.verificationToken;
  const email = user.email;

  const mailOptions = {
    from: "your-email@example.com",
    to: email,
    subject: "Email Confirmation",
    text: `Click the link below to verify your email address:\n\nhttp://localhost:3001/users/verify/${verificationToken}`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

export const signUpHandler = async (req, res) => {
  try {
    const { error } = userValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json(error.details[0].message);
    }

    const existUser = await User.findOne({ email: req.body.email });
    if (existUser) {
      return res.status(400).json({ message: "Email in use!" });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const avatarURL = gravatar.url(
      req.body.email,
      { s: "100", r: "x", d: "retro" },
      true
    );

    const verificationToken = uuidv4();

    const user = new User({
      email: req.body.email,
      password: hashedPassword,
      avatarURL,
      verificationToken,
    });
    await user.save();

    await sendVerificationEmail(user);

    res.status(201).json({
      user: {
        email: user.email,
        subscription: user.subscription || "starter",
        avatarURL: user.avatarURL,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};

export const loginHandler = async (req, res) => {
  try {
    const { error } = userValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json(error.details[0].message);
    }
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ message: " Email or password is wrong" });
    }
    const isValidPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isValidPassword) {
      return res.status(401).json({ message: "Email or password is wrong" });
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    user.token = token;

    await user.save();

    return res.status(200).json({
      token: token,
      user: {
        email: user.email,
        subscription: user.subscription || "starter",
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};

export const logoutHandler = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    user.token = null;
    await user.save();
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};

export const currentHandler = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    res.json({
      email: user.email,
      subscription: user.subscription,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const uploadAvatarHandler = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Plik jest wymagany" });
    }

    res.json({
      message: "Avatar uploaded.",
      file: req.file,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

export const updateAvatarHandler = async (req, res) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Not authorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "File is required" });
    }

    const filePath = path.join(__dirname, "../tmp/", req.file.filename);
    const image = await jimp.read(filePath);
    await image.resize(250, 250).writeAsync(filePath);

    const newAvatarURL = `/avatars/${req.file.filename}`;
    await User.findByIdAndUpdate(user._id, { avatarURL: newAvatarURL });

    res.status(200).json({ avatarURL: newAvatarURL });
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: "Internal server error" });
  }
};

export const verificationHandler = async (req, res) => {
  const { verificationToken } = req.params;

  try {
    const user = await User.findOne({ verificationToken });

    if (!user) {
      return res.status(404).json({ message: " User not found" });
    }

    user.verificationToken = null;
    user.verify = true;

    await user.save();

    return res.status(200).json({ message: "Verification successful" });
  } catch (error) {
    console.error("A server error occurred:", error);
    return res.status(500).send({ message: "Server error" });
  }
};

export const validateResendEmailRequest = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "missing required field email" });
  }

  next()
};

export const resendVerificationEmailHandler = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.verify) {
      return res
        .status(400)
        .json({ message: "Verification has already been passed" });
    }

    return res.status(200).json({ message: "Verification email sent" });
  } catch (error) {
    console.error("A server error occurred:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
