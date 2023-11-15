const contactsModel = require('../models/contacts');

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const updatedContact = await contactsModel.updateContact(
      contactId,
      req.body
    );
    res.json(updatedContact);
  } catch (error) {
    res.status(404).json({ message: 'Not found' });
  }
};

module.exports = updateContact;
