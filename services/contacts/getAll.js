const { Contact } = require('../../models/contact');

const getAll = async (req) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  //   const favorite =
  //     isFavorite === ('true' || 'false') ? isFavorite : '';

  return await Contact.find({ owner }, null, {
    skip,
    limit,
  }).populate('owner', 'subscription email');
};

module.exports = getAll;
