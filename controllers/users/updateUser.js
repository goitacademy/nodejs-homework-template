const { user: service } = require('../../services');

const updateUser = async (req, res, next) => {
  const userId = req.user.id;
  const subscription = req.body.subscription;
  try {
    const result = await service.updateById(userId, { ...req.body });
    if (subscription == null ) {
      return res.status(400).json({
        status: 'error',
        code: 400,
        message: 'missing field subscription',
        data: 'Not Found',
      });
    }

    if (!result) {
      return res.status(404).json({
        status: 'error',
        code: 404,
        message: 'Not found',
      });
    }
    await res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        user: { email: result.email, subscription: result.subscription },
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateUser;
