const { basedir } = global;
const { User } = require(`${basedir}/models/user`);

const createError = require(`${basedir}/helpers/createError`);

const verifyEmail = async (req, res) => {
  const { varificationToken } = req.params;
  const user = await User.findOne({ varificationToken });
  if (!user) {
    throw createError(404);
  }
  await User.findByIdAndUpdate(user._id, {
    varificationToken: '',
    verify: true,
  });
  res.json({ message: 'Verification successful'})
};

module.exports = verifyEmail;
