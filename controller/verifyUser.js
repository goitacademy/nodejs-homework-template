const nanoid = require('nanoid');
const {getUserByEmail} = require("../service/user");
const emailService = require('../service/emailService');

const verifyUser = async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "missing required field email" });
  }

  const user = await getUserByEmail(email);

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  if (user.verify) {
    return res
      .status(400)
      .json({ message: "Verification has already been passed" });
  }

  const verificationToken = nanoid();

  user.verificationToken = verificationToken; 
  await user.save();

  emailService.sendMail(verificationToken, email);

  res.status(200).json({ message: "Verification email sent" });
};


module.exports = verifyUser;