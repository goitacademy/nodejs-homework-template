const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { v4: uuid } = require("uuid");
const { User, schemas } = require("../../models/user");
const { RequestError, sendMail, createVerifyEmail } = require("../../helpers");

const register = async (req, res) => {
  const { error } = schemas.registerSchema.validate(req.body);
  if (error) {
    throw RequestError(400, error.message);
  }
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw RequestError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = uuid();
  const result = await User.create({
    email,
    password: hashPassword,
    subscription,
    avatarURL,
    verificationToken,
  });

  const mail = createVerifyEmail(email, verificationToken);

  await sendMail(mail);

  res.status(201).json({
    user: {
      email: result.email,
      subscription: result.subscription,
    },
  });
};

module.exports = register;
