const { User } = require('../../schemas/modelUser');

const controllerVerifyUser = async (req, res) => {
  const { verificationToken } = req.params;

  try {
    const user = await User.findOne({ verificationToken });
    await User.findByIdAndUpdate(
      { _id: user._id },
      {
        verificationToken: null,
        verify: true,
      },
      { new: true }
    );

    res.status(200).json({
      message: 'Verification successful',
    });
  } catch (error) {
    res.status(404).json({ message: 'User not found' });
  }
};

module.exports = { controllerVerifyUser };
