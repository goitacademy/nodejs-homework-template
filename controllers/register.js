const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const crypto = require("node:crypto");
const { User } = require("../models/user");
const { RequestError, sendEmail } = require("../helpers");
const { BASE_URL } = process.env;
const register = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw RequestError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationCode = crypto.randomUUID();
  
  const newUser = await User.create({ 
    ...req.body,
     password: hashPassword, 
     avatarURL, 
     verificationToken: verificationCode,
    });
    
  const verifyEmail = {
      to: email,
      suject: "Verify email",
      html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationCode}">Click verify email</a>`,
    };
  
  await sendEmail(verifyEmail);
  res.status(201).json({
    User: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

module.exports = register;