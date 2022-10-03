const contacts = require('../../models/contacts');
const { RequestError } = require('../../helpers');

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const oneContact = await contacts.getContactById(contactId);
  if (!oneContact) {
    throw RequestError(404, 'Not found');
  }
  res.json(oneContact);
};

module.exports = getContactById;
