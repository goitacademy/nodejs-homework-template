const bcrypt = require("bcrypt");
const crypto = require("node:crypto");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const gravatar = require("gravatar");
const User = require("../models/user");
const sendEmail = require("../helpers/sendEmail");

const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

// register new User;

async function register(req, res, next) {
  const { email, password } = req.body;

  try {
    const validationResult = registerSchema.validate(
      { email, password },
      { abortEarly: false }
    );

    if (validationResult.error) {
      return res.status(400).send({
        message: `Validation error: ${validationResult.error.message}`,
      });
    }

    const user = await User.findOne({ email: email }).exec();

    if (user !== null) {
      return res.status(409).send({ message: "Email in use" });
    }
    const avatarURL = gravatar.url(email, {
      s: "200",
      r: "pg",
      d: "identicon",
    });

    const passwordHash = await bcrypt.hash(password, 10);

    const verificationToken = crypto.randomUUID();

    await sendEmail({
      to: email,
      subject: "You were registered as a new user in our contact book",
      html: `To confirm your registration please click on the link below <a href="http://localhost:3000/api/users/verify/${verificationToken}">link</a>`,
      text: `To confirm your registration please open the link http://localhost:3000/api/users/verify/${verificationToken}`,
    });

    const newUser = await User.create({
      email,
      password: passwordHash,
      verificationToken,
      avatarURL,
    });

    res.status(201).send({
      message: "User registered successfully",
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
        verificationToken: newUser.verificationToken,
        verify: newUser.verify,
        avatarURL: newUser.avatarURL,
      },
    });
  } catch (error) {
    next(error);
  }
}

// login existing User;

async function login(req, res, next) {
  const { email, password } = req.body;

  try {
    const validation = loginSchema.validate(
      { email, password },
      { abortEarly: false }
    );

    if (validation.error) {
      return res.status(400).json({
        message: `Validation error: ${validation.error.message}`,
      });
    }

    const user = await User.findOne({ email: email }).exec();
    if (user === null) {
      return res.status(401).send({ message: "Email or password is wrong" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch === false) {
      return res.status(401).send({ message: "Email or password is wrong" });
    }

    if (user.verify !== true) {
      return res.status(401).send({ message: "Your account is not verified" });
    }

    const token = jwt.sign(
      { id: user._id, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    await User.findByIdAndUpdate(user._id, { token }).exec();

    res.send({ token });
  } catch (error) {
    next(error);
  }
}

async function current(req, res, next) {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    res.status(200).json({
      email: user.email,
      subscription: user.subscription,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// logout system;

async function logout(req, res, next) {
  try {
    await User.findByIdAndUpdate(req.user.id, { token: null }).exec();

    res.status(204).end();
  } catch (error) {
    next(error);
  }
}

// verify

async function verifyReg(req, res, next) {
  const { verificationToken } = req.params;

  try {
    const user = await User.findOne({
      verificationToken,
    }).exec();

    console.log("Received Token:", verificationToken);
    console.log("User:", user);

    if (user === null) {
      return res.status(404).send({ message: "Not found" });
    }

    await User.findByIdAndUpdate(user._id, {
      verificationToken: null,
      verify: true,
    });
    res.send({ message: "Verification successful" });
  } catch (error) {
    next(error);
  }
}

const resendEmailValidationSchema = Joi.object({
  email: Joi.string().email().required(),
});


async function resendRegEmail(req, res, next) {

  const { error } = resendEmailValidationSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { email } = req.body;

  try {
    const user = await User.findOne({ email }).exec();

    if (user === null) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.verify) {
      return res
        .status(400)
        .json({ message: "Verification has already been passed" });
    }

    await sendEmail(user.email, user.verificationToken);

    return res.status(200).json({ message: "Verification email sent" });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  register,
  login,
  current,
  logout,
  verifyReg,
  resendRegEmail,
};
