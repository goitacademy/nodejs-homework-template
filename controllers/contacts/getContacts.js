const { Contact } = require('../../models');

const getContacts = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;

  const skip = (page - 1) * limit;
  const filter = { owner: _id }

  if (favorite) {
    filter.favorite = favorite
  }

  const result = await Contact.find(filter, '', { skip, limit: Number(limit) }).populate('owner', '_id email subscription');

  res.status(200).json({
    status: 'success',
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = getContacts;