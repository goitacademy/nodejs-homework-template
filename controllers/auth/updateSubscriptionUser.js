const { User } = require('../../models/user');

const { schemas } = require('../../models/user');

const { HttpError } = require("../../helpers");

const updateSubscriptionUser = async (req, res, next) => {
  try {
    const { error } = schemas.updateSubscriptionSchema.validate(req.body);
    if (error) {
      throw HttpError(400, "Missing field subscription");
    }

    const { subscription } = req.body;
    if (!["starter", "pro", "business"].includes(subscription)) {
      throw HttpError(400, "Missing field subscription");
    }

    const { id } = req.params;
    const result = await User.findByIdAndUpdate(
      id,
      { subscription },
      { new: true }
    );
    if (!result) {
      throw HttpError(404, "Not found");
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = updateSubscriptionUser;