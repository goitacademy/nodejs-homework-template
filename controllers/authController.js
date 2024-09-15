const gravatar = require("gravatar");
const {
  registerUser,
  loginUser,
  logoutUser,
  verifyUser,
  resendVerificationEmail,
} = require("../services/authService");
const User = require("../services/schemas/userSchema");

const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const avatarURL = gravatar.url(email, { s: "200", d: "retro" }, true);
    const newUser = await registerUser({
      username,
      email,
      password,
      avatarURL,
    });
    return res.status(201).json({
      message: "User created",
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
        avatarURL: newUser.avatarURL,
      },
    });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const { token, user } = await loginUser({ email, password });
    return res.json({ token, user });
  } catch (err) {
    if (err.message === "Email has not been verified! Please check your inbox.") {
      return res.status(401).json({ message: err.message });
    }
    next(err);
  }
};

const logout = async (req, res, next) => {
  try {
    const userId = req.user._id;
    await logoutUser(userId);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

const getCurrentUser = async (req, res, next) => {
  try {
    const { email, subscription } = req.user;
    res.status(200).json({ email, subscription });
  } catch (error) {
    next(error);
  }
};

const verifyEmail = async (req, res, next) => {
  const { verificationToken } = req.params;
  
  try {
    const user = await verifyUser(verificationToken);
    if (!user) {
      const alreadyVerifiedUser = await User.findOne({ verificationToken: null, verify: true, email: req.body.email });
      
      if (alreadyVerifiedUser) {
        return res.status(400).json({ message: "Email has already been verified!" });
      }
      return res.status(404).json({ message: "User not found!" });
    }
    res.status(200).json({ message: "Verification succesful!" });
  } catch (err) {
    next(err);
  }
};

const resendVerificationEmailHandler = async (req, res, next) => {
  const { email } = req.body;

  if(!email) {
    return res.status(400).json({ message: "Missing required field email!" });
  }
  try {
    const result = await resendVerificationEmail(email);
    if (result === "alreadyVerified") {
      return res.status(400).json({ message: "Verification has already been passed!" });
    }
    res.status(200).json({ message: "Verification email sent!" });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  signup,
  login,
  logout,
  getCurrentUser,
  verifyEmail,
  resendVerificationEmailHandler,
};
