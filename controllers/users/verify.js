const { User } = require('../../models');
const { NotFound } = require('http-errors');

const verify = async (req, res, next) => {
  const { verifyToken } = req.params;
  const user = await User.findOne({ verifyToken: verifyToken });
  if (!user) {
    throw NotFound();
  }
  try {
    await User.findByIdAndUpdate(user._id, { verify: true, verifyToken: null });

    res.json({
      status: 'success',
      code: 200,
      message: 'Email success verify',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = verify;
