const contactsModel = require('../models/contacts');

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const result = await contactsModel.removeContact(contactId);

    if (result) {
      res.json({ message: 'Contact deleted' });
    } else {
      res.status(404).json({ message: 'Contact not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = removeContact;
