const { basedir } = global;
const { User } = require(`${basedir}/models/user`);

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.status(204).send();
};

module.exports = logout;
