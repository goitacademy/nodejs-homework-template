const { NotFound, BadRequest } = require('http-errors');
const { User } = require('../../models');
const { HTTP_STATUS_CODE, STATUS } = require('../../helpers/constants.js');

const subscription = async (req, res, next) => {
  const { subscription } = req.body;
  const { userId: id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) next(NotFound(`Not found user by id:${id}`));

    user.updateSubscription(subscription);
    await user.save();

    res.status(HTTP_STATUS_CODE.OK).json({
      status: STATUS.OK,
      code: HTTP_STATUS_CODE.OK,
      payload: { subscription },
    });
  } catch (error) {
    console.log(error.message);
    next(BadRequest(error.message));
  }
};

module.exports = subscription;
