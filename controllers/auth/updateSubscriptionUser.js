const { basedir } = global;
const { User, schemas } = require(`${basedir}/models/user`);
const { createError } = require(`${basedir}/utils`);

const updateSubscriptionUser = async (req, res) => {
  const { error } = schemas.updateSubscriptionUser.validate(req.body);
  if (error) {
    throw createError(400, error.message);
  }
  const { _id } = req.user;
  const result = await User.findByIdAndUpdate(_id, req.body, {
    new: true,
  });
  if (!result) {
    throw createError(404);
  }
  res.json(result);
};

module.exports = updateSubscriptionUser;
