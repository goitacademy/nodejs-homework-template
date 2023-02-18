// const { Conflict } = require("http-errors");
const bcrypt = require("bcryptjs");
const { User } = require("../../models");
const gravatar = require("gravatar");
const { sendEmail } = require("../../helpers");
const { randomUUID } = require("crypto");

const signup = async (req, res, next) => {
  try {
    const { email, password, subscription } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      res.status(409).json({
        status: "error",
        code: 409,
        message: `User with ${email} already exist `,
      });
      
    }
    const verificationToken = randomUUID();
    const avatarURL = gravatar.url(email);
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    

    await User.create({
      email,
      password: hashPassword,
      subscription,
      avatarURL,
      verificationToken,
    });
    await User.save();
    const verifySendMail = {
      to: email,
      subject: "Confirm of email registration",
      html: `<a href ="http://localhost:3000/api/users/verify/${verificationToken}" target="_blank">Click to confirm of email registration</a>`,
    };

    await sendEmail(verifySendMail);

    res.status(201).json({
      status: 'success',
    code: 201,
    data: {
      user: {
        avatarURL,
        email,
        subscription,
        verificationToken,
      },
    }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = signup;
