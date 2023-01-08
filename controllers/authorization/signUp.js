const { User } = require("../../models");
const gravatar = require("gravatar");
const { HttpError, sendEmail } = require("../../helpers");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

const signUp = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const candidate = await User.findOne({ email });
    if (candidate) {
      throw HttpError(409, "Email in use");
    }
    const avatarURL = gravatar.url(email);
    const salt = bcrypt.genSaltSync(10);
    const haschedPassword = bcrypt.hashSync(password, salt);
    const verificationToken = uuidv4();
    const user = await User.create({
      email,
      password: haschedPassword,
      avatarURL,
      verificationToken,
    });
    const mail = {
      to: email,
      subject: "Підтвердження регістрації на сайті",
      html: `<a href="http://localhost:3000/api/auth//verify/${verificationToken}" target="_blank">Натисніть для підтвердження email</a>`,
    };
    await sendEmail(mail);
    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};

module.exports = signUp;
