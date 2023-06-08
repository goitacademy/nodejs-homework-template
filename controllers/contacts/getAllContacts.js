const { Contact } = require('../../models');

const getAllContacts = async (req, res) => {
  const allContacts = await Contact.find({}, '-createdAt -updatedAt');
  res.json(allContacts);
};

module.exports = getAllContacts;
