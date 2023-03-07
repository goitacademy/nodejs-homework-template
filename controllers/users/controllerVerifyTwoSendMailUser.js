const { User } = require('../../schemas/modelUser');
const { sendMail } = require('../../services/users/sendMail');

const controllerVerifyTwoSendMailUser = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email, verify: false });
    await sendMail(email, user.verificationToken);
    res.status(200).json({
      message: 'Verification email sent',
    });
  } catch (error) {
    res.status(400).json({ message: 'Verification has already been passed' });
  }
};

module.exports = { controllerVerifyTwoSendMailUser };
