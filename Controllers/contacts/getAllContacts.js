const Contacts = require('../../models/contacts');

const getAllContacts = async (req, res) => {
  const contact = await Contacts.listContacts();
  return res.json({
    status: 'success',
    code: 200,
    data: { result: contact },
  });
};

module.exports = getAllContacts;
