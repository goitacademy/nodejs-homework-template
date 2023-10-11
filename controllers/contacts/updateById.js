const contacts = require('../../models/contacts');
const { HttpError } = require('../../helpers');

const updateById = async (req, res) => {
  const contact = await contacts.updateContactById(
    req.params.contactId,
    req.body
  );
  if (!contact) {
    throw HttpError(404, 'Not found');
  }
  res.json(contact);
};

module.exports = updateById;
