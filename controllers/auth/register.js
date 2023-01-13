const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");

const User = require("../../models/auth");
const RequestError = require("../../helpers/RequestError");
const schema = require("../../schemas/schemas");
const { nanoid } = require("nanoid");
const createVerifyEmail = require("../../helpers/createVerifyEmail");
const sendEmail = require("../../helpers/sendEmail");

const register = async (req, res) => {
  const { password, email } = req.body;

  const { error } = schema.register.validate(req.body);
  if (error) {
    throw RequestError(400, error.message);
  }
  const user = await User.findOne({ email });

  if (user) {
    throw RequestError(409, "This email already used");
  }

  const verificationToken = nanoid();
  const hashPass = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const result = await User.create({
    email,
    password: hashPass,
    avatarURL,
    verificationToken,
  });

  const verificationEmail = createVerifyEmail(email, verificationToken);
  await sendEmail(verificationEmail);

  res.status(201).json({
    email: result.email,
    subscription: result.subscription,
  });
};

module.exports = register;
