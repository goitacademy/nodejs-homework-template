const { User } = require('../../models/user');
const { createError } = require('../../helpers');

const verifyToken = async (req, res, next) => {
  try {
    const { verificationToken } = req.params;
    const user = await User.findOne({ verificationToken });
    if (!user) {
      throw createError(404);
    }
    await User.findByIdAndUpdate(user._id, {
      verificationToken: null,
      verify: true,
    });
    res.json({
      message: 'Verification successful',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = verifyToken;