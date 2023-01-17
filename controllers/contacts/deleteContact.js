const { Contact } = require('../../models/contact-schema');

const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);
  if (!contact) {
    return res.status(404).json({ message: 'Not found' });
  }
  await Contact.findByIdAndRemove(contactId);
  res.status(200).json({ message: 'contact deleted' });
};

module.exports = deleteContact;

