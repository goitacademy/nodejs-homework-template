const { Contact } = require('../models/contact');
const { HttpError, ctrlWrapper } = require('../helpers');
const listContacts = async (req, res) => {
    const allContacts = await Contact.find({}, '-createdAt -updatedAt');
    res.json(allContacts);
  };
  module.exports = listContacts ;