const User = require("../models/contactModal");

const verifyController = async (req, res, next) => {
  const { verificationToken } = req.params;

  try {
    const user = await User.findOne({ verificationToken });

    if (!user) {
      return res.status(404).json({ message: 'Not Found' });
    }

    user.verificationToken = null;
    user.verify = true;

    await user.save();

    res.status(200).json({ message: 'User successfully verified' });
  } catch (error) {
    next(error);
  }
};

module.exports = verifyController;
