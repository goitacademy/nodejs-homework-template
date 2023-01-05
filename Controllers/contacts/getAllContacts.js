const { Contact } = require('../../models');

const getAllContacts = async (req, res) => {
  const contact = await Contact.find({});
  return res.status(200).json(contact);
};

module.exports = getAllContacts;
