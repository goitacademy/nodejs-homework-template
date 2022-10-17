const { Contacts } = require('../../models/contacts');

const { RequestError } = require('../../helpers');

const removeById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contacts.findByIdAndDelete(contactId);
  if (!result) {
    throw RequestError(404, 'Not found');
  }
  res.json({
    message: 'Delete success',
  });
};

module.exports = removeById;
