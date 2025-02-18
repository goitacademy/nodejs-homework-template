const User = require("../models/user");

const verifyEmail = async (req, res) => {
  const { token } = req.query;

  const user = await User.findOne({ verificationToken: token });
  if (!user) {
    return res.status(404).json({ message: "Token weryfikacyjny nieprawidłowy lub wygasł." });
  }

  if (user.verified) {
    return res.status(400).json({ message: "E-mail został już wcześniej zweryfikowany." });
  }

  user.verified = true;
  user.verificationToken = undefined;
  await user.save();

  res.status(200).json({ message: "E-mail został pomyślnie zweryfikowany." });
};

module.exports = verifyEmail;
