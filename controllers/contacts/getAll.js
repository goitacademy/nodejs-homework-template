const Contact = require('../../models/contact');
const { ctrlWrapper } = require('../../helpers');

const getAll = async (req, res) => {
  const { _id: owner } = req.user;

  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;

  const query = favorite ? { owner, favorite } : { owner };

  const result = await Contact.find(query, '-createdAt -updatedAt', {
    skip,
    limit,
  });
  res.json(result);
};

module.exports = { getAll: ctrlWrapper(getAll) };
