const { Contact } = require('../../models/contact');

const { ctrlWrapper } = require('../../helpers');

const getAll = async (req, res) => {
  const { _id: owner } = req.user;

  const { page = 1, limit = 20, favorite } = req.query;

  const skip = (page - 1) * limit;

  const sorted = { owner };

  if (favorite !== undefined) {
    sorted.favorite = favorite;
  }

  const result = await Contact.find(sorted, '', {
    skip,
    limit,
  }).populate('owner', 'name email subscription');

  res.json(result);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
};
