const { Contact } = require('../../models');

const getListContacts = async (req, res) => {
  const { _id } = req.user;
  console.log('req.query-getListContacts:', req.query);
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  const products = await Contact.find({ owner: _id }, '', {
    skip,
    limit: Number(limit),
  }).populate('owner', '_id email subscription');

  res.json({
    status: 'success',
    code: 200,
    data: {
      result: products,
    },
  });
};

module.exports = getListContacts;
