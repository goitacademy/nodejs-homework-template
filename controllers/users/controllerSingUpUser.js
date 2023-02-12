const { addUser } = require('../../services/users');

const controllerSingUpUser = async (req, res, next) => {
  const { email, password } = req.body;
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
};

module.exports = { controllerSingUpUser };
