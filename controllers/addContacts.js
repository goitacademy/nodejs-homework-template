const contactsModel = require('../models/contactModel');

const addContact = async (req, res, next) => {
  try {
    const newContact = await contactsModel.addContact(req.body); 
    res.status(201).json(newContact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = addContact;
