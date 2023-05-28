const { Contact } = require('../../models/contact');

const getAll = async (req, res) => {
  const { _id: owner } = req.user;

  const { page = 1, limit = 20, favorite } = req.query;
  let filter = { owner };
  if (favorite) {
    filter = { owner, favorite };
  }

  const skip = (page - 1) * limit;
  const result = await Contact.find(filter, '-createdAt -updatedAt', {
    skip,
    limit,
  }).populate('owner', 'name email');

  res.json(result);
};
module.exports = getAll;
