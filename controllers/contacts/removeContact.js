

const { Contact } = require('../../models/contact');
const { RequestError } = require('../../utils');

const removeContact = async (req, res) => {
  const { contactId } = req.params;

  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    throw RequestError(404, 'Not found');
  }
  res.json({
    message: 'Contact deleted',
  });
};
module.exports = removeContact;