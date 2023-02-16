const { Contact } = require('../../models/contact');

module.exports = async (req) => {
  const { page = 1, limit = 10, favorite } = req.query;

  const skip = (page - 1) * limit;

  const { _id: owner } = req.user;
  const query = { owner };

  query.favorite = favorite || { $in: [true, false] };

  return await Contact.find(query, null, {
    skip,
    limit,
  }).populate('owner', 'subscription email');
};
