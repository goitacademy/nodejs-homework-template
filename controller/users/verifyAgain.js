const { NotFound } = require("http-errors");

const { User } = require("../../model");

const { sendEmail } = require("../../helpers");

const verifyAgain = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    res.json({
      code: 400,
      message: "Missing required field email",
    });
    return;
  }
  const user = await User.findOne({ email });

  if (user.verify) {
    res.status(400).json({ message: "Verification has already been passed" });
    return;
  }

  const mail = {
    to: email,
    subject: "Registration confirm",
    html: `<a href = "http://localhost:3000/api/users/verify/${user.verificationToken}">Click it to confirm a registration</a>`,
  };

  sendEmail(mail);

  res.json({
    status: "success",
    code: 200,
    message: "Verification email sent",
  });
};

module.exports = verifyAgain;
