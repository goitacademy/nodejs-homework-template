const service = require("../service/index");
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const jimp = require("jimp");
const path = require("path");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const nodemailer = require("nodemailer");

require("dotenv").config();
const secret = process.env.SECRET;
const emailPass = process.env.EMAIL_PASS;

const userValidationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const subscriptionValidationSchema = Joi.object().keys({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

const avatarDir = path.join(process.cwd(), "public", "avatars");

const register = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { error } = userValidationSchema.validate(req.body);
    if (error) {
      res.status(400).json({
        status: "Bad Request",
        code: 400,
        message: error.message,
      });
      return;
    }
    const existingUser = await service.findUser({ email: email });
    if (existingUser) {
      res.status(409).json({
        status: "Conflict",
        code: 409,
        message: "Email in use",
      });
      return;
    }
    const avatar = gravatar.url(req.body.email, {
      s: "250",
      r: "pg",
      d: "wavatar",
    });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const createUser = await service.createUser({
      email: email,
      password: hashedPassword,
      avatarURL: avatar,
      verify: false,
      verificationToken: uuidv4(),
    });

    const transporter = nodemailer.createTransport({
      service: "outlook",
      secure: false,
      auth: {
        user: "goitnodejs2023@outlook.com",
        pass: emailPass,
      },
    });

    const html = `<p>Click on the link below to verify your account</p>
      <a href='http://localhost:3000/api/users/verify/${createUser.verificationToken}' target='_blank'>VERIFY</a>`;

    const emailOptions = {
      from: "goitnodejs2023@outlook.com",
      to: createUser.email,
      subject: "Verification email",
      text: "Mail with verification link",
      html,
    };

    res.status(201).json({
      status: "Created",
      code: 201,
      data: {
        user: {
          email: createUser.email,
          subscription: createUser.subscription,
        },
      },
    });
    await transporter.sendMail(emailOptions);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { error } = userValidationSchema.validate(req.body);
    if (error) {
      res.status(400).json({
        status: "Bad Request",
        code: 400,
        message: error.message,
      });
      return;
    }
    const user = await service.findUser({ email: email });
    if (!user) {
      res.status(401).json({
        status: "Unauthorized",
        code: 401,
        message: "Email or password is wrong",
      });
      return;
    }
    if (!user.verify) {
      res.status(401).json({
        code: 401,
        message: "Email is not verified",
      });
      return;
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      res.status(401).json({
        status: "Unauthorized",
        code: 401,
        message: "Email or password is wrong",
      });
      return;
    }
    const token = jwt.sign({ userId: user._id }, secret, { expiresIn: "2h" });
    const loginUser = await service.updateUser(email, { token: token });
    res.status(200).json({
      status: "OK",
      code: 200,
      data: {
        token: loginUser.token,
        user: {
          email: loginUser.email,
          subscription: loginUser.subscription,
          avatarURL: loginUser.avatarURL,
        },
      },
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
const logout = async (req, res) => {
  const user = req.user;
  try {
    await service.updateUser(user.email, { token: null });
    res.status(204).json({
      status: "OK",
      code: 204,
      message: "Logged out",
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
const current = async (req, res) => {
  const user = req.user;
  res.status(200).json({
    status: "OK",
    code: 200,
    data: {
      email: user.email,
      subscription: user.subscription,
      avatarURL: user.avatarURL,
    },
  });
};

const subscription = async (req, res) => {
  const user = req.user;
  const { subscription } = req.body;
  try {
    const { error } = subscriptionValidationSchema.validate(req.body);
    if (error) {
      res.status(400).json({
        status: "Bad Request",
        code: 400,
        message: error.message,
      });
      return;
    }
    const updatedUser = await service.updateUser(user.email, {
      subscription: subscription,
    });
    res.status(200).json({
      status: "OK",
      code: 200,
      message: "User subscription updated",
      data: {
        email: updatedUser.email,
        subscription: updatedUser.subscription,
      },
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
const avatar = async (req, res) => {
  const user = req.user;
  try {
    if (!req.file) {
      res.status(400).json({
        status: "Bad Request",
        code: 400,
        message: "File not provided",
      });
      return;
    }

    const img = await jimp.read(req.file.path);
    await img
      .autocrop()
      .cover(
        250,
        250,
        jimp.HORIZONTAL_ALIGN_CENTER | jimp.VERTICAL_ALIGN_MIDDLE
      )
      .writeAsync(req.file.path);

    await service.updateUser(user.email, {
      avatarURL: `/avatars/${req.file.filename}`,
    });
    await img.writeAsync(path.join(avatarDir, req.file.filename));

    res.status(200).json({
      status: "OK",
      code: 200,
      message: "New avatar uploaded",
      data: {
        avatarURL: user.avatarURL,
      },
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const emailVerify = async (req, res) => {
  try {
    const user = await service.findUser({
      verificationToken: req.params.verificationToken,
    });
    if (user.verify) {
      res.status(400).json({
        status: "Bad request",
        code: 400,
        message: "Verification has already been passed",
      });
      return;
    }

    if (!user) {
      return res.status(404).json({
        status: "Not found",
        code: 404,
        message: "User not found",
      });
    }
    if (user.verificationToken !== req.params.verificationToken) {
      console.log(user.verificationToken, req.params.verificationToken);
      return res.status(404).json({
        status: "Not found",
        code: 404,
        message: "User not found",
      });
    }
    await service.updateUser(user.email, {
      verify: true,
      verificationToken: null,
    });
    return res.status(200).json({
      status: "OK",
      code: 200,
      message: "Verification successful",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const repeatVerifyEmail = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({
        status: "Bad request",
        code: 400,
        message: "Missing required field email",
      });
    }

    const user = await service.findUser({ email: email });
    if (!user) {
      return res.status(404).json({
        status: "Not found",
        code: 404,
        message: "User not found",
      });
    }

    if (user.verify) {
      return res.status(400).json({
        status: "Bad request",
        code: 404,
        message: "Verification has already been passed",
      });
    }

    const transporter = nodemailer.createTransport({
      service: "outlook",
      secure: false,
      auth: {
        user: "goitnodejs2023@outlook.com",
        pass: emailPass,
      },
    });

    const html = `<p>Click on the link below to verify your account</p>
      <a href='http://localhost:3000/api/users/verify/${user.verificationToken}' target='_blank'>VERIFY</a>`;

    const emailOptions = {
      from: "goitnodejs2023@outlook.com",
      to: user.email,
      subject: "Verification email",
      text: "Mail with verification link",
      html,
    };

    res.status(200).json({
      status: "OK",
      code: 200,
      message: "Verification email sent",
    });
    await transporter.sendMail(emailOptions);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  register,
  login,
  logout,
  current,
  subscription,
  avatar,
  emailVerify,
  repeatVerifyEmail,
};
