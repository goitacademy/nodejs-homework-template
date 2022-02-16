const contacts = require('../../models/contacts');
const CreateError = require('http-errors');

const removebyId = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contacts.removeContact(contactId);
  if (!result) {
    throw new CreateError(404, 'Not found');
  }
  res.json({ message: `Contact '${result.name}' was deleted` });
};

module.exports = removebyId;
