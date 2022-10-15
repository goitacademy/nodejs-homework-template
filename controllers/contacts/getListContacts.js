const { Contact } = require('../../models');

const getListContacts = async (req, res) => {
  const { _id } = req.user;
  const products = await Contact.find({ owner: _id }).populate('owner', '_id email subscription');

  res.json({
    status: 'success',
    code: 200,
    data: {
      result: products,
    },
  });
};

module.exports = getListContacts;
