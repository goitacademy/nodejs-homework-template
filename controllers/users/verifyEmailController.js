import { User } from '../../models/users/userModel.js';

const verifyEmail = async (req, res) => {
  try {
    const { verificationToken } = req.params;

    console.log("Verification Token:", verificationToken);

    const user = await User.findOne({ verificationToken });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.verified) {
      return res.status(200).json({ message: 'User already verified' });
    }

    user.verified = true;
    user.verificationToken = undefined;
    await user.save();

    await User.findOneAndUpdate(
      { _id: user._id },
      { $set: { verified: user.verified, verificationToken: user.verificationToken } },
      { new: true } 
    );

    return res.status(200).json({ message: 'Verification successful' });
  } catch (error) {
    console.error('Error during verification:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export { verifyEmail };
