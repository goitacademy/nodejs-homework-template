const { User } = require('../../models/user');
const { validationById } = require('../../middlewares');

const updateSubscription = async (req, res) => {
  const { subscription } = req.body;
  const { id } = req.params;
  validationById(id);

  const result = await User.findByIdAndUpdate(
    id,
    { subscription },
    { new: true }
  );
  res.json(result);
};

module.exports = updateSubscription;
