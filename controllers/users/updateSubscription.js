const { User } = require('../../models');
const { httpError, ctrlWrapper } = require('../../utils');

const updateSubscription = async (req, res) => {
  const {
    body,
    params: { id },
  } = req;

  const result = await User.findByIdAndUpdate(id, body, {
    new: true,
  });

  if (!result) throw httpError(404, 'Not found');

  return res.json(result);
};

module.exports = ctrlWrapper(updateSubscription);
