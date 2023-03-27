const { findUserInDb, createEmail, sendEmail } = require("../../services");
const { userVerificationValidation } = require("../../middlewares");

const repeatVerificationCtrl = async (req, res) => {
  const { email } = req.body;
  const { error } = userVerificationValidation.validate(req.body);
  if (!req.body) {
    return res.status(400).json({ message: "missing required field email" });
  }

  if (error) {
    return res.status(400).json(error.details[0].message);
  }

  const registeredUser = await findUserInDb(email);

  if (!registeredUser) {
    return res.status(404).json({ message: "user is not registered" });
  }

  if (registeredUser.verify) {
    return res
      .status(400)
      .json({ message: "Verification has already been passed" });
  }

  const mail = createEmail(email, registeredUser.verificationToken);

  await sendEmail(mail);

  return res.status(200).json({ message: "Verification email sent" });
};

module.exports = repeatVerificationCtrl;
