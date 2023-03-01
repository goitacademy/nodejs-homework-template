const { HttpSuccess } = require('../../helpers');

const getCurrent = async (req, res) => {
  const { _id, subscription, email, avatarUrl } = req.user;
  res.json(
    HttpSuccess({ data: { user: { avatarUrl, email, subscription, _id } } })
  );
};

module.exports = getCurrent;
