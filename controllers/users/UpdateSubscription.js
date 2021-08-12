const { user: service } = require('../../services');
const HTTP_STATUS = require('../../utils/httpStatusCodes');

const updateSubscription = async (req, res, next) => {
  const {
    body,
    user: { _id: id },
  } = req;
  try {
    const updatedUser = await service.updateById(id, body);

    res.status(HTTP_STATUS.SUCCESS).json({
      status: 'Success',
      code: HTTP_STATUS.SUCCESS,
      data: {
        updatedUser,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateSubscription;