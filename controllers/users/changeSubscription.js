const { User, usersJoiSchemas } = require("../../models");
const { RequestError } = require("../../helpers");

const changeSubscription = async (req, res, next) => {
  try {
    const { error } = usersJoiSchemas.subscriptionSchema.validate(req.body);
    if (error) {
      throw RequestError(400, error.message);
    }
    const { _id } = req.user;
    const result = await User.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = changeSubscription;
