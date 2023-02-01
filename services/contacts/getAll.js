const { Contact } = require('../../models/contact');

const getAll = async (req) => {
  const { _id: owner } = req.user;

  const { page = 1, limit = 10, favorite } = req.query;

  const skip = (page - 1) * limit;

  const searchParams =
    favorite === ('true' || 'false')
      ? { owner, favorite }
      : { owner };

  return await Contact.find(searchParams, null, {
    skip,
    limit,
  }).populate('owner', 'subscription email');
};

module.exports = getAll;
