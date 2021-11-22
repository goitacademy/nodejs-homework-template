const { Contact } = require('../model/contact');

const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);

  if (!result) {
    res.status(404).send({ message: 'Not found' });
  }
  res.json({ message: 'Contact deleted.' });
};

module.exports = deleteContact;
