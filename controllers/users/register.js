const bcrypt = require("bcryptjs");
const fs = require("fs/promises");
const path = require("path");
const gravatar = require("gravatar");

const { User } = require("../../models");
const { Conflict } = require("http-errors");
const avatarDir = path.join(__dirname, "../../", "public/avatars");

const register = async (req, res) => {
  const { email, password } = req.body;
  const defaultAvatar = gravatar.url(email.toString(), { s: "250" }, true);
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict("Email in use");
  }
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const result = await User.create({
    email,
    password: hashPassword,
    avatarURL: `${defaultAvatar}`,
  });

  const id = result._id.toString();
  const dirPath = path.join(avatarDir, id);
  await fs.mkdir(dirPath);

  res.status(201).json({
    status: "succes",
    code: 201,
    users: result,
  });
};
module.exports = register;
