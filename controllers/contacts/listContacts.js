const { Contact } = require('../../models');

const listContacts = async (req, res) => {
  const { _id } = req.user;
  const contacts = await Contact.find({ owner: _id }).populate(
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
