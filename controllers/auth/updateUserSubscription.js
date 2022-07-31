const { basedir } = global;
const { User, schemas } = require(`${basedir}/models/user`);

const { createError } = require(`${basedir}/helpers`);

const updateUserSubscription = async (req, res) => {
    
    const { error } = schemas.updateSubscription.validate(req.body);
    console.log(req.body)
  if (error) {
    throw createError(400, error.message);
  }
  const { _id } = req.user;
  const result = await User.findByIdAndUpdate(_id, req.body, { new: true });

  res.json(result);
};

module.exports = updateUserSubscription;