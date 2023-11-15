const contactsModel = require('../models/contacts');

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const updatedContact = await contactsModel.updateContact(
      contactId,
      req.body
    );

    if (updatedContact) {
      res.json(updatedContact);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = updateContact;
