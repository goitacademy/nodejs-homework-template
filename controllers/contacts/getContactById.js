const { Contact } = require('../../models/contact');

const { httpError } = require('../../helpers');

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);
  // Or use this: Contact.findOne({ _id: contactId });
  if (!contact) {
    throw httpError(404, 'Not found');
  }
  res.json(contact);
};

module.exports = getContactById;
