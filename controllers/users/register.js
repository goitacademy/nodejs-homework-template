const asyncHandler = require("express-async-handler");
const { userValidator } = require("../../utils/validation/validator");
const userModel = require("../../models/userModel");
const User = require("../../models/userModel");
const gravatar = require("gravatar");
const sgMail = require("../../utils/email/sgMail");

const generateUniqueId = asyncHandler(async (req, res) => {
  // return crypto.randomBytes(8).toString("hex");
  const {nanoid} = await require("nanoid/non-secure");
  // const id = nanoid();
  // console.log(id);
  return nanoid();
});

const register = asyncHandler(async (req, res) => {
  const { error } = userValidator(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  const { email, password, subscription } = req.body;
  const user = await userModel.getUser({ email });
  if (user) {
    return res.status(409).json({
      status: "error",
      code: 409,
      message: "Email is already in use",
      data: "Conflict",
    });
  }

  const avatarURL = gravatar.url(email, {
    s: "200",
    r: "pg",
    d: "mm",
  });

  const verificationToken = generateUniqueId();
  const newUser = new User({
    email,
    password,
    subscription,
    avatarURL,
    verificationToken,
  });
  newUser.setPassword(password);
  await newUser.save();
  
  if (verificationToken) {
    sgMail.sendVerificationToken(email, verificationToken);
  }
  
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      message: "Registration successful",
    },
  });  
});

module.exports = { register };
