const Contacts = require('../../models/contacts');

const getAllContacts = async (req, res) => {
  const contact = await Contacts.listContacts();
  return res.status(200).json(contact);
};

module.exports = getAllContacts;
