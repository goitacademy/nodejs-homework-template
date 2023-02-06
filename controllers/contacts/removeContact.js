const operation = require('../../models/contacts');
const { HttpError } = require('../../helpers');

const removeContact = async (req, res) => {
  const { id } = req.params;
  const result = await operation.removeContact(id);
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.json(result);
};

module.exports = removeContact;
