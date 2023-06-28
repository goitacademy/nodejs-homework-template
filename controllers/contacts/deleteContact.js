const { Contact } = require('../../models/contact');

const { httpError } = require('../../helpers');

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  // Or you can use Contact.findByIdAndDelete(contactId)
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    throw httpError(404, 'Not found');
  }
  /* If res.status(204).send() there is no status body */
  res.status(200).json({ message: 'Contact deleted' });
};

module.exports = deleteContact;
