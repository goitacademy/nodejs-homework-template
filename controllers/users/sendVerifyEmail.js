const { RequestError } = require("../../helpers");
const { User, usersJoiSchemas } = require("../../models");
const { sendEmail, msg } = require("../../helpers");

const sendVerifyEmail = async (req, res, next) => {
  try {
    const { error } = usersJoiSchemas.verifyEmailSchema.validate(req.body);
    if (error) {
      throw RequestError(400, error.message);
    }

    const userOnVerify = await User.findOne(req.body);
    if (!userOnVerify) {
      throw RequestError(404, "User not found");
    }

    const { email, verify, verificationToken } = userOnVerify;
    if (verify) {
      throw RequestError(400, "Verification has already been passed");
    }
    const message = msg(email, verificationToken);
    await sendEmail(message);
    res.json({ message: "Verification email sent" });
  } catch (error) {
    next(error);
  }
};

module.exports = sendVerifyEmail;
