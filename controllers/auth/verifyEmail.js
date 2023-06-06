const { HttpError } = require('../../helpers');
const { User } = require('../../models/user');

const verifyEmail = async (req, res) => {
  console.log('blip');
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw HttpError(404, 'User not found');
  }
  await User.findByIdAndUpdate(user._id, { verify: true, verificationToken: null });
  res.redirect('http://localhost:3001/goit-react-hw-08-phonebook/login');
  // res.json({
  //   message: 'Verification successful',
  // });
};

module.exports = verifyEmail;
