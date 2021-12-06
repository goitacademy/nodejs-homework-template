const { Contact } = require('../../models');

const listContacts = async (req, res) => {
  const { _id } = req.user;

  const { page = 1, limit = 3 } = req.query;
  const skip = (page - 1) * limit;

  const contacts = await Contact.find({ owner: _id }, '', { skip, limit: Number(limit) }).populate(
    'owner',
    '_id name email subscription',
  );

  res.json({
    status: 'success',
    code: 200,
    message: 'Contants uploaded',
    data: {
      contacts,
    },
  });
};

module.exports = listContacts;
