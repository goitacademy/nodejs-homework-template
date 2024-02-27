const service = require("../service/userService");
const { validateUser } = require("../validator/userValidator");
const User = require("../service/schemas/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const uploadFunctions = require("../config/config-multer");

const registerUser = async (req, res, next) => {
  const { error, value } = validateUser(req.body);
  const { email, password } = value;
  if (error) {
    res.status(400).json({
      status: "failure",
      code: 400,
      error: error.details,
    });
  } else {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({
        status: "error",
        code: 409,
        message: "Email is already in use",
        data: "Conflict",
      });
    } else {
      try {
        const result = await service.registerUser({ email, password });
        res.status(201).json({
          status: "success",
          code: 201,
          message: "User successfully registered!",
        });
      } catch (err) {
        console.log(err.message);
        next(err);
      }
    }
  }
};

const loginUser = async (req, res, next) => {
  const { error, value } = validateUser(req.body);
  const { email, password } = value;
  if (error) {
    res.status(400).json({
      status: "failure",
      code: 400,
      error: error.details,
    });
  }
  try {
    const user = await service.loginUser(email, password);
    const isMatch = await bcrypt.compare(password, user.password);
    if (!user || !isMatch) {
      res.status(401).json({
        status: "failure",
        code: 401,
        message: "Email or password is wrong",
      });
    }
    const token = jwt.sign({ id: user._id }, process.env.SECRET, {
      expiresIn: "1h",
    });
    await service.updateToken(user._id, token);

    res.json({
      status: "success",
      code: 200,
      message: "User successfully logged in",
      data: {
        token,
        user: { email: user.email, subscription: user.subscription },
      },
    });
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};

const logoutUser = async (req, res, mext) => {
  const userId = req.user._id;
  try {
    await service.logoutUser(userId);
    res.status(204).send();
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};

const checkCurrentUser = async (req, res, next) => {
  const userId = req.user._id;
  try {
    const user = await service.getCurrentUser(userId);
    if (!user) {
      return res.status(401).json({
        status: "failure",
        code: 401,
        message: "Not authorized",
      });
    }
    res.json({
      status: "success",
      code: 200,
      data: { email: user.email, subscription: user.subscription },
    });
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};

const updateUserSubscription = async (req, res, next) => {
  const schema = Joi.object({
    subscription: Joi.string().valid("starter", "pro", "business").required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  try {
    const userId = req.user._id;
    const { subscription } = req.body;
    const updatedUser = await service.updateSubscription(userId, subscription);

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({
      data: {
        user: {
          email: updatedUser.email,
          subscription: updatedUser.subscription,
        },
      },
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const updateUserAvatar = async (req, res, next) => {
  const userId = req.user._id;
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: "No file uploaded!" });
    }
    const newFilePath = await uploadFunctions.processAndValidateImage(
      file.path
    );
    if (!newFilePath) {
      return res.status(500).json({ message: "Error processing file" });
    }

    const avatarURL = newFilePath.replace(/\\/g, "/").split("/public/").pop();

    const updatedUser = await service.updateAvatar(userId, avatarURL);

    res.json({ avatarURL: updatedUser.avatarURL });
  } catch (err) {
    console.log(error.message);
    next(err);
  }
};

const verifyUser = async (req, res) => {
  const verifiedUser = await service.verifyUser(req.params.verificationToken);
  if (!verifiedUser) {
    return res.status(404).send({ message: "User not found" });
  }
  res.status(200).send({ message: "Verification successful" });
};

const resendVerificationEmail = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).send({ message: "Missing required field email" });
  }
  const user = await service.resendVerificationEmail(email);
  if (!user) {
    return res
      .status(400)
      .send({
        message: "Verification has already been passed or user not found",
      });
  }
  res.status(200).send({ message: "Verification email sent" });
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  checkCurrentUser,
  updateUserSubscription,
  updateUserAvatar,
  verifyUser,
  resendVerificationEmail,
};
