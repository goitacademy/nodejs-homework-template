const { updateContact } = require('../../models/contacts');
const { HttpError } = require('../../helpers');

const updateById = async (req, res, _) => {
  const result = await updateContact(req.params.contactId, req.body);

  if (!result) {
    throw HttpError(404);
  }

  res.json(result);
};

module.exports = updateById;
