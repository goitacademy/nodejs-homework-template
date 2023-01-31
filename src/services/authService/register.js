const gravatar = require("gravatar");
const { v4: uuidv4 } = require("uuid");

const { User } = require("../../db");
const { httpError } = require("../../helpers");
const { sendEmailService } = require("./sendEmailService");

const register = async (email, password) => {
  if (await User.findOne({ email })) throw httpError(409, "This email in use!");
  const url = gravatar.url(email, { s: "250" }, false);
  const verificationToken = uuidv4();

  const user = new User({ email, password, avatarURL: url, verificationToken });
  await user.save();
  await sendEmailService(email, verificationToken);
  return user;
};

module.exports = { register };
