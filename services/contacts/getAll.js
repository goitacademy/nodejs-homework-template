const { Contact } = require('../../models/contact');

module.exports = async (req) => {
  const { _id: owner } = req.user;

  const { page = 1, limit = 10, favorite } = req.query;

  const skip = (page - 1) * limit;

  const searchParams = { owner };
  if (favorite === ('true' || 'false')) {
    searchParams.favorite = favorite;
  }

  return await Contact.find(searchParams, null, {
    skip,
    limit,
  }).populate('owner', 'subscription email');
};
