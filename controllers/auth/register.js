const User = require("../../models/users");
const jimp = require("jimp");
const bcrypt = require("bcrypt");
const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const { HttpError, cloudinary, sendgridEmail } = require("../../helpers");
const avatarPath = path.resolve("publick", "avatars");
const { BASE_URL } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }
  const verificationToken = uuidv4();
  const verifyEmail = {
    to: email,
    subject: "Confirmation of registration.",
    html: `<p>Hello, follow the link to confirm your registration. </p>
<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Click verify email</a>`,
  };

  const hashPass = await bcrypt.hash(password, 12);

  if (req.file !== undefined) {
    const { path: oldPath, filename } = req.file;
    const newPath = path.join(avatarPath, filename);
    await fs.rename(oldPath, newPath);
    const sizeImg = await jimp.read(newPath);
    sizeImg.resize(250, 250);
    sizeImg.greyscale();
    sizeImg.writeAsync(newPath);

    const uploadImg = await cloudinary.uploader.upload(newPath, {
      folder: "avatars",
    });

    sendgridEmail(verifyEmail);
    const newUser = await User.create({
      ...req.body,
      avatarLink: uploadImg.url,
      avatarPublickId: uploadImg.public_id,
      avatarUrl: newPath,
      password: hashPass,
      verificationToken,
    });

    res.status(201).json({
      email: newUser.email,
      subscription: newUser.subscription,
    });
  }
  sendgridEmail(verifyEmail);
  const newUser = await User.create({
    ...req.body,
    verificationToken,
    password: hashPass,
  });

  res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription,
  });
};
module.exports = register;
