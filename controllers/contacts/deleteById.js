const contacts = require('../../models/contacts');
const { HttpError } = require('../../helpers');

const deleteById = async (req, res) => {
  const contact = await contacts.removeContactById(req.params.contactId);
  if (!contact) {
    throw HttpError(404, 'Not found');
  }
  res.json({ message: 'Contact deleted' });
};

module.exports = deleteById;
