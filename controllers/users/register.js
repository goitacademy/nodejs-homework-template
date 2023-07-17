const { User } = require("../../models");
const { HttpError, sendEmail } = require("../../helpers");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");

const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw HttpError(409, "Email in use");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);
    const verificationToken = nanoid();

    const newUser = await User.create({
      ...req.body,
      password: hashedPassword,
      avatarURL,
      verificationToken,
    });

    const verifyEmail = {
      to: req.body.email,
      subject: "Verify email",
      html: `<a href=http://localhost:3000/api/auth/verify/${verificationToken}>Click verify email</a>`,
      // html: `<a target="_blank" href={process.env.BASE_URL}/api/auth/verify/${verificationToken}">Click verify email</a>`,
    };
    await sendEmail(verifyEmail);
    
    res.status(201).json({ 
      user: {
        email: newUser.email,
        subscription: "starter",
       },
      });
  } catch (error) {
    next(error);
  }
};

module.exports = register;