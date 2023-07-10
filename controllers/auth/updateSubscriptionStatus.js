const { User } = require('../../schema');
const { errorHandler } = require('../../helpers');
const { schemaJoiUser } = require('../../schema');

const { updateSubscriptionSchema } = schemaJoiUser;

async function updateSubscriptionStatus(req, res, next) {
  try {
    const { error } = updateSubscriptionSchema.validate(req.body);
    if (error) {
      throw errorHandler(400, 'missing field subscription or wrong status');
    }

    const { userId } = req.params;
    const result = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
    });
    if (!result) {
      throw errorHandler(404, 'Not found');
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
}

module.exports = { updateSubscriptionStatus };
