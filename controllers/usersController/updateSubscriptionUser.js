const { User } = require('../../models');
const { NotFound } = require('http-errors');

async function updateSubscriptionUser(req, res, next) {
  try {
    const { _id, name, email, createdAt, updatedAt } = req.user;
    const { subscription } = req.body;
    const result = await User.findByIdAndUpdate(_id, { subscription }, { new: true });
    if (!result) {
      throw new NotFound(`subscription with id=${_id} not found!`);
    }
    res.json({
      status: 'success',
      code: 200,
      data: {
        user: {
          name,
          email,
          subscription,
          createdAt,
          updatedAt,
        },
      },
    });
  } catch (error) {
    next(error);
  }
}

module.exports = updateSubscriptionUser;
