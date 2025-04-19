const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const gravatar = require("gravatar");
const uuid = require("uuid");
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email, { s: "250", d: "retro" }, true);

    const verificationToken = uuid.v4();

    const newUser = new User({
      email,
      password: hashedPassword,
      subscription: "starter",
      avatarURL,
      verificationToken,
    });

    await newUser.save();

    const verificationLink = `${process.env.BASE_URL}/api/users/verify/${verificationToken}`;
    const msg = {
      to: email,
      from: process.env.SENDER_EMAIL,
      subject: "Verify your email",
      html: `<p>To verify your email, click the link below:</p>
             <a href="${verificationLink}">Verify Email</a>`,
    };

    await sgMail.send(msg);

    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
        avatarURL: newUser.avatarURL,
      },
    });
  } catch (error) {
    console.error("Error during user registration:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    console.log("Login attempt with email:", email);

    const user = await User.findOne({ email });
    console.log("User found:", user);

    if (!user) {
      console.log("No user found with that email.");
      return res.status(401).json({ message: "Email or password is wrong" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Email or password is wrong" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
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
    console.error("Error during login process:", error);
    res.status(500).json({ message: error.message });
  }
};

const logout = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findByIdAndUpdate(userId, { token: null });
    if (!user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    res.status(204).send();
  } catch (error) {
    console.error("Error during logout:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getCurrent = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    res.status(200).json({
      email: user.email,
      subscription: user.subscription,
    });
  } catch (error) {
    console.error("Error fetching current user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateSubscription = async (req, res) => {
  const { subscription } = req.body;

  const validSubscriptions = ["starter", "pro", "business"];
  if (!subscription) {
    return res.status(400).json({ message: "Subscription is required" });
  }
  if (!validSubscriptions.includes(subscription)) {
    return res.status(400).json({ message: "Invalid subscription value" });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { subscription },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      email: updatedUser.email,
      subscription: updatedUser.subscription,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;

  try {
    const user = await User.findOne({ verificationToken });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.verify = true;
    user.verificationToken = null;
    await user.save();

    res.status(200).json({ message: "Verification successful" });
  } catch (error) {
    console.error("Error during email verification:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const resendVerificationEmail = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.verify) {
      return res
        .status(400)
        .json({ message: "Verification has already been passed" });
    }

    const verificationLink = `${process.env.BASE_URL}/api/users/verify/${user.verificationToken}`;
    const msg = {
      to: email,
      from: process.env.SENDER_EMAIL,
      subject: "Verify your email",
      html: `<p>To verify your email, click the link below:</p>
             <a href="${verificationLink}">Verify Email</a>`,
    };

    await sgMail.send(msg);

    res.status(200).json({ message: "Verification email sent" });
  } catch (error) {
    console.error("Error during resending verification email:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  signup,
  login,
  updateSubscription,
  logout,
  getCurrent,
  verifyEmail,
  resendVerificationEmail,
};
