const { removeContact } = require('../../models/contacts');
const { HttpError } = require('../../helpers');

const removeById = async (req, res, _) => {
  const result = await removeContact(req.params.contactId);

  if (!result) {
    throw HttpError(404);
  }

  res.json({
    message: 'Contact deleted',
  });
};

module.exports = removeById;
