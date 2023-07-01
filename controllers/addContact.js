const { Contact } = require('../models/contact');
const { HttpError, ctrlWrapper } = require('../helpers');
const addContact = async (req, res) => {
    const newContact = await Contact.create(req.body);
    res.status(201).json(newContact);
  };
  module.exports = addContact;