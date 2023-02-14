const { User } = require('../../schemas/modelUser');
const { addUser } = require('../../services/users');

const controllerSingUpUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userFind = await User.findOne({ email });

    if (userFind) {
      return res.status(409).json({ message: 'Email in use' });
    }

    const user = await addUser(email, password);
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
