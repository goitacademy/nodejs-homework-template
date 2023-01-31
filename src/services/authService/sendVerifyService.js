const { User } = require("../../db");
const { httpError } = require("../../helpers");
const { sendEmailService } = require("./sendEmailService");

const sendVerifyService = async (email) => {
  const user = await User.findOne({ email: email });
  if (!user) throw httpError(400, "Bad request!");
  const { verify, verificationToken } = user;
  if (verify) throw httpError(400, "Verification has already been passed");

  await sendEmailService(email, verificationToken);
};

module.exports = { sendVerifyService };
