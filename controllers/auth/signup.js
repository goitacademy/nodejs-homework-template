const { User } = require("../../models");
const { joiRegistrationSchema } = require("../../models");
const createError = require("http-errors");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { v4 } = require("uuid");
const sendEmail = require("../../services/sendgrid");

const signup = async (req, res, next) => {
  try {
    const { error } = joiRegistrationSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }

    const { email, password, subscription } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      throw new createError.Conflict(`This ${email} email in use`);
    }

    const verificationToken = v4();

    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    const avatarURL = gravatar.url(email);

    User.create({
      email,
      password: hashPassword,
      subscription,
      avatarURL,
      verificationToken,
    });

    const mail = {
      to: email,
      subject: "Confirmation of the registration",
      html: `<a target=_blank href="http://localhost:3000/users/verify/${verificationToken}">Confirm your email</a>`,
    };

    await sendEmail(mail);

    res.status(201).json({
      status: "success",
      code: 201,
      user: {
        result: {
          email,
          password,
          subscription,
          verificationToken,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = signup;
