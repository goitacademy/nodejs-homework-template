const { HttpSuccess } = require('../../helpers');
const { User } = require('../../models');

const setSubscription = async (req, res) => {
  const { id } = req.user;
  const result = await User.findByIdAndUpdate(id, req.body, {
    new: true,
    select: { email: true, subscription: true },
  });
  res.json(HttpSuccess({ data: result, message: 'Subscription updated' }));
};
module.exports = setSubscription;
