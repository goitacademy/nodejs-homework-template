const { verificationEmail } = require("../nodemailer/nodemailer");

const User = require("../service/schemas/users");

const sendVerifictaionEmail = async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Required email is missing" });
  }
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User is not found" });
    }

    if (user.verify) {
      return res
        .status(404)
        .json({ message: "Verification has already been passed." });
    }

    const verificationToken = user.verificationToken;
    await verificationEmail(email, verificationToken);

    res
      .status(200)
      .json({ message: "Verification email has already been sent" });
  } catch (err) {
    next(err);
  }
};

const verificationUser = async (req, res, next) => {
  try {
    const { verificationToken } = req.params;
    const user = await User.findOne({ verificationToken });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.verify = true;
    delete user.verificationToken;
    await user.save();

    res.status(200).json({ message: "Verification successful" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  verificationUser,
  sendVerifictaionEmail,
};
