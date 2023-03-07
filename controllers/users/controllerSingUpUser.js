const { User } = require('../../schemas/modelUser');
const { addUser } = require('../../services/users');
const gravatar = require('gravatar');
const { v4: uuidv4 } = require('uuid');

const { sendMail } = require('../../services/users/sendMail');

const controllerSingUpUser = async (req, res) => {
  const { email, password } = req.body;
  const avatarURL = gravatar.url(email, { protocol: 'https' });
  const verificationToken = uuidv4();
  try {
    const userFind = await User.findOne({ email });

    if (userFind) {
      return res.status(409).json({ message: 'Email in use' });
    }

    const user = await addUser(email, password, avatarURL, verificationToken);

    await sendMail(email, verificationToken);

    res.json({
      status: 'success',
      code: 201,
      data: {
        user: {
          email: user.email,
          subscription: user.subscription,
        },
      },
    });
  } catch (error) {
    console.log('error in controller signup');
    res.status(500).json({ message: error.message });
    next(error);
  }
};

module.exports = { controllerSingUpUser };
