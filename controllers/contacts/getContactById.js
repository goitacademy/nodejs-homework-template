const { Contact } = require('../../models/contact');
const { RequestError } = require('../../helpers');

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const oneContact = await Contact.findById(contactId);
  if (!oneContact) {
    throw RequestError(404, 'Not found');
  }
  res.json(oneContact);
};

module.exports = getContactById;
