const { User, usersJoiSchemas } = require("../../models");
const { RequestError } = require("../../helpers");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { sendEmail, msg } = require("../../helpers");
const { v4 } = require("uuid");

const signup = async (req, res, next) => {
  try {
    const { error } = usersJoiSchemas.signupSchema.validate(req.body);
    if (error) {
      throw RequestError(400, error.message);
    }

    const { email, password, subscription } = req.body;
    const notUniqueUser = await User.findOne({ email });
    if (notUniqueUser) {
      throw RequestError(409, "Email in use");
    }
    const verificationToken = v4();
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const avatarURL = gravatar.url(email);
    const user = await User.create({
      email,
      password: hashPassword,
      subscription,
      avatarURL,
      verificationToken,
    });
    const message = msg(email, verificationToken);
    await sendEmail(message);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

module.exports = signup;
