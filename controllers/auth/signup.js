const fs = require("fs/promises");
const path = require("path");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { Conflict } = require("http-errors");

const { User } = require("../../models");

const avatarsDir = path.join(__dirname, "../../", "public/avatars");

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict("Email in use");
  }
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const avatarURL = gravatar.url(email, { s: "250" }, true);
  const result = await User.create({
    avatarURL,
    email,
    password: hashPassword
  });
  const id = result._id.toString();
  const dirPath = path.join(avatarsDir, id);
  await fs.mkdir(dirPath);
  res.status(201).json({
    status: "Created",
    code: 201,
    message: "Created",
  });
};

module.exports = signup;
