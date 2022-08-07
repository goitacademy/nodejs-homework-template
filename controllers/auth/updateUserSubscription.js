const { basedir } = global;

const { User, schemas } = require(`${basedir}/models/user`);
const { createError } = require(`${basedir}/helpers`);

const updateUserSubscription = async (req, res) => {
  const { error } = schemas.subscription.validate(req.body);
  if (error) {
    throw createError({
      status: 400,
      message: error.message,
    });
  }

  const { userId } = req.params;

  const result = await User.findByIdAndUpdate(userId, req.body, {
    new: true,
  });

  if (!result) throw createError({ status: 404 });
  res.json(result);
};

module.exports = updateUserSubscription;
