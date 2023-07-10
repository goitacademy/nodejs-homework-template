const { User } = require('../../schema');

async function logout(req, res, next) {
  try {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: null });

    res.status(204).json({ message: 'No content' });
  } catch (error) {
    next(error);
  }
}

module.exports = { logout };
