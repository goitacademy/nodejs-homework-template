const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { basedir } = global;

const { User, schemas } = require(`${basedir}/models/user`);

const { createError } = require(`${basedir}/helpers`);

const signup = async (req, res) => {
  const { error } = schemas.register.validate(req.body);
  if (error) {
    throw createError(400, error.message);
  }
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw createError(409, `${email} is already exist`);
  }
  const hashPassword = await bcrypt.hash(password, 15);
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

module.exports = signup;
