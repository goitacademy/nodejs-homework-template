const { getContactById } = require('../../models/contacts');
const { HttpError } = require('../../helpers');

const getById = async (req, res, _) => {
  const contactId = req.params.contactId;
  const result = await getContactById(contactId);

  if (!result) {
    throw HttpError(404);
  }

  res.json(result);
};

module.exports = getById;
