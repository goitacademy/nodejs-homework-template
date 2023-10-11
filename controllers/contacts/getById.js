const contacts = require('../../models/contacts');
const { HttpError } = require('../../helpers');

const getById = async (req, res) => {
  const contact = await contacts.getContactById(req.params.contactId);
  if (!contact) {
    throw HttpError(404, 'Not found');
  }
  res.json(contact);
};

module.exports = getById;
