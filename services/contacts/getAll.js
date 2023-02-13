const { Contact } = require('../../models/contact');

module.exports = async (req) => {
  const { _id: owner } = req.user;

  const { page = 1, limit = 10, favorite } = req.query;

  const skip = (page - 1) * limit;

  const query = { owner };

  if (favorite === ('true' || 'false')) {
    query.favorite = favorite;
  }

  return await Contact.find(query, null, {
    skip,
    limit,
  }).populate('owner', 'subscription email');
};
