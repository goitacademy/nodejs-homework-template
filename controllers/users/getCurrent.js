const { HttpSuccess } = require('../../helpers');

const getCurrent = async (req, res) => {
  const { _id, subscription, email } = req.user;
  res.json(HttpSuccess({ data: { user: { email, subscription, _id } } }));
};

module.exports = getCurrent;
