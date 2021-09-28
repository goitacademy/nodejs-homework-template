const { BadRequest, NotFound } = require("http-errors");

const { User } = require("../../models");
const { sendMail } = require("../../helpers");

const mail = {
  subject: "Repeated verification email",
};

const repeatEmail = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw new BadRequest("missing required field email");
  }
  const user = await User.findOne({ email });

  if (!user) {
    throw new NotFound();
  }
  if (user.verify) {
    throw new BadRequest("Verification has already been passed");
  }
  await sendMail({
    ...mail,
    to: email,
    html: `<a href="http://localhost:3000/api/users/verify/${user.verifyToken}">Confirm your registration!</a>`,
  });
  res
    .status(200)
    .json({ message: "A confirmation email has been sent to your email" });
};

module.exports = repeatEmail;
