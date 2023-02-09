const { User } = require("../../models/user.js");
const { RequestError, sendMail } = require("../../helpers/index.js");
const { userSchemaSignup } = require("../../schemas/validationSchemaUser.js");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");

async function signup(req, res, next) {
  try {
    const validationResult = userSchemaSignup.validate(req.body);
    const { email, password } = req.body;

    if (validationResult.error) {
      throw RequestError(404, "missing required name field");
    }

    const mailDubbing = await User.findOne({ email });
    if (mailDubbing) {
      throw RequestError(409, "Email or password already in use!");
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const avatarProfile = gravatar.url(email);

    const verificationToken = nanoid();

    const savedUser = await User.create({
      email,
      password: hashedPassword,
      avatarURL: avatarProfile,
      verify: false,
      verificationToken,
    });

    await sendMail({
      to: email,
      subject: "Confirm registration",
      html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Confirm your email</a>`,
    });

    return res.status(201).json({
      user: {
        email,
        subscription: savedUser.subscription,
        avatarURL: savedUser.avatarURL,
        verify: savedUser.verify,
        verificationToken: savedUser.verificationToken,
      },
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { signup };
