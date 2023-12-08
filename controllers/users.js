const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, validateUser } = require("../service/schemas/userSchema");
const updateAvatar = require("./updateAvatar");
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require("uuid");
const Joi = require("joi");

async function sendVerificationEmail(user) {
  try {
    const verificationToken = user.verificationToken;
    const verificationLink = `${process.env.HOST}/api/users/verify/${verificationToken}`;

    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASSWORD,
      },
    });

    await transporter.verify();

    const message = {
      to: user.email,
      from: "m.chukhrai@gmail.com",
      subject: "Email Verification",
      html: `<p>Click the following link to verify your email: ${verificationLink}</p>`,
    };

    await transporter.sendMail(message);
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw error;
  }
}

async function registerUser(req, res, next) {
  try {
    const { error } = validateUser(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(409).json({ message: "Email in use" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    const verificationToken = uuidv4();

    const newUser = new User({
      email: req.body.email,
      password: hashedPassword,
      subscription: "starter",
      verificationToken,
    });

    await newUser.save();

    await sendVerificationEmail(newUser);

    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function loginUser(req, res, next) {
  try {
    const { error } = validateUser(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ message: "Email or password is wrong" });
    }

    if (!user.verify) {
      return res.status(400).json({ message: "Email is not yet verified" });
    }

    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Email or password is wrong" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "12h",
    });

    user.token = token;
    await user.save();

    res.status(200).json({
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function logoutUser(req, res, next) {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    if (
      req.headers.authorization.split(" ")[1].localeCompare(user.token) !== 0
    ) {
      return res
        .status(401)
        .json({ message: "Not authorized: Token mismatch" });
    }

    delete user.token;

    await user.save();

    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function getCurrentUser(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId);

    if (!user || token !== user.token) {
      return res.status(401).json({ message: "Not authorized" });
    }

    res.status(200).json({
      email: user.email,
      subscription: user.subscription,
    });
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Not authorized" });
  }
}

async function verificationToken(req, res) {
  const { verificationToken } = req.params;

  try {
    const user = await User.findOneAndUpdate(
      { verificationToken },
      { $set: { verify: true, verificationToken: null } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "Verification successful" });
  } catch (error) {
    console.error("Error verifying email:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

async function resendVerificationEmail(req, res) {
  try {
    const { email } = req.body;

    const { error } = Joi.string().email().required().validate(email);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.verify) {
      return res
        .status(400)
        .json({ message: "Verification has already been passed" });
    }

    await sendVerificationEmail(user);

    return res.status(200).json({ message: "Verification email sent" });
  } catch (error) {
    console.error("Error resending verification email:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  verificationToken,
  resendVerificationEmail,
  updateAvatar,
};
