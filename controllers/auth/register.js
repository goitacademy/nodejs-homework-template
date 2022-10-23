const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");

const { User, schemas } = require(`../../models/user`);
const { createError } = require("../../helpers");

const register = async (req, res) => {
  const { error } = schemas.register.validate(req.body);
  if (error) {
    throw createError(400, error.message);
  }
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw createError(409, `${email} already exists`);
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const result = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
  });
  res.status(201).json({
    name: result.name,
    email: result.email,
  });
};

module.exports = register;
