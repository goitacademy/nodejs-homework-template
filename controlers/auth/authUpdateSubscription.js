const { NotFound } = require('http-errors');
const { User } = require('../../models/user.models');
const { catchAsync } = require('../../utils');

const updateSubscription = catchAsync(async (req, res, next) => {
  try {
    const { _id } = req.user;

    const result = await User.findByIdAndUpdate(_id, req.boy, {
      new: true,
    });

    if (!result) {
      throw new NotFound('Not found!');
    }
    res.json(result);

  } catch (error) {
    next(error);
  }
});

module.exports = updateSubscription;