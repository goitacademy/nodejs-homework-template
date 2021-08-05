const { user: service } = require('../../services');

const signup = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const result = await service.getOne({ email });
    if (result) {
      res.status(409).json({
        status: 'Conflict',
        code: 409,
        message: 'Email in use',
      });
      return;
    }
    const newUser = await service.addUser({ email, password });
    res.status(201).json({
      status: 'Created',
      code: 201,
      data: {
        user: { email: newUser.email, subscription: newUser.subscription },
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = signup;
