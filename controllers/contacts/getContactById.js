const contacts = require('../../models/contacts');

const { RequestError } = require('../../helpers');

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.getContactById(contactId);

  if (!result) {
    throw RequestError(404);
  }
  res.status(200).json(result);

  module.exports = getContactById;
};
