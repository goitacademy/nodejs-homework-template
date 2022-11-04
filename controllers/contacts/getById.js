const { Contacts } = require('../../models/contacts');

const { RequestError } = require('../../helpers');

const getById = async (req, res) => {
  const { contactId } = req.params;
  // const result = await Contacts.findOne({ _id: contactId });
  const result = await Contacts.findById(contactId);
  if (!result) {
    throw RequestError(404, 'Not found');
  }
  res.json(result);
};

module.exports = getById;
