const path = require("path");
const fs = require("fs/promises");
const jimp = require("jimp");
const User = require("../models/user");
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const avatarsDir = path.join(__dirname, "../public/avatars");

const updateAvatar = async (req, res) => {
  const { path: tempPath, originalname } = req.file;
  const { _id } = req.user;

  const fileName = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarsDir, fileName);

  try {
    const image = await jimp.read(tempPath);
    await image.resize(250, 250).write(resultUpload);

    await fs.unlink(tempPath);

    const avatarURL = `/avatars/${fileName}`;

    await User.findByIdAndUpdate(_id, { avatarURL });

    res.json({ avatarURL });
  } catch (error) {
    await fs.unlink(tempPath);
    res.status(500).json({ message: "Server error" });
  }
};

const verifyUser = async (req, res) => {
  try {
    const { verificationToken } = req.params;
    const user = await User.findOne({ verificationToken });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.verify = true;
    user.verificationToken = null;
    await user.save();

    res.status(200).json({ message: "Verification successful" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const resendVerificationEmail = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Missing required field email" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.verify) {
      return res.status(400).json({ message: "Verification has already been passed" });
    }

    const msg = {
      to: email,
      from: "email@example.com",
      subject: "Verify your email",
      text: `Click the following link to verify your email: http://your_domain.com/users/verify/${user.verificationToken}`,
      html: `<p>Click the following link to verify your email: <a href="http://your_domain.com/users/verify/${user.verificationToken}">Verify Email</a></p>`,
    };

    await sgMail.send(msg);

    res.status(200).json({ message: "Verification email sent" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  updateAvatar,
  verifyUser,
  resendVerificationEmail
};
