const bcrypt = require("bcryptjs");
const { basedir } = global;
const { User, schemas } = require(`${basedir}/models/user`);
const { createError } = require(`${basedir}/utils`);

const login = async (req, res) => {
  const { error } = schemas.login.validate(req.body);
  if (error) {
    throw createError(400, error.message);
  }
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw createError(401, "No such email found");
  }
  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) {
    throw createError(401, "Wrong password");
  }
  const token = "asdasdsad.hyg765d76fdf.asdasd";
  res.json({
    token,
  });
};

module.exports = login;
